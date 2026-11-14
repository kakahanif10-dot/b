import test from 'node:test';
import assert from 'node:assert/strict';
import {
  CANONICAL_POLICY_BASE_URL,
  buildCanonicalSectionUrl,
  filterPolicySections,
  generateRequestReference,
  resolveSectionIdFromHash,
  validatePrivacyRequest,
} from './privacyPolicy';
import { POLICY_SECTIONS } from '../data/policyContent';

test('buildCanonicalSectionUrl formats base and section deep links cleanly', () => {
  assert.equal(
    buildCanonicalSectionUrl(CANONICAL_POLICY_BASE_URL),
    'https://nextwallstreet.com/privacy'
  );
  assert.equal(
    buildCanonicalSectionUrl('https://nextwallstreet.com/privacy/', '#cookies-tracking'),
    'https://nextwallstreet.com/privacy#cookies-tracking'
  );
  assert.equal(
    buildCanonicalSectionUrl('https://nextwallstreet.com/privacy#old', 'data-retention'),
    'https://nextwallstreet.com/privacy#data-retention'
  );
});

test('resolveSectionIdFromHash resolves known hashes and falls back safely', () => {
  assert.equal(
    resolveSectionIdFromHash('#data-retention', POLICY_SECTIONS),
    'data-retention'
  );
  assert.equal(
    resolveSectionIdFromHash('PRIVACY-RIGHTS', POLICY_SECTIONS),
    'privacy-rights'
  );
  assert.equal(
    resolveSectionIdFromHash('#non-existent-anchor', POLICY_SECTIONS),
    'overview'
  );
  assert.equal(
    resolveSectionIdFromHash('', POLICY_SECTIONS, 'contact-dpo'),
    'contact-dpo'
  );
});

test('filterPolicySections matches across titles, subsections, and retention table', () => {
  const all = filterPolicySections(POLICY_SECTIONS, '');
  assert.equal(all.length, POLICY_SECTIONS.length);

  const securityMatches = filterPolicySections(POLICY_SECTIONS, 'AES-256');
  assert.equal(securityMatches.length, 1);
  assert.equal(securityMatches[0].id, 'security-controls');

  const gpcMatches = filterPolicySections(POLICY_SECTIONS, 'Global Privacy Control');
  assert.ok(gpcMatches.some((s) => s.id === 'cookies-tracking'));

  const retentionMatches = filterPolicySections(POLICY_SECTIONS, 'statutory accounting');
  assert.equal(retentionMatches.length, 1);
  assert.equal(retentionMatches[0].id, 'data-retention');

  const emptyMatches = filterPolicySections(POLICY_SECTIONS, 'xyznonexistenttoken123');
  assert.equal(emptyMatches.length, 0);
});

test('validatePrivacyRequest enforces required fields and email format', () => {
  const invalid = validatePrivacyRequest({
    fullName: '',
    email: 'not-an-email',
    jurisdiction: '',
    requestType: 'deletion',
    details: 'short',
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.fullName);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.jurisdiction);
  assert.ok(invalid.errors.details);

  const valid = validatePrivacyRequest({
    fullName: 'Elena Vance',
    email: 'elena.vance@example.com',
    jurisdiction: 'California (CCPA/CPRA)',
    requestType: 'deletion',
    details: 'Please delete my reader account and newsletter history.',
  });
  assert.equal(valid.valid, true);
  assert.deepEqual(valid.errors, {});
});

test('generateRequestReference returns deterministic NWS-DSR format', () => {
  const ts = Date.UTC(2026, 10, 14, 12, 0, 0);
  const ref1 = generateRequestReference('reader@nextwallstreet.com', ts);
  const ref2 = generateRequestReference('READER@nextwallstreet.com ', ts);
  assert.equal(ref1, ref2);
  assert.match(ref1, /^NWS-DSR-2026-[A-Z0-9]{6}$/);
});
