export const BC_NS_CHECKLIST_PATH = '/resources/bigcommerce-netsuite-production-readiness';
export const BC_NS_ARTICLE_PATH = '/blog/bigcommerce-netsuite-integration-production-problems';
export const BC_NS_COMMERCIAL_PATH = '/integrations/netsuite-bigcommerce';

export const bcNsMeta = {
  title: 'Custom BigCommerce NetSuite Integration',
  metaTitle: 'Custom BigCommerce NetSuite Integration | Aizaz Studio',
  metaDescription:
    'Custom BigCommerce NetSuite integration for pricing, orders, inventory, fulfilment, and recovery when production sync fails.',
  heroSubtitle:
    'Connect BigCommerce and NetSuite around the way the business actually operates, including pricing, orders, inventory, fulfilment, and the edge cases standard connectors struggle with.',
  primaryCta: { label: 'Review your integration', href: '#contact' },
  secondaryCta: { label: 'See how we approach it', href: '#experience' },
};

export const recognitionProblems = [
  {
    title: 'Customer specific pricing',
    body: 'A customer inherits wholesale pricing and still has negotiated prices on selected items. Group pricing alone cannot hold both.',
  },
  {
    title: 'Order state',
    body: 'Authorization, capture, fulfilment, and cancellations do not always map cleanly between the storefront and NetSuite.',
  },
  {
    title: 'Custom workflows',
    body: 'Custom records, SuiteScript, or approval rules the connector was never written to understand.',
  },
  {
    title: 'Failure recovery',
    body: 'A failed sync needs visibility, a safe retry, and reconciliation, not someone comparing both systems by hand.',
  },
];

export const pricingStory = {
  problem:
    'Standard customer group pricing was not enough. Specific customers also had negotiated item prices that had to survive next to their normal wholesale list.',
  approach:
    'Map the NetSuite customer to a BigCommerce group, put exceptions on a customer specific price list, and keep the wholesale list as the fallback.',
  why:
    'Without explicit fallback, pricing sync either copies far too much data or drops the negotiated prices. That decision shows up after the connector demo.',
};

export const pricingFlow = [
  { label: 'NetSuite Customer', kind: 'root' },
  { label: 'Standard Wholesale Price Level', kind: 'split' },
  { label: 'Negotiated Item Pricing', kind: 'split' },
  { label: 'BigCommerce Customer Group', kind: 'step' },
  { label: 'Customer specific Price List', kind: 'step' },
  { label: 'Item Overrides', kind: 'step' },
  { label: 'Wholesale Fallback', kind: 'end' },
] as const;

export const connectorRows = [
  { situation: 'Standard orders', connector: 'Usually enough', custom: 'Often unnecessary', connectorTone: 'enough', customTone: 'muted' },
  { situation: 'Basic inventory', connector: 'Usually enough', custom: 'Depends on locations', connectorTone: 'enough', customTone: 'depends' },
  { situation: 'Standard pricing', connector: 'Usually enough', custom: 'Often unnecessary', connectorTone: 'enough', customTone: 'muted' },
  { situation: 'Customer specific pricing', connector: 'May be restrictive', custom: 'Custom makes sense', connectorTone: 'depends', customTone: 'custom' },
  { situation: 'Custom NetSuite workflows', connector: 'Often limited', custom: 'Custom makes sense', connectorTone: 'depends', customTone: 'custom' },
  { situation: 'Complex payment states', connector: 'Depends', custom: 'Custom makes sense', connectorTone: 'depends', customTone: 'custom' },
  { situation: 'Existing broken integration', connector: 'Diagnose first', custom: 'Rescue may help', connectorTone: 'depends', customTone: 'depends' },
  { situation: 'Multiple connected systems', connector: 'Often constrained', custom: 'Custom makes sense', connectorTone: 'depends', customTone: 'custom' },
] as const;

export const connectItems = [
  {
    title: 'Orders',
    body: 'Creation, status, cancellations, and the custom order logic the connector cannot express.',
  },
  {
    title: 'Inventory',
    body: 'Location aware availability, so the storefront does not sell stock that cannot ship.',
  },
  {
    title: 'Customers',
    body: 'Customer records, groups, and B2B account structures that have to match NetSuite.',
  },
  {
    title: 'Pricing',
    body: 'Price levels, customer specific lists, discounts, and a defined fallback.',
  },
  {
    title: 'Fulfilment',
    body: 'Shipment and fulfilment state flowing back so BigCommerce stays honest.',
  },
  {
    title: 'Payments',
    body: 'Authorization, capture, and reference state, only where the workflow requires it.',
  },
];


export const reliabilityItems = [
  {
    title: 'Duplicate protection',
    term: 'Idempotency',
    body: 'A retry should not create a second Sales Order.',
  },
  {
    title: 'Recovery',
    term: 'Replay',
    body: 'Failed records should be safely replayable.',
  },
  {
    title: 'Reconciliation',
    term: 'Expected vs actual',
    body: 'Your team should know which records disagree between BigCommerce and NetSuite.',
  },
  {
    title: 'Visibility',
    term: 'Observability',
    body: 'Failures should show up before accounting or fulfilment discovers them.',
  },
];

export const proofSnippets = [
  {
    title: 'NetSuite / ecommerce work',
    body: 'Prior team implementation experience around pricing, order flows, and custom integration logic.',
    href: '#experience',
    linkLabel: 'See the pricing example',
  },
  {
    title: '1Archiver',
    body: 'Durable processing across multiple external provider boundaries, at a design target of tens of terabytes.',
    href: '/case-studies/1archiver-compliance-platform',
    linkLabel: 'Case study',
  },
  {
    title: 'PropertyMatch',
    body: 'Reached production in 14 days. Different domain. Same delivery question.',
    href: '/case-studies/propertymatchmaker-real-estate-saas',
    linkLabel: 'Case study',
  },
];

export const clientVoices = {
  featured: {
    text: "Having direct access to the studio's technical leadership throughout the project was particularly valuable. They understood the complexity of building a scalable multi-tenant SaaS architecture and approached the work with professionalism, clarity, and a strong focus on getting things right.",
    author: 'Sanjay Khosla',
    meta: 'Tracy, California · Upwork review',
    project: 'SalesAngel architecture',
    href: '/case-studies/designing-multi-tenant-crm-architecture',
    sourceLabel: 'Upwork review',
    context: 'Architecture engagement, not a BigCommerce and NetSuite project.',
  },
  supporting: [
    {
      text: 'Ali did an incredible job completing my project, he worked hard and fast to get everything done within the short time frame I had. The quality of the work was great as well, anytime I had an edit or fix I wanted he was able to get it done perfectly.',
      author: 'Oran',
      meta: 'Los Angeles · Upwork review',
      project: 'PropertyMatch',
      href: '/case-studies/propertymatchmaker-real-estate-saas',
      sourceLabel: 'Upwork review',
    },
    {
      text: 'Aizaz Studio demonstrated a high level of professionalism and technical expertise throughout the engagement. Their full-stack development skills, attention to detail, and adherence to best practices made them a valuable contributor to our project. The work was delivered on time and met all requirements.',
      author: 'Jesse Dahir-Kanehl',
      meta: 'Kanehl Consulting LLC · Upwork review',
      project: 'Code Checker',
      href: '/case-studies/modernizing-multi-language-code-checking-tool',
      sourceLabel: 'Upwork review',
    },
  ],
  ctaFragment: {
    text: 'he worked hard and fast to get everything done within the short time frame I had.',
    author: 'Oran',
  },
};

export const deliverySteps = [
  {
    step: '01',
    title: 'Review',
    body: 'Understand the current system and failure points.',
  },
  {
    step: '02',
    title: 'Map',
    body: 'Define data ownership and business rules.',
  },
  {
    step: '03',
    title: 'Customize',
    body: 'Keep what works and engineer the gaps.',
  },
  {
    step: '04',
    title: 'Prove',
    body: 'Test failure cases and deploy with visibility.',
  },
];

export const faqs = [
  {
    question: 'Do we need a custom integration, or can we use a connector?',
    answer:
      'Use the connector when standard orders, inventory, pricing, and fulfilment already match the operation. Custom work is for the rules the connector cannot represent safely, not a default upgrade.',
  },
  {
    question: 'Can you work with an existing integration?',
    answer:
      'Yes. We start with what is already connected, what is failing, and what still works. The job is usually to keep the stable paths and repair the ones creating operational risk.',
  },
  {
    question: 'Can you handle customer specific pricing?',
    answer:
      'Yes, when source of truth and fallback are defined. A common shape is NetSuite customer → BigCommerce group → customer specific list → wholesale fallback. That is one working pattern, not the only one.',
  },
  {
    question: 'Do you work with custom NetSuite records and workflows?',
    answer:
      'Yes. Custom records, SuiteScript, approval rules, and transaction forms the connector does not understand are usually why a packaged connector starts to lie. Those rules have to live in the integration, not in a spreadsheet after checkout.',
  },
  {
    question: 'Can you rescue an unstable integration?',
    answer:
      'Yes. We reproduce the failures, trace ownership, and stabilize the smallest critical paths first. Sometimes that is configuration. Sometimes it is middleware. Sometimes the right answer is to leave the connector alone.',
  },
];

export const checklistGroups = [
  {
    heading: 'Data ownership',
    items: [
      'Products — which catalog is authoritative, and what happens to unpublished or inactive items',
      'Customers and companies — guest checkout, duplicates, B2B parent/child accounts',
      'Pricing — list, group, customer-specific, contract, and promotion precedence',
      'Inventory — location, available vs on-hand, kits, safety stock, allocations',
      'Orders — create vs update, edits after submit, cancelled and reopened orders',
      'Fulfilment — partial shipments, multiple packages, 3PL handoff',
      'Payments — authorized, captured, settled, refunded, and failed capture',
    ],
  },
  {
    heading: 'Order lifecycle',
    items: [
      'Creation timing — when the NetSuite Sales Order is allowed to exist',
      'Payment state at import — pending, authorized, captured',
      'Updates after the first sync — line edits, address changes, hold',
      'Cancellations and refunds in both directions',
      'Partial fulfilment and remaining quantity',
      'Status returned to BigCommerce after NetSuite fulfilment',
    ],
  },
  {
    heading: 'Pricing',
    items: [
      'NetSuite price levels vs BigCommerce price lists',
      'Customer group mapping and company-level overrides',
      'Special / contract pricing and quantity breaks',
      'Discounts already baked into a BigCommerce line vs a NetSuite discount item',
      'Fallback when a customer-specific list is missing',
      'Who may update a price, and how stale storefront prices are detected',
    ],
  },
  {
    heading: 'Reliability',
    items: [
      'Idempotency keys and external IDs on orders, payments, and refunds',
      'Duplicate-event handling from webhooks and polling',
      'Retry policy that cannot create a second Sales Order',
      'API governance / rate-limit backoff',
      'Replay from a dead-letter or manual-review queue',
      'Reconciliation jobs that compare expected and actual state',
      'Alerts that name the business record, not only the HTTP status',
    ],
  },
  {
    heading: 'Operations',
    items: [
      'Structured logs with order, customer, and event IDs',
      'A view of failed records the ops team can open without an engineer',
      'Named owner for the integration after launch',
      'Runbook for the top failure modes',
      'Safe replay vs “edit it in NetSuite and hope”',
    ],
  },
  {
    heading: 'Deployment',
    items: [
      'Sandbox mapping that matches production subsidiaries and locations',
      'Edge-case tests: duplicate webhook, partial fulfil, missing price, API timeout',
      'Cutover plan and freeze window',
      'Rollback that does not leave split-brain records',
      'Post-launch monitoring for the first order cycles',
    ],
  },
];
