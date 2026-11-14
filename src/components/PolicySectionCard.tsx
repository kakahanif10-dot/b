import { Check, Link2 } from 'lucide-react';
import { PolicySection } from '../utils/privacyPolicy';
import { ReactNode } from 'react';

interface PolicySectionCardProps {
  section: PolicySection;
  isFirstSection: boolean;
  copiedTarget: string | null;
  onCopySectionLink: (sectionId: string) => void;
  children?: ReactNode;
}

export function PolicySectionCard({
  section,
  isFirstSection,
  copiedTarget,
  onCopySectionLink,
  children,
}: PolicySectionCardProps) {
  const isCopied = copiedTarget === section.id;

  return (
    <section
      id={section.id}
      aria-labelledby={`heading-${section.id}`}
      className="scroll-mt-24 border-t border-[#E5DFD3] pt-10 first:border-t-0 first:pt-0"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="font-mono text-xs font-medium tracking-wider uppercase text-[#57534E] tabular-nums">
            Section {section.number} · #{section.id}
          </p>
          <h2
            id={`heading-${section.id}`}
            className="mt-1.5 font-serif text-2xl font-semibold tracking-tight text-[#1C1917] sm:text-3xl [text-wrap:balance]"
          >
            {section.number}. {section.title}
          </h2>
        </div>

        <button
          type="button"
          onClick={() => onCopySectionLink(section.id)}
          aria-label={`Copy public link for Section ${section.number}: ${section.title}`}
          className={`no-print inline-flex min-h-[40px] items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A] whitespace-nowrap shrink-0 cursor-pointer ${
            isCopied
              ? 'border-[#14532D]/30 bg-[#14532D]/8 text-[#14532D]'
              : 'border-[#D6CEBE] bg-white text-[#44403C] hover:border-[#1E3A8A]/40 hover:text-[#1E3A8A]'
          }`}
        >
          {isCopied ? (
            <>
              <Check className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Copied</span>
            </>
          ) : (
            <>
              <Link2 className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Copy link</span>
            </>
          )}
        </button>
      </div>

      {/* Plain-language summary container using clean hairline border */}
      <div className="mt-5 rounded-lg border border-[#E5DFD3] bg-[#F3EFE8]/65 p-4 sm:p-5">
        <p className="text-xs font-semibold tracking-wider uppercase text-[#57534E]">
          In Plain English
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-[#292524]">
          {section.summary}
        </p>
      </div>

      {/* Body prose constrained to comfortable reading measure */}
      <div className="mt-6 space-y-4 max-w-[70ch] text-[15.5px] leading-[1.75] text-[#292524]">
        {section.paragraphs.map((paragraph, idx) => {
          const useDropCap = isFirstSection && idx === 0;
          return (
            <p
              key={idx}
              className={
                useDropCap
                  ? 'first-letter:float-left first-letter:mr-2 first-letter:mt-0.5 first-letter:font-serif first-letter:text-[3.25rem] first-letter:font-bold first-letter:leading-[0.82] first-letter:text-[#1C1917]'
                  : undefined
              }
            >
              {paragraph}
            </p>
          );
        })}
      </div>

      {/* Subsections */}
      {section.subsections && section.subsections.length > 0 && (
        <div className="mt-7 space-y-6 max-w-[70ch]">
          {section.subsections.map((sub) => (
            <div key={sub.title}>
              <h3 className="font-serif text-lg font-semibold text-[#1C1917]">
                {sub.title}
              </h3>
              <p className="mt-1.5 text-[15px] leading-[1.7] text-[#292524]">
                {sub.body}
              </p>
              {sub.bullets && sub.bullets.length > 0 && (
                <ul className="mt-2.5 list-disc space-y-1.5 pl-5 text-[15px] leading-[1.65] text-[#44403C]">
                  {sub.bullets.map((bullet, bIdx) => (
                    <li key={bIdx}>{bullet}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Structured Data Retention Table */}
      {section.retentionTable && section.retentionTable.length > 0 && (
        <div className="mt-7 overflow-x-auto rounded-lg border border-[#E5DFD3] bg-white">
          <table className="w-full min-w-[600px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-[#E5DFD3] bg-[#F3EFE8]/60 text-xs font-semibold tracking-wider uppercase text-[#57534E]">
                <th scope="col" className="px-4 py-3">
                  Data Category
                </th>
                <th scope="col" className="px-4 py-3">
                  Examples
                </th>
                <th scope="col" className="px-4 py-3">
                  Purpose & Legal Basis
                </th>
                <th scope="col" className="px-4 py-3">
                  Retention Window
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EBE6DF] text-[#292524]">
              {section.retentionTable.map((row) => (
                <tr key={row.category} className="align-top">
                  <td className="px-4 py-3.5 font-medium text-[#1C1917]">
                    {row.category}
                  </td>
                  <td className="px-4 py-3.5 text-[#57534E]">{row.examples}</td>
                  <td className="px-4 py-3.5">
                    <div>{row.purpose}</div>
                    <div className="mt-0.5 text-xs text-[#78716C]">
                      {row.legalBasis}
                    </div>
                  </td>
                  <td className="px-4 py-3.5 font-mono text-xs tabular-nums text-[#1C1917]">
                    {row.retention}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {children}
    </section>
  );
}
