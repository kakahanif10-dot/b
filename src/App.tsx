import { useCallback, useEffect, useMemo, useState } from 'react';
import { Check, Copy, Printer, RotateCcw } from 'lucide-react';
import { POLICY_METADATA, POLICY_SECTIONS } from './data/policyContent';
import {
  buildCanonicalSectionUrl,
  CANONICAL_POLICY_BASE_URL,
  filterPolicySections,
  resolveSectionIdFromHash,
} from './utils/privacyPolicy';
import { TopBar } from './components/TopBar';
import { TableOfContents } from './components/TableOfContents';
import { PolicySectionCard } from './components/PolicySectionCard';
import { PrivacyRequestForm } from './components/PrivacyRequestForm';

async function copyTextSafe(value: string): Promise<void> {
  if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(value);
      return;
    } catch {
      // Fallback below when clipboard API is blocked in headless/non-secure frames.
    }
  }
  if (typeof document !== 'undefined') {
    const textarea = document.createElement('textarea');
    textarea.value = value;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
    } finally {
      document.body.removeChild(textarea);
    }
  }
}

export default function App() {
  const [activeSectionId, setActiveSectionId] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return resolveSectionIdFromHash(window.location.hash, POLICY_SECTIONS);
    }
    return POLICY_SECTIONS[0].id;
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedTarget, setCopiedTarget] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const filteredSections = useMemo(
    () => filterPolicySections(POLICY_SECTIONS, searchQuery),
    [searchQuery]
  );

  const activeCanonicalUrl = useMemo(
    () => buildCanonicalSectionUrl(CANONICAL_POLICY_BASE_URL, activeSectionId),
    [activeSectionId]
  );

  const triggerCopyFeedback = useCallback((targetKey: string) => {
    setCopiedTarget(targetKey);
    window.setTimeout(() => {
      setCopiedTarget((current) => (current === targetKey ? null : current));
    }, 2000);
  }, []);

  const navigateToSection = useCallback((sectionId: string) => {
    setActiveSectionId(sectionId);
    if (typeof window !== 'undefined') {
      const nextHash = `#${sectionId}`;
      if (window.location.hash !== nextHash) {
        window.history.replaceState(null, '', nextHash);
      }
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, []);

  const handleCopySectionLink = useCallback(
    async (sectionId: string, feedbackKey: string = sectionId) => {
      const url = buildCanonicalSectionUrl(CANONICAL_POLICY_BASE_URL, sectionId);
      await copyTextSafe(url);
      setActiveSectionId(sectionId);
      if (typeof window !== 'undefined') {
        const nextHash = `#${sectionId}`;
        if (window.location.hash !== nextHash) {
          window.history.replaceState(null, '', nextHash);
        }
      }
      triggerCopyFeedback(feedbackKey);
    },
    [triggerCopyFeedback]
  );

  // Handle initial hash scroll & external hashchange navigation
  useEffect(() => {
    const handleHashChange = () => {
      const resolved = resolveSectionIdFromHash(
        window.location.hash,
        POLICY_SECTIONS
      );
      setActiveSectionId(resolved);
      const element = document.getElementById(resolved);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    if (window.location.hash) {
      const resolved = resolveSectionIdFromHash(
        window.location.hash,
        POLICY_SECTIONS
      );
      const element = document.getElementById(resolved);
      if (element) {
        element.scrollIntoView({ block: 'start' });
      }
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Track reading progress & currently visible section
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const ratio = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;
      setScrollProgress(ratio);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveSectionId(visible[0].target.id);
        }
      },
      {
        rootMargin: '-18% 0px -65% 0px',
        threshold: 0,
      }
    );

    for (const section of filteredSections) {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [filteredSections]);

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#1C1917] flex flex-col">
      <TopBar
        activeSectionId={activeSectionId}
        copiedTarget={copiedTarget}
        scrollProgress={scrollProgress}
        onNavigateSection={navigateToSection}
        onCopyActiveLink={() => handleCopySectionLink(activeSectionId, 'topbar')}
      />

      {/* Broadsheet Editorial Masthead */}
      <section className="border-b border-[#E5DFD3] bg-[#F7F4EE]">
        <div className="mx-auto max-w-[1200px] px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-medium tracking-wider uppercase text-[#57534E]">
            <span className="whitespace-nowrap">{POLICY_METADATA.domain}</span>
            <span aria-hidden="true">·</span>
            <span className="whitespace-nowrap">Public Privacy Charter</span>
            <span aria-hidden="true" className="hidden sm:inline">
              ·
            </span>
            <span className="basis-full sm:basis-auto whitespace-nowrap tabular-nums">
              Effective {POLICY_METADATA.effectiveDate}
            </span>
          </div>

          <h1 className="mt-4 max-w-3xl font-serif text-4xl font-semibold tracking-tight text-[#1C1917] sm:text-5xl [text-wrap:balance]">
            Privacy Policy &amp; Public Data Charter
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#44403C]">
            This public charter explains how {POLICY_METADATA.entityName}{' '}
            handles reader, subscriber, and market-platform data on{' '}
            <span className="font-medium text-[#1C1917]">
              {POLICY_METADATA.domain}
            </span>
            . Every clause carries a permanent section anchor link for direct
            reference, compliance verification, and public inspection.
          </p>

          {/* Canonical Public Section Link Bar */}
          <div className="mt-8 flex flex-col gap-3 rounded-lg border border-[#D6CEBE] bg-white p-3.5 sm:flex-row sm:items-center sm:justify-between no-print">
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-semibold tracking-wider uppercase text-[#57534E]">
                Active Public Section Link
              </p>
              <p
                data-testid="active-canonical-url"
                className="mt-0.5 break-all font-mono text-xs text-[#1C1917] sm:truncate sm:text-sm"
              >
                {activeCanonicalUrl}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={() =>
                  handleCopySectionLink(activeSectionId, 'masthead')
                }
                className="inline-flex min-h-[40px] items-center gap-2 rounded-md bg-[#1C1917] px-4 py-2 text-xs font-semibold text-white transition-colors duration-150 hover:bg-[#292524] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A] whitespace-nowrap shrink-0 cursor-pointer"
              >
                {copiedTarget === 'masthead' ? (
                  <>
                    <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Copied Public Link</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Copy Public Link</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex min-h-[40px] items-center gap-2 rounded-md border border-[#D6CEBE] bg-[#FBF9F5] px-4 py-2 text-xs font-semibold text-[#1C1917] transition-colors duration-150 hover:bg-[#F3EFE8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A] whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Printer className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Print Policy</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Two-Column Reading Canvas */}
      <main className="mx-auto w-full max-w-[1200px] flex-1 px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[272px_1fr] lg:gap-14">
          <TableOfContents
            sections={filteredSections}
            totalCount={POLICY_SECTIONS.length}
            activeSectionId={activeSectionId}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onNavigateSection={navigateToSection}
          />

          <div className="min-w-0">
            {filteredSections.length === 0 ? (
              <div className="rounded-lg border border-[#E5DFD3] bg-white p-8 text-center">
                <h2 className="font-serif text-xl font-semibold text-[#1C1917]">
                  No Matching Policy Clauses
                </h2>
                <p className="mt-2 text-sm text-[#57534E]">
                  No sections matched{' '}
                  <span className="font-mono text-[#1C1917]">
                    &ldquo;{searchQuery}&rdquo;
                  </span>
                  . Clear your filter to browse all {POLICY_SECTIONS.length}{' '}
                  sections of the {POLICY_METADATA.domain} Privacy Policy.
                </p>
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="mt-5 inline-flex min-h-[40px] items-center gap-2 rounded-md bg-[#1E3A8A] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#172E6E] focus-visible:outline-2 focus-visible:outline-[#1E3A8A] cursor-pointer"
                >
                  <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Reset Search</span>
                </button>
              </div>
            ) : (
              <div className="space-y-12">
                {filteredSections.map((section, idx) => (
                  <PolicySectionCard
                    key={section.id}
                    section={section}
                    isFirstSection={idx === 0 && !searchQuery.trim()}
                    copiedTarget={copiedTarget}
                    onCopySectionLink={(id) => handleCopySectionLink(id, id)}
                  >
                    {section.id === 'contact-dpo' && <PrivacyRequestForm />}
                  </PolicySectionCard>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Quiet Institutional Footer */}
      <footer className="border-t border-[#E5DFD3] bg-[#F7F4EE]">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-6 px-4 py-10 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="space-y-1">
            <p className="font-serif text-base font-semibold text-[#1C1917]">
              {POLICY_METADATA.entityName}
            </p>
            <p className="text-xs text-[#57534E]">
              {POLICY_METADATA.registeredAddress} · Policy Version{' '}
              <span className="font-mono tabular-nums">
                {POLICY_METADATA.version}
              </span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-[#44403C]">
            <a
              href="#overview"
              onClick={(e) => {
                e.preventDefault();
                navigateToSection('overview');
              }}
              className="hover:text-[#1E3A8A] hover:underline underline-offset-4 whitespace-nowrap"
            >
              Overview
            </a>
            <a
              href="#cookies-tracking"
              onClick={(e) => {
                e.preventDefault();
                navigateToSection('cookies-tracking');
              }}
              className="hover:text-[#1E3A8A] hover:underline underline-offset-4 whitespace-nowrap"
            >
              Cookies
            </a>
            <a
              href="#data-retention"
              onClick={(e) => {
                e.preventDefault();
                navigateToSection('data-retention');
              }}
              className="hover:text-[#1E3A8A] hover:underline underline-offset-4 whitespace-nowrap"
            >
              Retention Schedule
            </a>
            <a
              href="#privacy-rights"
              onClick={(e) => {
                e.preventDefault();
                navigateToSection('privacy-rights');
              }}
              className="hover:text-[#1E3A8A] hover:underline underline-offset-4 whitespace-nowrap"
            >
              Global Rights
            </a>
            <a
              href={`mailto:${POLICY_METADATA.dpoEmail}`}
              className="font-mono text-[#1E3A8A] hover:underline underline-offset-4 whitespace-nowrap"
            >
              {POLICY_METADATA.dpoEmail}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
