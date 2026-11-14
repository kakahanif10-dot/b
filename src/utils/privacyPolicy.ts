export interface PolicySubsection {
  title: string;
  body: string;
  bullets?: string[];
}

export interface DataRetentionRow {
  category: string;
  examples: string;
  purpose: string;
  legalBasis: string;
  retention: string;
}

export interface PolicySection {
  id: string;
  number: string;
  title: string;
  navLabel: string;
  summary: string;
  paragraphs: string[];
  subsections?: PolicySubsection[];
  retentionTable?: DataRetentionRow[];
}

export type PrivacyRequestType =
  | 'access'
  | 'deletion'
  | 'correction'
  | 'opt-out'
  | 'portability'
  | 'general';

export interface PrivacyRequestInput {
  fullName: string;
  email: string;
  jurisdiction: string;
  requestType: PrivacyRequestType;
  details: string;
}

export interface PrivacyRequestValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof PrivacyRequestInput, string>>;
}

export const CANONICAL_POLICY_BASE_URL = 'https://nextwallstreet.com/privacy';

/**
 * Constructs a clean public section URL for nextwallstreet.com/privacy#<sectionId>.
 */
export function buildCanonicalSectionUrl(
  baseUrl: string = CANONICAL_POLICY_BASE_URL,
  sectionId?: string
): string {
  const cleanBase = baseUrl.trim().replace(/\/+$/, '').split('#')[0];
  if (!sectionId) {
    return cleanBase;
  }
  const cleanId = sectionId.trim().replace(/^#/, '');
  return cleanId ? `${cleanBase}#${cleanId}` : cleanBase;
}

/**
 * Resolves a valid section ID from a URL hash string (e.g. "#data-retention").
 * Returns the fallback section ID if the hash is empty or unrecognized.
 */
export function resolveSectionIdFromHash(
  hash: string,
  sections: PolicySection[],
  fallbackId?: string
): string {
  const normalized = hash.trim().replace(/^#/, '').toLowerCase();
  if (normalized) {
    const match = sections.find((section) => section.id.toLowerCase() === normalized);
    if (match) {
      return match.id;
    }
  }
  return fallbackId ?? (sections[0]?.id ?? '');
}

/**
 * Filters policy sections by matching query terms across title, summary,
 * body paragraphs, subsections, and data retention rows.
 */
export function filterPolicySections(
  sections: PolicySection[],
  query: string
): PolicySection[] {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) {
    return sections;
  }

  const terms = trimmed.split(/\s+/).filter(Boolean);

  return sections.filter((section) => {
    const searchableChunks: string[] = [
      section.number,
      section.title,
      section.navLabel,
      section.summary,
      section.id,
      ...section.paragraphs,
    ];

    if (section.subsections) {
      for (const sub of section.subsections) {
        searchableChunks.push(sub.title, sub.body);
        if (sub.bullets) {
          searchableChunks.push(...sub.bullets);
        }
      }
    }

    if (section.retentionTable) {
      for (const row of section.retentionTable) {
        searchableChunks.push(
          row.category,
          row.examples,
          row.purpose,
          row.legalBasis,
          row.retention
        );
      }
    }

    const haystack = searchableChunks.join(' ').toLowerCase();
    return terms.every((term) => haystack.includes(term));
  });
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Validates the public Data Rights & Privacy Inquiry form.
 */
export function validatePrivacyRequest(
  input: PrivacyRequestInput
): PrivacyRequestValidationResult {
  const errors: Partial<Record<keyof PrivacyRequestInput, string>> = {};

  if (!input.fullName.trim() || input.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full legal or account name.';
  }

  if (!input.email.trim()) {
    errors.email = 'Please enter an email address so we can respond.';
  } else if (!EMAIL_REGEX.test(input.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!input.jurisdiction.trim()) {
    errors.jurisdiction = 'Please select your region or privacy framework.';
  }

  if (!input.details.trim() || input.details.trim().length < 12) {
    errors.details = 'Please describe your request in at least 12 characters.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Generates a deterministic, human-readable tracking reference for a privacy request.
 */
export function generateRequestReference(email: string, timestampMs: number): string {
  const normalizedEmail = email.trim().toLowerCase();
  let hash = 0;
  for (let i = 0; i < normalizedEmail.length; i += 1) {
    hash = (hash * 31 + normalizedEmail.charCodeAt(i)) >>> 0;
  }
  const suffix = ((hash ^ (timestampMs >>> 0)) >>> 0)
    .toString(36)
    .toUpperCase()
    .padStart(6, '0')
    .slice(0, 6);
  const year = new Date(timestampMs).getUTCFullYear();
  return `NWS-DSR-${year}-${suffix}`;
}
