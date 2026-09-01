export const siteNav = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/case-studies', label: 'Works' },
  { href: '/process', label: 'Process' },
  { href: '/blog', label: 'Blog' },
] as const;

export const siteFooter = {
  studio: {
    heading: 'Studio',
    blurb: 'AI, software platforms, and integrations for operations-heavy teams.',
    email: 'hello@aizaz.studio',
    phone: '+92 334 2056691',
    phoneHref: 'tel:+923342056691',
  },
  columns: [
    {
      heading: 'Services',
      links: [
        { href: '/services/ai-automation-systems', label: 'AI Automation' },
        { href: '/services/ai-agent-development', label: 'AI Agents' },
        { href: '/services/web-app-saas-development', label: 'SaaS Development' },
        { href: '/services/aws-devops', label: 'AWS & DevOps' },
        { href: '/services/netsuite-erp-automation', label: 'NetSuite / ERP' },
        { href: '/services/netsuite-integration', label: 'NetSuite Integration' },
        { href: '/services/project-rescue', label: 'Project Rescue' },
        { href: '/services/technical-audit', label: 'Technical Audit' },
      ],
    },
    {
      heading: 'Company',
      links: [
        { href: '/about', label: 'About' },
        { href: '/case-studies', label: 'Case Studies' },
        { href: '/portfolio', label: 'Portfolio' },
        { href: '/reviews', label: 'Reviews' },
        { href: '/careers', label: 'Careers' },
        { href: '/blog', label: 'Blog' },
        { href: '/for/startups', label: 'Startups' },
        { href: '/for/b2b-saas', label: 'B2B SaaS' },
      ],
    },
    {
      heading: 'Start',
      links: [
        { href: '/ai-systems-sprint', label: 'AI Systems Sprint' },
        { href: '/engagement-models', label: 'Engagement Models' },
        { href: '/process', label: 'Process' },
        { href: '/security', label: 'Security' },
        { href: '/compare', label: 'Compare' },
        { href: '/technologies', label: 'Technologies' },
        { href: '/start-a-project', label: 'Start a Project' },
        { href: '/book-a-call', label: 'Book a Call' },
      ],
    },
  ],
} as const;
