/**
 * Repairs Tailwind class strings broken by over-aggressive dehyphenation.
 * Only touches class="" and className="" attribute values.
 */
import fs from 'node:fs';
import path from 'node:path';

function fixClassValue(val) {
    let s = val;
    const rules = [
        [/translate\s+x/g, 'translate-x'],
        [/translate\s+y/g, 'translate-y'],
        [/scale\s+x/g, 'scale-x'],
        [/scale\s+y/g, 'scale-y'],
        [/group\s+hover/g, 'group-hover'],
        [/group\s+open/g, 'group-open'],
        [/active:scale/g, 'active:scale'],
        [/hover:scale/g, 'hover:scale'],
        [/hover:translate/g, 'hover:translate'],
        [/hover:bg/g, 'hover:bg'],
        [/hover:text/g, 'hover:text'],
        [/hover:border/g, 'hover:border'],
        [/focus:outline/g, 'focus:outline'],
        [/sm:flex\s+row/g, 'sm:flex-row'],
        [/sm:flex\s+col/g, 'sm:flex-col'],
        [/md:flex\s+row/g, 'md:flex-row'],
        [/md:flex\s+col/g, 'md:flex-col'],
        [/lg:flex\s+row/g, 'lg:flex-row'],
        [/lg:flex\s+col/g, 'lg:flex-col'],
        [/flex\s+col/g, 'flex-col'],
        [/flex\s+row/g, 'flex-row'],
        [/inline\s+flex/g, 'inline-flex'],
        [/inline\s+block/g, 'inline-block'],
        [/grid\s+cols/g, 'grid-cols'],
        [/col\s+span/g, 'col-span'],
        [/items\s+center/g, 'items-center'],
        [/items\s+start/g, 'items-start'],
        [/items\s+end/g, 'items-end'],
        [/items\s+stretch/g, 'items-stretch'],
        [/justify\s+center/g, 'justify-center'],
        [/justify\s+between/g, 'justify-between'],
        [/justify\s+start/g, 'justify-start'],
        [/justify\s+end/g, 'justify-end'],
        [/text\s+center/g, 'text-center'],
        [/text\s+left/g, 'text-left'],
        [/text\s+right/g, 'text-right'],
        [/text\s+balance/g, 'text-balance'],
        [/text\s+pretty/g, 'text-pretty'],
        [/max\s+w/g, 'max-w'],
        [/max\s+h/g, 'max-h'],
        [/min\s+h/g, 'min-h'],
        [/min\s+w/g, 'min-w'],
        [/mx\s+auto/g, 'mx-auto'],
        [/my\s+auto/g, 'my-auto'],
        [/space\s+y/g, 'space-y'],
        [/space\s+x/g, 'space-x'],
        [/gap\s+x/g, 'gap-x'],
        [/gap\s+y/g, 'gap-y'],
        [/rounded\s+full/g, 'rounded-full'],
        [/rounded\s+xl/g, 'rounded-xl'],
        [/rounded\s+2xl/g, 'rounded-2xl'],
        [/rounded\s+3xl/g, 'rounded-3xl'],
        [/rounded\s+lg/g, 'rounded-lg'],
        [/rounded\s+md/g, 'rounded-md'],
        [/rounded\s+sm/g, 'rounded-sm'],
        [/overflow\s+hidden/g, 'overflow-hidden'],
        [/overflow\s+x/g, 'overflow-x'],
        [/overflow\s+y/g, 'overflow-y'],
        [/pointer\s+events/g, 'pointer-events'],
        [/pointer-events-none/g, 'pointer-events-none'],
        [/backdrop\s+blur/g, 'backdrop-blur'],
        [/object\s+cover/g, 'object-cover'],
        [/object\s+contain/g, 'object-contain'],
        [/object\s+top/g, 'object-top'],
        [/font\s+display/g, 'font-display'],
        [/font\s+bold/g, 'font-bold'],
        [/font\s+semibold/g, 'font-semibold'],
        [/font\s+medium/g, 'font-medium'],
        [/font\s+mono/g, 'font-mono'],
        [/tracking\s+tight/g, 'tracking-tight'],
        [/tracking\s+wider/g, 'tracking-wider'],
        [/tracking\s+widest/g, 'tracking-widest'],
        [/leading\s+relaxed/g, 'leading-relaxed'],
        [/leading\s+tight/g, 'leading-tight'],
        [/leading\s+\[/g, 'leading-['],
        [/transition\s+colors/g, 'transition-colors'],
        [/transition\s+all/g, 'transition-all'],
        [/transition\s+transform/g, 'transition-transform'],
        [/duration\s+(\d+)/g, 'duration-$1'],
        [/shadow\s+lg/g, 'shadow-lg'],
        [/shadow\s+2xl/g, 'shadow-2xl'],
        [/shadow\s+black/g, 'shadow-black'],
        [/shadow\s+primary/g, 'shadow-primary'],
        [/line\s+clamp/g, 'line-clamp'],
        [/list\s+none/g, 'list-none'],
        [/shrink\s+0/g, 'shrink-0'],
        [/flex\s+wrap/g, 'flex-wrap'],
        [/flex\s+1/g, 'flex-1'],
        [/flex\s+shrink/g, 'flex-shrink'],
        [/grow\s+0/g, 'grow-0'],
        [/border\s+collapse/g, 'border-collapse'],
        [/border\s+t/g, 'border-t'],
        [/border\s+b/g, 'border-b'],
        [/border\s+l/g, 'border-l'],
        [/border\s+r/g, 'border-r'],
        [/border\s+dashed/g, 'border-dashed'],
        [/border\s+border/g, 'border border'],
        [/inset\s+0/g, 'inset-0'],
        [/inset\s+x/g, 'inset-x'],
        [/page\s+glow/g, 'page-glow'],
        [/glass\s+card/g, 'glass-card'],
        [/gradient\s+border/g, 'gradient-border'],
        [/clip\s+text/g, 'clip-text'],
        [/bg\s+clip/g, 'bg-clip'],
        [/mask\s+image/g, 'mask-image'],
        [/linear\s+gradient/g, 'linear-gradient'],
        [/radial\s+gradient/g, 'radial-gradient'],
        [/bg\s+gradient/g, 'bg-gradient'],
        [/gradient\s+to/g, 'gradient-to'],
        [/w\s+full/g, 'w-full'],
        [/h\s+full/g, 'h-full'],
        [/w\s+px/g, 'w-px'],
        [/h\s+px/g, 'h-px'],
        [/left\s+1\/2/g, 'left-1/2'],
        [/top\s+1\/2/g, 'top-1/2'],
        [/top\s+1\/4/g, 'top-1/4'],
        [/bottom\s+0/g, 'bottom-0'],
        [/right\s+0/g, 'right-0'],
        [/left\s+0/g, 'left-0'],
        [/top\s+0/g, 'top-0'],
        [/z\s+10/g, 'z-10'],
        [/z\s+50/g, 'z-50'],
        [/z\s+0/g, 'z-0'],
        [/blur\s+\[/g, 'blur-['],
        [/bg\s+\[/g, 'bg-['],
        [/text\s+\[/g, 'text-['],
        [/border\s+white/g, 'border-white'],
        [/border\s+zinc/g, 'border-zinc'],
        [/border\s+primary/g, 'border-primary'],
        [/border\s+emerald/g, 'border-emerald'],
        [/border\s+indigo/g, 'border-indigo'],
        [/bg\s+zinc/g, 'bg-zinc'],
        [/bg\s+primary/g, 'bg-primary'],
        [/bg\s+white/g, 'bg-white'],
        [/bg\s+black/g, 'bg-black'],
        [/bg\s+indigo/g, 'bg-indigo'],
        [/bg\s+emerald/g, 'bg-emerald'],
        [/text\s+zinc/g, 'text-zinc'],
        [/text\s+primary/g, 'text-primary'],
        [/text\s+white/g, 'text-white'],
        [/text\s+black/g, 'text-black'],
        [/text\s+emerald/g, 'text-emerald'],
        [/text\s+transparent/g, 'text-transparent'],
        [/text\s+xs/g, 'text-xs'],
        [/text\s+sm/g, 'text-sm'],
        [/text\s+lg/g, 'text-lg'],
        [/text\s+xl/g, 'text-xl'],
        [/text\s+2xl/g, 'text-2xl'],
        [/text\s+3xl/g, 'text-3xl'],
        [/text\s+4xl/g, 'text-4xl'],
        [/text\s+5xl/g, 'text-5xl'],
        [/text\s+6xl/g, 'text-6xl'],
        [/px\s+(\d)/g, 'px-$1'],
        [/py\s+(\d)/g, 'py-$1'],
        [/pt\s+(\d)/g, 'pt-$1'],
        [/pb\s+(\d)/g, 'pb-$1'],
        [/pl\s+(\d)/g, 'pl-$1'],
        [/pr\s+(\d)/g, 'pr-$1'],
        [/mt\s+(\d)/g, 'mt-$1'],
        [/mb\s+(\d)/g, 'mb-$1'],
        [/ml\s+(\d)/g, 'ml-$1'],
        [/mr\s+(\d)/g, 'mr-$1'],
        [/my\s+(\d)/g, 'my-$1'],
        [/mx\s+(\d)/g, 'mx-$1'],
        [/gap\s+(\d)/g, 'gap-$1'],
        [/w\s+(\d)/g, 'w-$1'],
        [/h\s+(\d)/g, 'h-$1'],
        [/p\s+(\d)/g, 'p-$1'],
        [/sm:px\s+(\d)/g, 'sm:px-$1'],
        [/sm:py\s+(\d)/g, 'sm:py-$1'],
        [/sm:pt\s+(\d)/g, 'sm:pt-$1'],
        [/sm:pb\s+(\d)/g, 'sm:pb-$1'],
        [/sm:mb\s+(\d)/g, 'sm:mb-$1'],
        [/sm:mt\s+(\d)/g, 'sm:mt-$1'],
        [/sm:gap\s+(\d)/g, 'sm:gap-$1'],
        [/sm:text\s+(\d)/g, 'sm:text-$1'],
        [/sm:flex/g, 'sm:flex'],
        [/sm:block/g, 'sm:block'],
        [/sm:hidden/g, 'sm:hidden'],
        [/md:grid/g, 'md:grid'],
        [/md:cols/g, 'md:cols'],
        [/md:col\s+span/g, 'md:col-span'],
        [/md:flex/g, 'md:flex'],
        [/md:text/g, 'md:text'],
        [/md:pt\s+(\d)/g, 'md:pt-$1'],
        [/md:pb\s+(\d)/g, 'md:pb-$1'],
        [/md:px\s+(\d)/g, 'md:px-$1'],
        [/lg:grid/g, 'lg:grid'],
        [/lg:cols/g, 'lg:cols'],
        [/lg:col\s+span/g, 'lg:col-span'],
        [/lg:gap/g, 'lg:gap'],
        [/lg:px/g, 'lg:px'],
        [/lg:py/g, 'lg:py'],
        [/lg:mt/g, 'lg:mt'],
        [/lg:block/g, 'lg:block'],
        [/lg:hidden/g, 'lg:hidden'],
        [/lg:sticky/g, 'lg:sticky'],
        [/lg:top/g, 'lg:top'],
        [/xl:text/g, 'xl:text'],
        [/2xl:text/g, '2xl:text'],
    ];

    for (let i = 0; i < 5; i++) {
        for (const [re, rep] of rules) {
            s = s.replace(re, rep);
        }
        s = s.replace(/\b(zinc|primary|indigo|sky|emerald|white|black)\s+(\d+(?:\/\d+)?)/g, '$1-$2');
        s = s.replace(/\b(from|via|to)\s+([a-z]+)\s+(\d+)/g, '$1-$2-$3');
        s = s.replace(/:(\s*)([a-z]+)\s+(\d+)/g, ':$2-$3');
        s = s.replace(/\b([a-z]+)\s+(\d+(?:\.\d+)?(?:\/\d+)?(?:xl)?)\b/g, (m, a, b) => {
            if (['grid', 'flex', 'max', 'min', 'gap', 'space'].includes(a)) return m;
            return `${a}-${b}`;
        });
    }

    return s.replace(/\s{2,}/g, ' ').trim();
}

function fixFile(file) {
    let content = fs.readFileSync(file, 'utf8');
    const next = content.replace(/(\bclass(?:Name)?=)"([^"]*)"/g, (match, attr, val) => {
        return `${attr}"${fixClassValue(val)}"`;
    });
    if (next !== content) {
        fs.writeFileSync(file, next);
        console.log('fixed', path.relative(process.cwd(), file));
    }
}

import { globSync } from 'node:fs';
// walk components
const files = [];
function walk(dir) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
        const p = path.join(dir, e.name);
        if (e.isDirectory()) walk(p);
        else if (/\.(tsx|astro)$/.test(e.name)) files.push(p);
    }
}
walk(path.join('src', 'components'));
for (const f of files) fixFile(f);
