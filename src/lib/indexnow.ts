import { SITE_URL } from '../data/seoPages';
import { isHiddenCaseStudySlug } from './case-study-visibility';
import { isIndexablePath, toCanonicalPath, toCanonicalUrl } from './seo-url';

const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';

function getIndexNowKey(env?: Record<string, string | undefined>): string | undefined {
    return (
        env?.INDEXNOW_KEY ||
        import.meta.env.INDEXNOW_KEY ||
        (typeof process !== 'undefined' ? process.env.INDEXNOW_KEY : undefined)
    );
}

function toIndexNowUrl(path: string): string | null {
    const canonicalPath = toCanonicalPath(path);
    if (!canonicalPath.startsWith('/')) return null;
    if (canonicalPath.includes('/_astro/')) return null;
    if (!isIndexablePath(canonicalPath)) return null;
    if (canonicalPath.startsWith('/case-studies/')) {
        const caseSlug = canonicalPath.slice('/case-studies/'.length);
        if (isHiddenCaseStudySlug(caseSlug)) return null;
    }
    return toCanonicalUrl(canonicalPath);
}

/** Notify Bing/Yandex IndexNow about changed canonical apex URLs. */
export async function notifyIndexNow(
    paths: string[],
    env?: Record<string, string | undefined>,
): Promise<{ submitted: boolean; detail: string; urls: string[] }> {
    const key = getIndexNowKey(env);
    if (!key) {
        return { submitted: false, detail: 'INDEXNOW_KEY not configured', urls: [] };
    }

    const urls = Array.from(
        new Set(
            paths
                .map(toIndexNowUrl)
                .filter((url): url is string => Boolean(url)),
        ),
    );

    if (urls.length === 0) {
        return { submitted: false, detail: 'No indexable URLs to submit', urls: [] };
    }

    const host = new URL(SITE_URL).host;
    const keyLocation = `${SITE_URL}/${key}.txt`;

    try {
        const response = await fetch(INDEXNOW_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            body: JSON.stringify({
                host,
                key,
                keyLocation,
                urlList: urls.slice(0, 10_000),
            }),
        });

        if (response.ok || response.status === 202) {
            return { submitted: true, detail: `IndexNow accepted ${urls.length} URL(s)`, urls };
        }

        const text = await response.text();
        return { submitted: false, detail: `IndexNow ${response.status}: ${text}`, urls };
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return { submitted: false, detail: `IndexNow request failed: ${message}`, urls };
    }
}
