export const BLOG_CATEGORIES = [
    'AI & Automation',
    'SaaS Development',
    'Software Engineering',
    'Cloud & DevOps',
    'Business Automation',
    'ERP & NetSuite',
    'Case Studies',
    'Engineering Insights',
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export function normalizeCategory(category: string): string {
    const map: Record<string, string> = {
        'AI Automation': 'AI & Automation',
        'ERP Integration': 'ERP & NetSuite',
        'NetSuite & ERP': 'ERP & NetSuite',
        DevOps: 'Cloud & DevOps',
    };
    return map[category] ?? category;
}
