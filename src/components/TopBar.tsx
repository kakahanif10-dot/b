import { Check, Link2 } from 'lucide-react';

interface TopBarProps {
  activeSectionId: string;
  copiedTarget: string | null;
  scrollProgress: number;
  onNavigateSection: (sectionId: string) => void;
  onCopyActiveLink: () => void;
}

const NAV_LINKS = [
  { id: 'overview', label: 'Overview' },
  { id: 'information-collected', label: 'Data Practices' },
  { id: 'privacy-rights', label: 'Your Rights' },
  { id: 'contact-dpo', label: 'Contact DPO' },
];

export function TopBar({
  activeSectionId,
  copiedTarget,
  scrollProgress,
  onNavigateSection,
  onCopyActiveLink,
}: TopBarProps) {
  const isTopCopied = copiedTarget === 'topbar';

  return (
    <header className="sticky top-0 z-30 border-b border-[#E5DFD3] bg-[#FBF9F5]/95 backdrop-blur-sm no-print">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-8 px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#overview"
          onClick={(e) => {
            e.preventDefault();
            onNavigateSection('overview');
          }}
          className="font-serif text-lg font-bold tracking-tight text-[#1C1917] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E3A8A]"
        >
          NextWallStreet
        </a>

        {/* Zone 2: 4 concise single-line navigation links */}
        <nav
          aria-label="Primary privacy sections"
          className="hidden md:flex items-center gap-6 text-sm font-medium text-[#57534E]"
        >
          {NAV_LINKS.map((link) => {
            const isActive = activeSectionId === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateSection(link.id);
                }}
                className={`whitespace-nowrap shrink-0 py-1 transition-colors duration-150 hover:text-[#1C1917] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E3A8A] ${
                  isActive
                    ? 'text-[#1E3A8A] underline decoration-[#1E3A8A]/50 underline-offset-4'
                    : 'hover:underline hover:decoration-stone-300 underline-offset-4'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onCopyActiveLink}
            className="inline-flex min-h-[40px] items-center gap-2 rounded-md bg-[#1E3A8A] px-4 py-2 text-xs font-semibold text-white transition-colors duration-150 hover:bg-[#172E6E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A] whitespace-nowrap shrink-0 cursor-pointer"
          >
            {isTopCopied ? (
              <>
                <Check className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Link Copied</span>
              </>
            ) : (
              <>
                <Link2 className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Copy Section Link</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Reading progress hairline */}
      <div aria-hidden="true" className="h-[2px] w-full bg-[#EBE6DF]">
        <div
          className="h-full origin-left bg-[#1E3A8A] transition-transform duration-150 ease-out"
          style={{ transform: `scaleX(${scrollProgress})` }}
        />
      </div>
    </header>
  );
}
