import { Search, X } from 'lucide-react';
import { PolicySection } from '../utils/privacyPolicy';

interface TableOfContentsProps {
  sections: PolicySection[];
  totalCount: number;
  activeSectionId: string;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onNavigateSection: (sectionId: string) => void;
}

export function TableOfContents({
  sections,
  totalCount,
  activeSectionId,
  searchQuery,
  onSearchChange,
  onNavigateSection,
}: TableOfContentsProps) {
  return (
    <aside aria-label="Privacy policy directory" className="no-print">
      <div className="lg:sticky lg:top-24 lg:space-y-6">
        <div>
          <label
            htmlFor="policy-search"
            className="block text-xs font-semibold tracking-wider uppercase text-[#57534E] mb-2"
          >
            Search Clauses
          </label>
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#78716C]"
              aria-hidden="true"
            />
            <input
              id="policy-search"
              type="search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Filter clauses or topics"
              className="min-h-[44px] w-full rounded-md border border-[#D6CEBE] bg-white pl-9 pr-9 py-2 text-sm text-[#1C1917] placeholder:text-[#78716C] transition-colors focus:border-[#1E3A8A] focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                aria-label="Clear policy search"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1.5 text-[#78716C] hover:text-[#1C1917] focus-visible:outline-2 focus-visible:outline-[#1E3A8A] cursor-pointer"
              >
                <X className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            )}
          </div>
          {searchQuery.trim() && (
            <p className="mt-2 text-xs text-[#57534E] tabular-nums">
              Showing {sections.length} of {totalCount} sections
            </p>
          )}
        </div>

        <nav aria-label="Section index" className="border-t border-[#E5DFD3] pt-5">
          <p className="text-xs font-semibold tracking-wider uppercase text-[#57534E] mb-3">
            Public Section Links
          </p>
          <ul className="grid grid-cols-2 gap-1.5 lg:grid-cols-1 lg:gap-1">
            {sections.map((section) => {
              const isActive = activeSectionId === section.id;
              return (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigateSection(section.id);
                    }}
                    aria-current={isActive ? 'location' : undefined}
                    className={`flex min-h-[40px] items-baseline justify-between gap-2 rounded-md px-2.5 py-2 text-xs sm:text-sm lg:px-3 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-[#1E3A8A] ${
                      isActive
                        ? 'bg-[#1E3A8A]/8 font-semibold text-[#1E3A8A]'
                        : 'text-[#44403C] hover:bg-[#F3EFE8] hover:text-[#1C1917]'
                    }`}
                  >
                    <span className="truncate">
                      <span className="font-mono text-xs mr-1.5 tabular-nums text-[#78716C]">
                        {section.number}.
                      </span>
                      {section.navLabel}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
