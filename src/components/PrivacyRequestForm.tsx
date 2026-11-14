import { FormEvent, useState } from 'react';
import { CheckCircle2, Mail } from 'lucide-react';
import {
  generateRequestReference,
  PrivacyRequestInput,
  PrivacyRequestType,
  validatePrivacyRequest,
} from '../utils/privacyPolicy';
import { POLICY_METADATA } from '../data/policyContent';

interface SubmittedReceipt {
  referenceId: string;
  fullName: string;
  email: string;
  jurisdiction: string;
  requestType: PrivacyRequestType;
  submittedAt: string;
}

const REQUEST_TYPE_LABELS: Record<PrivacyRequestType, string> = {
  access: 'Access My Data (Copy / Disclosure)',
  deletion: 'Delete My Personal Data (Erasure)',
  correction: 'Correct Inaccurate Information',
  'opt-out': 'Opt Out of Analytics / Marketing',
  portability: 'Export Data (JSON / CSV Portability)',
  general: 'General Privacy or DPA Inquiry',
};

const INITIAL_FORM: PrivacyRequestInput = {
  fullName: '',
  email: '',
  jurisdiction: 'United States (Federal / Other)',
  requestType: 'access',
  details: '',
};

export function PrivacyRequestForm() {
  const [form, setForm] = useState<PrivacyRequestInput>(INITIAL_FORM);
  const [errors, setErrors] = useState<
    Partial<Record<keyof PrivacyRequestInput, string>>
  >({});
  const [receipt, setReceipt] = useState<SubmittedReceipt | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validation = validatePrivacyRequest(form);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    const now = Date.now();
    const referenceId = generateRequestReference(form.email, now);
    setErrors({});
    setReceipt({
      referenceId,
      fullName: form.fullName.trim(),
      email: form.email.trim(),
      jurisdiction: form.jurisdiction,
      requestType: form.requestType,
      submittedAt: new Date(now).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    });
  };

  const handleReset = () => {
    setForm(INITIAL_FORM);
    setErrors({});
    setReceipt(null);
  };

  return (
    <div className="mt-8 rounded-lg border border-[#E5DFD3] bg-white p-6 sm:p-8 no-print">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#EBE6DF] pb-5">
        <div>
          <h3 className="font-serif text-xl font-semibold text-[#1C1917]">
            Submit a Privacy Rights Request
          </h3>
          <p className="mt-1 text-sm text-[#57534E]">
            Direct submission to the {POLICY_METADATA.company} Data Protection
            Officer.
          </p>
        </div>
        <a
          href={`mailto:${POLICY_METADATA.dpoEmail}`}
          className="inline-flex min-h-[40px] items-center gap-2 rounded-md border border-[#D6CEBE] bg-[#FBF9F5] px-3.5 py-2 text-xs font-medium text-[#1C1917] transition-colors hover:border-[#1E3A8A]/40 hover:text-[#1E3A8A] whitespace-nowrap shrink-0"
        >
          <Mail className="h-3.5 w-3.5" aria-hidden="true" />
          <span>{POLICY_METADATA.dpoEmail}</span>
        </a>
      </div>

      {receipt ? (
        <div
          role="status"
          aria-live="polite"
          className="mt-6 rounded-lg border border-[#14532D]/25 bg-[#14532D]/5 p-5"
        >
          <div className="flex items-start gap-3">
            <CheckCircle2
              className="mt-0.5 h-5 w-5 shrink-0 text-[#14532D]"
              aria-hidden="true"
            />
            <div className="flex-1">
              <h4 className="font-serif text-lg font-semibold text-[#1C1917]">
                Privacy Request Recorded
              </h4>
              <p className="mt-1 text-sm leading-relaxed text-[#292524]">
                Your request has been logged for verification. Our Data
                Protection Officer will respond to{' '}
                <span className="font-medium">{receipt.email}</span> within 30
                calendar days.
              </p>

              <dl className="mt-4 grid gap-3 border-t border-[#14532D]/15 pt-4 text-xs sm:grid-cols-2">
                <div>
                  <dt className="uppercase tracking-wider text-[#57534E]">
                    Reference ID
                  </dt>
                  <dd className="mt-0.5 font-mono font-medium text-[#1C1917] tabular-nums">
                    {receipt.referenceId}
                  </dd>
                </div>
                <div>
                  <dt className="uppercase tracking-wider text-[#57534E]">
                    Submitted Date
                  </dt>
                  <dd className="mt-0.5 text-[#1C1917] tabular-nums">
                    {receipt.submittedAt}
                  </dd>
                </div>
                <div>
                  <dt className="uppercase tracking-wider text-[#57534E]">
                    Request Type
                  </dt>
                  <dd className="mt-0.5 text-[#1C1917]">
                    {REQUEST_TYPE_LABELS[receipt.requestType]}
                  </dd>
                </div>
                <div>
                  <dt className="uppercase tracking-wider text-[#57534E]">
                    Jurisdiction
                  </dt>
                  <dd className="mt-0.5 text-[#1C1917]">
                    {receipt.jurisdiction}
                  </dd>
                </div>
              </dl>

              <div className="mt-5">
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex min-h-[40px] items-center rounded-md border border-[#D6CEBE] bg-white px-4 py-2 text-xs font-semibold text-[#1C1917] transition-colors hover:bg-[#F3EFE8] focus-visible:outline-2 focus-visible:outline-[#1E3A8A] cursor-pointer"
                >
                  Submit Another Request
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="dsr-full-name"
                className="block text-sm font-medium text-[#1C1917]"
              >
                Full Name
              </label>
              <input
                id="dsr-full-name"
                type="text"
                value={form.fullName}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, fullName: e.target.value }))
                }
                aria-invalid={Boolean(errors.fullName)}
                aria-describedby={
                  errors.fullName ? 'dsr-full-name-error' : undefined
                }
                placeholder="Jordan Mercer"
                className="mt-1.5 min-h-[44px] w-full rounded-md border border-[#D6CEBE] bg-[#FBF9F5]/50 px-3.5 py-2 text-sm text-[#1C1917] placeholder:text-[#78716C] focus:border-[#1E3A8A] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20"
              />
              {errors.fullName && (
                <p
                  id="dsr-full-name-error"
                  className="mt-1.5 text-xs font-medium text-[#9A3412]"
                >
                  {errors.fullName}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="dsr-email"
                className="block text-sm font-medium text-[#1C1917]"
              >
                Account Email Address
              </label>
              <input
                id="dsr-email"
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, email: e.target.value }))
                }
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'dsr-email-error' : undefined}
                placeholder="reader@example.com"
                className="mt-1.5 min-h-[44px] w-full rounded-md border border-[#D6CEBE] bg-[#FBF9F5]/50 px-3.5 py-2 text-sm text-[#1C1917] placeholder:text-[#78716C] focus:border-[#1E3A8A] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20"
              />
              {errors.email && (
                <p
                  id="dsr-email-error"
                  className="mt-1.5 text-xs font-medium text-[#9A3412]"
                >
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="dsr-jurisdiction"
                className="block text-sm font-medium text-[#1C1917]"
              >
                Jurisdiction / Privacy Framework
              </label>
              <select
                id="dsr-jurisdiction"
                value={form.jurisdiction}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, jurisdiction: e.target.value }))
                }
                aria-invalid={Boolean(errors.jurisdiction)}
                aria-describedby={
                  errors.jurisdiction ? 'dsr-jurisdiction-error' : undefined
                }
                className="mt-1.5 min-h-[44px] w-full rounded-md border border-[#D6CEBE] bg-[#FBF9F5]/50 px-3.5 py-2 text-sm text-[#1C1917] focus:border-[#1E3A8A] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20"
              >
                <option value="United States (Federal / Other)">
                  United States (Federal / Other)
                </option>
                <option value="California (CCPA/CPRA)">
                  California (CCPA / CPRA)
                </option>
                <option value="European Economic Area (GDPR)">
                  European Economic Area (GDPR)
                </option>
                <option value="United Kingdom (UK GDPR)">
                  United Kingdom (UK GDPR)
                </option>
                <option value="Canada / International">
                  Canada / Other International
                </option>
              </select>
              {errors.jurisdiction && (
                <p
                  id="dsr-jurisdiction-error"
                  className="mt-1.5 text-xs font-medium text-[#9A3412]"
                >
                  {errors.jurisdiction}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="dsr-request-type"
                className="block text-sm font-medium text-[#1C1917]"
              >
                Request Type
              </label>
              <select
                id="dsr-request-type"
                value={form.requestType}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    requestType: e.target.value as PrivacyRequestType,
                  }))
                }
                className="mt-1.5 min-h-[44px] w-full rounded-md border border-[#D6CEBE] bg-[#FBF9F5]/50 px-3.5 py-2 text-sm text-[#1C1917] focus:border-[#1E3A8A] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20"
              >
                {Object.entries(REQUEST_TYPE_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="dsr-details"
              className="block text-sm font-medium text-[#1C1917]"
            >
              Request Details
            </label>
            <textarea
              id="dsr-details"
              rows={3}
              value={form.details}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, details: e.target.value }))
              }
              aria-invalid={Boolean(errors.details)}
              aria-describedby={
                errors.details ? 'dsr-details-error' : undefined
              }
              placeholder="Describe the account records, newsletter subscription, or specific policy question you want reviewed..."
              className="mt-1.5 w-full rounded-md border border-[#D6CEBE] bg-[#FBF9F5]/50 px-3.5 py-2.5 text-sm text-[#1C1917] placeholder:text-[#78716C] focus:border-[#1E3A8A] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20"
            />
            {errors.details && (
              <p
                id="dsr-details-error"
                className="mt-1.5 text-xs font-medium text-[#9A3412]"
              >
                {errors.details}
              </p>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
            <p className="text-xs text-[#57534E]">
              Identity verification may be required prior to fulfilling account
              access or deletion requests.
            </p>
            <button
              type="submit"
              className="inline-flex min-h-[44px] items-center justify-center rounded-md bg-[#1E3A8A] px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#172E6E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A] whitespace-nowrap shrink-0 cursor-pointer"
            >
              Submit Privacy Request
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
