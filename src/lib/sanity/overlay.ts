export function pickString(value: string | null | undefined, fallback: string): string {
    const trimmed = value?.trim();
    return trimmed ? trimmed : fallback;
}

export function pickOptionalString(value: string | null | undefined): string | undefined {
    const trimmed = value?.trim();
    return trimmed || undefined;
}

export function pickStringArray(
    value: Array<string | null | undefined> | null | undefined,
    fallback: string[],
): string[] {
    const fromCms = (value ?? [])
        .map((item) => item?.trim())
        .filter((item): item is string => Boolean(item));
    return fromCms.length > 0 ? fromCms : fallback;
}

export type CmsFaq = {
    question?: string | null;
    answer?: string | null;
    enabled?: boolean | null;
};

export function pickFaqs(
    value: CmsFaq[] | null | undefined,
    fallback: { question: string; answer: string }[],
): { question: string; answer: string }[] {
    const fromCms = (value ?? [])
        .filter((item) => item?.enabled !== false && item?.question?.trim() && item?.answer?.trim())
        .map((item) => ({
            question: item.question!.trim(),
            answer: item.answer!.trim(),
        }));
    return fromCms.length > 0 ? fromCms : fallback;
}

export type CmsLink = {
    label?: string | null;
    href?: string | null;
};

export function pickLinks(
    value: CmsLink[] | null | undefined,
    fallback: { label: string; href: string }[],
): { label: string; href: string }[] {
    const fromCms = (value ?? [])
        .filter((item) => item?.label?.trim() && item?.href?.trim())
        .map((item) => ({
            label: item.label!.trim(),
            href: item.href!.trim(),
        }));
    return fromCms.length > 0 ? fromCms : fallback;
}

export function pickLink(
    value: CmsLink | null | undefined,
    fallback?: { label: string; href: string },
): { label: string; href: string } | undefined {
    if (value?.label?.trim() && value?.href?.trim()) {
        return { label: value.label.trim(), href: value.href.trim() };
    }
    return fallback;
}
