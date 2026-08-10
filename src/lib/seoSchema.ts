import type { SeoPage } from '../data/seoPages';
import { SITE_URL } from '../data/seoPages';

interface FaqItem {
    question: string;
    answer: string;
}

export function buildServiceSchema(page: SeoPage, canonicalPath: string) {
    const pageUrl = `${SITE_URL}${canonicalPath}`;

    return {
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': `${pageUrl}#service`,
        name: page.title,
        description: page.metaDescription,
        url: pageUrl,
        serviceType: page.title,
        category: page.keywords[0],
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
            url: `${SITE_URL}/book-a-call`,
            availability: 'https://schema.org/InStock',
            priceCurrency: 'USD',
            price: '0',
            name: 'Free strategy call',
            description: 'Book a free discovery call to discuss scope, timeline, and fit.',
        },
        hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: `${page.title} engagement options`,
            itemListElement: [
                {
                    '@type': 'Offer',
                    itemOffered: {
                        '@type': 'Service',
                        name: page.title,
                        description: page.heroSubtitle,
                    },
                },
                {
                    '@type': 'Offer',
                    url: `${SITE_URL}/ai-systems-sprint`,
                    itemOffered: {
                        '@type': 'Service',
                        name: 'AI Systems Sprint',
                        description: 'A focused 14 day engagement to automate one high impact workflow.',
                    },
                },
            ],
        },
    };
}

export function buildFaqSchema(faqs: FaqItem[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
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
