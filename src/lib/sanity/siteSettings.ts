import { siteFooter, siteNav } from '../../data/siteChrome';
import { cachedSanityFetch, getSanityClient } from './client';
import { pickLinks, pickString } from './overlay';
import { siteSettingsQuery } from './queries';

export type SiteSettings = {
    navLinks: { href: string; label: string }[];
    navCtaLabel: string;
    navCtaHref: string;
    studio: {
        heading: string;
        blurb: string;
        email: string;
        phone: string;
        phoneHref: string;
    };
    columns: { heading: string; links: { href: string; label: string }[] }[];
};

type SanitySiteSettings = {
    navLinks?: Array<{ label?: string | null; href?: string | null }> | null;
    navCtaLabel?: string | null;
    navCtaHref?: string | null;
    studioHeading?: string | null;
    studioBlurb?: string | null;
    email?: string | null;
    phone?: string | null;
    phoneHref?: string | null;
    footerColumns?: Array<{
        heading?: string | null;
        links?: Array<{ label?: string | null; href?: string | null }> | null;
    }> | null;
};

const defaultSettings: SiteSettings = {
    navLinks: siteNav.map((link) => ({ href: link.href, label: link.label })),
    navCtaLabel: 'Start a Project',
    navCtaHref: '/start-a-project',
    studio: { ...siteFooter.studio },
    columns: siteFooter.columns.map((column) => ({
        heading: column.heading,
        links: column.links.map((link) => ({ href: link.href, label: link.label })),
    })),
};

export async function getSiteSettings(): Promise<SiteSettings> {
    const client = getSanityClient();
    if (!client) return defaultSettings;

    try {
        const doc = await cachedSanityFetch('siteSettings', () =>
            client.fetch<SanitySiteSettings | null>(siteSettingsQuery),
        );
        if (!doc) return defaultSettings;

        const columns = (doc.footerColumns ?? [])
            .filter((column) => column?.heading?.trim())
            .map((column) => ({
                heading: column.heading!.trim(),
                links: pickLinks(column.links, []),
            }))
            .filter((column) => column.links.length > 0);

        return {
            navLinks: pickLinks(doc.navLinks, defaultSettings.navLinks),
            navCtaLabel: pickString(doc.navCtaLabel, defaultSettings.navCtaLabel),
            navCtaHref: pickString(doc.navCtaHref, defaultSettings.navCtaHref),
            studio: {
                heading: pickString(doc.studioHeading, defaultSettings.studio.heading),
                blurb: pickString(doc.studioBlurb, defaultSettings.studio.blurb),
                email: pickString(doc.email, defaultSettings.studio.email),
                phone: pickString(doc.phone, defaultSettings.studio.phone),
                phoneHref: pickString(doc.phoneHref, defaultSettings.studio.phoneHref),
            },
            columns: columns.length > 0 ? columns : defaultSettings.columns,
        };
    } catch (error) {
        console.warn('[sanity] Failed to fetch site settings; using code fallbacks.', error);
        return defaultSettings;
    }
}
