import type { SeoPage } from './seoPages';

export const integrationPages: SeoPage[] = [
  {
    slug: 'netsuite-bigcommerce',
    title: 'Custom BigCommerce NetSuite Integration',
    metaTitle: 'Custom BigCommerce NetSuite Integration | Aizaz Studio',
    metaDescription:
      'Custom BigCommerce NetSuite integration for pricing, orders, inventory, fulfilment, and recovery when production sync fails.',
    heroSubtitle:
      'Connect BigCommerce and NetSuite around the way the business actually operates, including pricing, orders, inventory, fulfilment, and the edge cases standard connectors struggle with.',
    keywords: [
      'BigCommerce NetSuite integration',
      'NetSuite BigCommerce integration',
      'BigCommerce ERP integration',
      'NetSuite ecommerce integration',
    ],
    problem:
      'A connector can move a basic order and still leave operations reconciling customer groups, inventory locations, fulfilment updates, tax, payments, and failed records by hand. Those gaps become expensive as order volume and business rules grow.',
    solution:
      'Aizaz Studio designs and builds the integration layer around clear data ownership, explicit mappings, idempotent processing, safe retries, reconciliation, and monitoring. We can extend a packaged connector, replace fragile middleware, or build a custom integration when the workflow justifies it.',
    capabilities: [
      'BigCommerce orders to NetSuite sales orders and downstream fulfilment',
      'Customer, company, address, and customer-group mapping',
      'Inventory synchronization with explicit location and availability rules',
      'Price lists, promotions, wholesale, and customer-specific pricing logic',
      'Tax, payment, refund, cancellation, and partial-fulfilment handling',
      'Queues, idempotency keys, retries, and dead-letter workflows',
      'Reconciliation reports, alerts, logging, and operational dashboards',
      'Recovery and stabilization of existing integrations',
    ],
    useCases: [
      'BigCommerce order → validate and deduplicate → NetSuite sales order → fulfilment status returned',
      'NetSuite inventory by location → availability rules → BigCommerce storefront quantity',
      'Customer group or account → NetSuite price level → governed storefront pricing',
      'Failed record → retry queue → operator review → replay → reconciliation report',
    ],
    faqs: [
      {
        question: 'When is a packaged BigCommerce and NetSuite connector enough?',
        answer:
          'A packaged connector is usually the right first choice when standard order, customer, inventory, and fulfilment flows match your operation. Custom work is justified when pricing, account structures, locations, fulfilment rules, or exception handling cannot be represented safely in the connector.',
      },
      {
        question: 'Can you repair an existing BigCommerce NetSuite integration?',
        answer:
          'Yes. We trace data ownership and mappings, reproduce failures, inspect queues and logs, and stabilize the smallest critical paths first. The goal is to preserve what works and replace only the parts creating operational risk.',
      },
      {
        question: 'How do you stop retries from creating duplicate orders?',
        answer:
          'We use stable external identifiers, idempotency checks, explicit state transitions, and replay-safe handlers. A retried message should continue or confirm the original operation instead of creating a second record.',
      },
      {
        question: 'Can the integration support customer-specific or wholesale pricing?',
        answer:
          'Yes, when the source of truth and precedence rules are defined. We map customer accounts or groups to NetSuite pricing structures and add validation so stale or conflicting prices are visible before they affect an order.',
      },
      {
        question: 'What should operations teams be able to see?',
        answer:
          'At minimum: which records failed, why they failed, whether a retry is safe, what was replayed, and whether the systems reconcile. Alerts should lead to an actionable record rather than a generic error email.',
      },
    ],
    relatedSlugs: ['netsuite-integration', 'api-integration'],
    primaryCta: { label: 'Review your integration', href: '#contact' },
    secondaryCta: { label: 'See how we approach it', href: '#experience' },
    ctaTitle: 'Already running BigCommerce and NetSuite?',
    ctaLede:
      'Send what currently connects them, what needs to sync, what is failing, and any custom business rules.',
  },
];

export function getIntegrationBySlug(slug: string): SeoPage | undefined {
  return integrationPages.find((page) => page.slug === slug);
}
