import { PolicySection } from '../utils/privacyPolicy';

export const POLICY_METADATA = {
  company: 'NextWallStreet',
  domain: 'nextwallstreet.com',
  effectiveDate: 'November 14, 2026',
  lastUpdated: 'November 14, 2026',
  version: '2026.2',
  dpoEmail: 'privacy@nextwallstreet.com',
  entityName: 'NextWallStreet Media & Analytics, Inc.',
  registeredAddress: '120 Broadway, Suite 2840, New York, NY 10271, United States',
};

export const POLICY_SECTIONS: PolicySection[] = [
  {
    id: 'overview',
    number: '01',
    title: 'Overview & Scope',
    navLabel: 'Overview & Scope',
    summary:
      'This public policy governs how NextWallStreet collects, processes, and safeguards personal data across nextwallstreet.com, our market research newsletters, and our analytical tools.',
    paragraphs: [
      'NextWallStreet Media & Analytics, Inc. ("NextWallStreet", "we", "our", or "us") operates the financial research, equity commentary, and market intelligence platform published at https://nextwallstreet.com and its associated subdomains, newsletters, and web applications (collectively, the "Services").',
      'This Privacy Policy applies to all visitors, registered readers, newsletter subscribers, institutional partners, and prospective contributors interacting with our public web properties. By accessing nextwallstreet.com, you acknowledge the data practices described in this document. Where applicable data protection law requires explicit consent—such as optional analytics cookies or marketing communications—we obtain your affirmative consent prior to processing.',
      'Each section of this Privacy Policy is permanently addressable via a direct public anchor link so regulators, subscribers, OAuth verification reviewers, and partners can reference or audit specific clauses directly.',
    ],
  },
  {
    id: 'information-collected',
    number: '02',
    title: 'Information We Collect',
    navLabel: 'Information Collected',
    summary:
      'We collect only the account, subscription, and technical telemetry data necessary to deliver market briefings, authenticate sessions, and prevent automated abuse.',
    paragraphs: [
      'We follow data minimization principles across all public and authenticated surfaces of nextwallstreet.com. Information falls into three clear categories depending on how you use the Services.',
    ],
    subsections: [
      {
        title: 'Information You Provide Directly',
        body: 'When you subscribe to daily market briefings, create a reader account, submit an editorial inquiry, or file a data rights request, you may provide:',
        bullets: [
          'Contact identifiers such as your name and email address.',
          'Subscription preferences, watchlist topics, and newsletter frequency settings.',
          'Billing and tax jurisdiction details processed directly through our PCI-DSS Level 1 payment processor when upgrading to paid research tiers (NextWallStreet does not store raw payment card numbers).',
          'Correspondence sent to our editorial desk or Data Protection Officer.',
        ],
      },
      {
        title: 'Information Collected Automatically',
        body: 'When you browse public articles or use interactive market tools on nextwallstreet.com, our servers automatically record standard technical metadata:',
        bullets: [
          'IP address (truncated or hashed in long-term analytics logs), browser user-agent, operating system, and referring URL.',
          'Session timestamps, pages viewed, and HTTP response diagnostics used to detect scraping, DDoS events, and latency anomalies.',
          'Essential security tokens and first-party session identifiers required to keep authenticated accounts signed in.',
        ],
      },
      {
        title: 'Information from Connected Services',
        body: 'If you choose to sign in using an external identity provider (such as Google Sign-In) or link an approved third-party feed, we receive only the profile scope you explicitly authorize—typically your verified email address, display name, and public profile identifier.',
      },
    ],
  },
  {
    id: 'market-data-usage',
    number: '03',
    title: 'How We Use Personal & Market Data',
    navLabel: 'Data Usage',
    summary:
      'Your personal information is used strictly to deliver requested research, maintain service reliability, and fulfill legal obligations—never to train third-party ad networks.',
    paragraphs: [
      'NextWallStreet uses personal information solely for transparent, well-defined operational purposes:',
    ],
    subsections: [
      {
        title: 'Service Delivery & Editorial Briefings',
        body: 'To publish and personalize market dispatches, send opted-in morning and closing bell newsletters, sync saved watchlists across devices, and manage paid memberships.',
      },
      {
        title: 'Security, Integrity & Compliance',
        body: 'To verify account authenticity, enforce rate limits, prevent unauthorized automated redistribution of proprietary market research, and satisfy tax, accounting, and regulatory recordkeeping rules.',
      },
      {
        title: 'Product Performance & Readership Analytics',
        body: 'To measure aggregated article readership, monitor page-load stability, and evaluate which financial coverage areas serve our audience best without building cross-site behavioral advertising profiles.',
      },
    ],
  },
  {
    id: 'cookies-tracking',
    number: '04',
    title: 'Cookies & Tracking Technologies',
    navLabel: 'Cookies & Tracking',
    summary:
      'Essential cookies keep sessions secure and preferences intact. Optional analytics cookies are disabled unless you explicitly enable them.',
    paragraphs: [
      'nextwallstreet.com uses a minimal set of cookies and browser local storage mechanisms. We distinguish strictly between essential operational storage and optional measurement technologies.',
    ],
    subsections: [
      {
        title: 'Strictly Necessary Cookies',
        body: 'Required for CSRF protection, load-balancer routing, authenticated session state, and storing your cookie consent choice. These cannot be switched off without breaking core site functionality.',
      },
      {
        title: 'Preference & Functional Storage',
        body: 'Remembers your selected reading layout, chart timeframe defaults, and watchlist display preferences locally in your browser.',
      },
      {
        title: 'Opt-In First-Party Analytics',
        body: 'Where enabled by your consent settings, first-party analytics measure aggregate page performance and referral sources. We honor Global Privacy Control (GPC) and Do Not Track browser signals automatically.',
      },
    ],
  },
  {
    id: 'third-party-sharing',
    number: '05',
    title: 'Third-Party Disclosures & Subprocessors',
    navLabel: 'Third-Party Sharing',
    summary:
      'NextWallStreet does not sell your personal data. We share limited data only with vetted infrastructure, email delivery, and payment subprocessors bound by strict confidentiality.',
    paragraphs: [
      'We do not sell, rent, or trade reader email addresses or behavioral data to data brokers or third-party ad exchanges. Personal data is disclosed externally only under the narrow circumstances outlined below:',
    ],
    subsections: [
      {
        title: 'Vetted Infrastructure & Service Subprocessors',
        body: 'We rely on specialized providers for cloud hosting, transactional email delivery, content delivery networks (CDNs), and subscription billing. Every subprocessor is bound by a written Data Processing Agreement (DPA) prohibiting secondary use of your data.',
      },
      {
        title: 'Legal & Regulatory Disclosures',
        body: 'We may disclose specific records if required to comply with a valid subpoena, court order, or statutory obligation, or to protect the rights, property, and safety of NextWallStreet, our readers, or the public.',
      },
      {
        title: 'Corporate Transitions',
        body: 'In the event of a merger, acquisition, or asset transfer involving NextWallStreet, reader data would remain subject to the commitments in this Privacy Policy, and advance public notice would be posted on nextwallstreet.com.',
      },
    ],
  },
  {
    id: 'data-retention',
    number: '06',
    title: 'Data Retention Schedule',
    navLabel: 'Data Retention',
    summary:
      'We keep personal records only for as long as your subscription is active or as required by financial and security recordkeeping obligations.',
    paragraphs: [
      'Retention periods are calibrated to the sensitivity and operational necessity of each category of data. Once a retention window expires, records are permanently deleted or irreversibly anonymized.',
    ],
    retentionTable: [
      {
        category: 'Reader Account Profile',
        examples: 'Name, email, preferences',
        purpose: 'Account access & newsletter delivery',
        legalBasis: 'Contract performance',
        retention: 'Active account + 30 days after deletion request',
      },
      {
        category: 'Newsletter Subscriptions',
        examples: 'Email, topic opt-ins, bounce logs',
        purpose: 'Editorial dispatch & deliverability',
        legalBasis: 'Consent / Legitimate interest',
        retention: 'Until unsubscribe + 14 days suppression record',
      },
      {
        category: 'Billing & Transaction Records',
        examples: 'Invoices, tax country, last 4 digits',
        purpose: 'Financial audit & tax compliance',
        legalBasis: 'Legal obligation',
        retention: '7 years per statutory accounting rules',
      },
      {
        category: 'Security & Edge Logs',
        examples: 'Hashed IP, request path, status code',
        purpose: 'Abuse mitigation & uptime diagnostics',
        legalBasis: 'Legitimate interest',
        retention: '30 days rolling window',
      },
      {
        category: 'Privacy Rights Requests',
        examples: 'DSR correspondence & audit trail',
        purpose: 'Compliance proof under GDPR / CCPA',
        legalBasis: 'Legal obligation',
        retention: '24 months from resolution',
      },
    ],
  },
  {
    id: 'privacy-rights',
    number: '07',
    title: 'Your Global Privacy Rights',
    navLabel: 'Global Rights',
    summary:
      'Readers worldwide—including under GDPR, UK GDPR, and CCPA/CPRA—have enforceable rights to access, export, correct, restrict, or delete their personal data.',
    paragraphs: [
      'Regardless of where you reside, NextWallStreet extends consistent privacy controls to all readers. Depending on your jurisdiction, you may exercise the following rights without discrimination:',
    ],
    subsections: [
      {
        title: 'Right to Access & Data Portability',
        body: 'Request confirmation of whether we process your personal data and obtain a structured, machine-readable JSON or CSV export of the information associated with your account.',
      },
      {
        title: 'Right to Rectification & Erasure',
        body: 'Correct inaccurate profile details directly in your account settings or request permanent deletion of your personal data, subject to mandatory financial or legal retention exceptions.',
      },
      {
        title: 'Right to Opt Out & Withdraw Consent',
        body: 'Unsubscribe from any editorial briefing in one click via email footer links, withdraw cookie consent at any time, or object to processing grounded in legitimate interest. California residents also retain the right to limit sensitive data use and opt out of any sharing as defined under CPRA.',
      },
      {
        title: 'International Data Transfers',
        body: 'When personal data from the European Economic Area, the United Kingdom, or Switzerland is processed in the United States, transfers rely on Standard Contractual Clauses (SCCs) and supplementary technical encryption safeguards.',
      },
    ],
  },
  {
    id: 'security-controls',
    number: '08',
    title: 'Security Architecture & Safeguards',
    navLabel: 'Security Controls',
    summary:
      'All public and authenticated traffic on nextwallstreet.com is encrypted in transit via TLS 1.3 and protected at rest with modern cryptographic standards.',
    paragraphs: [
      'Protecting reader trust is central to operating a financial publication. NextWallStreet enforces defense-in-depth engineering controls across all production environments:',
    ],
    subsections: [
      {
        title: 'Encryption in Transit and at Rest',
        body: 'Every connection to nextwallstreet.com enforces HTTPS with TLS 1.3 and HSTS preloading. Stored subscriber databases, backups, and authentication credentials are encrypted at rest using AES-256 and salted cryptographic hashing.',
      },
      {
        title: 'Access Governance & Incident Response',
        body: 'Production data access follows strict least-privilege role separation, hardware-backed multi-factor authentication, and immutable audit logging. In the event of a confirmed personal data breach affecting your rights, we notify relevant supervisory authorities and impacted users within statutory timelines (including within 72 hours under GDPR where applicable).',
      },
      {
        title: 'Children’s Privacy',
        body: 'nextwallstreet.com is a financial and market analysis platform intended for adults. We do not knowingly collect personal information from individuals under 16 years of age (or the applicable age of digital consent in your jurisdiction).',
      },
    ],
  },
  {
    id: 'contact-dpo',
    number: '09',
    title: 'Contact, Governance & Data Requests',
    navLabel: 'Contact & DPO',
    summary:
      'Submit a verified access, deletion, correction, or compliance inquiry directly to our Data Protection Officer or write to privacy@nextwallstreet.com.',
    paragraphs: [
      'If you have questions regarding this Privacy Policy, require a copy of our Data Processing Agreement, or wish to exercise any statutory privacy right, contact our Privacy & Compliance team directly using the verified request portal below or by email at privacy@nextwallstreet.com.',
      'We verify the identity of all requesters to protect account security before releasing or deleting personal records and respond to complete requests within 30 calendar days (or shorter timeframes where mandated by local law).',
    ],
  },
];
