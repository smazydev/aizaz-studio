/**
 * Removes hyphenated compounds from user facing copy in src/data only.
 * Preserves slugs, hrefs, URLs, imports, and id fields.
 */
import fs from 'node:fs';
import path from 'node:path';

const DATA_DIR = path.join('src', 'data');
const SKIP_FILES = new Set(['siteConfig.ts']);

function shouldSkip(fullText, index) {
    const lineStart = fullText.lastIndexOf('\n', index) + 1;
    const lineEnd = fullText.indexOf('\n', index);
    const line = fullText.slice(lineStart, lineEnd === -1 ? undefined : lineEnd);

    if (/^\s*(slug|id|href|canonical|import|from|relatedSlugs|glob|image:|step:|@type|@context)\b/.test(line)) {
        return true;
    }

    const before = fullText.slice(Math.max(0, index - 40), index);
    if (/https?:\/\/[^\s'"]*$/.test(before)) return true;
    if (/['"`]\/[^'"`]*$/.test(before)) return true;
    if (/from\s+['"][^'"]*$/.test(before)) return true;
    if (/slug:\s*['"][^'"]*$/.test(before)) return true;
    if (/href:\s*['"][^'"]*$/.test(before)) return true;
    if (/relatedSlugs:\s*\[?$/.test(before)) return true;
    if (/^\s*'[^']*$/.test(before) && before.includes('relatedSlugs')) return true;

    return false;
}

function dehyphenate(text) {
    return text.replace(/([A-Za-z0-9]+)-([A-Za-z0-9]+)/g, (match, a, b, offset) => {
        if (shouldSkip(text, offset)) return match;
        return `${a} ${b}`;
    });
}

for (const file of fs.readdirSync(DATA_DIR)) {
    if (!file.endsWith('.ts') || SKIP_FILES.has(file)) continue;
    const full = path.join(DATA_DIR, file);
    const original = fs.readFileSync(full, 'utf8');
    let next = original;
    for (let i = 0; i < 3; i++) next = dehyphenate(next);
    if (next !== original) {
        fs.writeFileSync(full, next);
        console.log('updated', file);
    }
}

console.log('Done.');
