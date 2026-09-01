import type { SeoPage } from '../data/seoPages';
import { SITE_URL } from '../data/seoPages';
import { BOOKING_URL } from '../data/siteConfig';

interface FaqItem {
    question: string;
    answer: string;
}

interface BreadcrumbItem {
    label: string;
    href: string;
}

export function buildServiceSchema(page: SeoPage, canonicalPath: string) {
    const pageUrl = `${SITE_URL}${canonicalPath}`;

    return {
        '@type': 'Service',
        '@id': `${pageUrl}#service`,
        name: page.title,
        description: page.metaDescription,
        url: pageUrl,
        serviceType: page.title,
        image: `${SITE_URL}/aizaz-logo-white.png`,
        provider: {
            '@type': 'Organization',
            '@id': `${SITE_URL}/#organization`,
            name: 'Aizaz Studio',
            url: SITE_URL,
            logo: `${SITE_URL}/aizaz-logo-white.png`,
        },
        areaServed: {
            '@type': 'Place',
            name: 'Worldwide',
        },
        offers: {
            '@type': 'Offer',
            url: BOOKING_URL,
            availability: 'https://schema.org/InStock',
            priceCurrency: 'USD',
            name: 'Free strategy call',
            description: 'Book a free discovery call to discuss scope, timeline, and fit.',
        },
    };
}

export function buildFaqSchema(faqs: FaqItem[]) {
    if (faqs.length === 0) return null;

    return {
        '@type': 'FAQPage',
        '@id': '#faq',
        mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        })),
    };
}

export function buildBreadcrumbSchema(
    breadcrumb: BreadcrumbItem[],
    currentPageTitle: string,
    canonicalPath: string,
) {
    return {
        '@type': 'BreadcrumbList',
        '@id': `${SITE_URL}${canonicalPath}#breadcrumb`,
        itemListElement: [
            ...breadcrumb.map((item, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                name: item.label,
                item: `${SITE_URL}${item.href}`,
            })),
            {
                '@type': 'ListItem',
                position: breadcrumb.length + 1,
                name: currentPageTitle,
                item: `${SITE_URL}${canonicalPath}`,
            },
        ],
    };
}

export function buildSeoPageSchemas(
    page: SeoPage,
    breadcrumb: BreadcrumbItem[],
    canonicalPath: string,
) {
    const organization = {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'Aizaz Studio',
        url: SITE_URL,
        logo: `${SITE_URL}/aizaz-logo-white.png`,
    };

    const schemas: Record<string, unknown>[] = [
        organization,
        buildServiceSchema(page, canonicalPath),
    ];

    const faqSchema = buildFaqSchema(page.faqs);
    if (faqSchema) {
        schemas.push(faqSchema);
    }

    schemas.push(buildBreadcrumbSchema(breadcrumb, page.title, canonicalPath));

    return schemas;
}

export function buildStructuredDataGraph(schemas: Record<string, unknown>[]) {
    return {
        '@context': 'https://schema.org',
        '@graph': schemas,
    };
}
