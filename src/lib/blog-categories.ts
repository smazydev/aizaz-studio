/** Canonical public blog filter categories (fixed order). */
export const BLOG_FILTER_CATEGORIES = [
    'Engineering Insights',
    'AI & Automation',
    'NetSuite & ERP',
    'Cloud & DevOps',
    'SaaS & Product',
] as const;

export type BlogFilterCategory = (typeof BLOG_FILTER_CATEGORIES)[number];

/** @deprecated Use BLOG_FILTER_CATEGORIES — kept for Studio/back-compat references. */
export const BLOG_CATEGORIES = BLOG_FILTER_CATEGORIES;

export type BlogCategory = BlogFilterCategory;

const CATEGORY_ALIASES: Record<string, BlogFilterCategory> = {
    'AI Automation': 'AI & Automation',
    'Business Automation': 'AI & Automation',
    'ERP Integration': 'NetSuite & ERP',
    'ERP & NetSuite': 'NetSuite & ERP',
    NetSuite: 'NetSuite & ERP',
    Cloud: 'Cloud & DevOps',
    DevOps: 'Cloud & DevOps',
    SaaS: 'SaaS & Product',
    'SaaS Engineering': 'SaaS & Product',
    'SaaS Development': 'SaaS & Product',
    'Software Engineering': 'Engineering Insights',
    'Case Studies': 'Engineering Insights',
};

/** Map legacy/editorial labels to canonical public filter categories. */
export function normalizeCategory(category: string): string {
    return CATEGORY_ALIASES[category] ?? category;
}

export function getBlogFilterCategories(): readonly string[] {
    return ['All', ...BLOG_FILTER_CATEGORIES];
}
