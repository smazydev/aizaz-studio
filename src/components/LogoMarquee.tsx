import React from 'react';
import type { HomepageMarqueeItem } from '../lib/sanity/homepage';
import { clientLogos } from '../data/siteContent';

interface Props {
  label?: string;
  items?: HomepageMarqueeItem[];
}

function MarqueeName({ item, hidden }: { item: HomepageMarqueeItem; hidden?: boolean }) {
  const className =
    'mx-8 md:mx-12 text-lg md:text-xl font-display font-semibold text-zinc-600 whitespace-nowrap shrink-0';

  if (item.href) {
    const external = /^https?:\/\//i.test(item.href);
    return (
      <a
        href={item.href}
        className={`${className} hover:text-zinc-400 transition-colors`}
        aria-hidden={hidden || undefined}
        tabIndex={hidden ? -1 : undefined}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {item.name}
      </a>
    );
  }

  return (
    <span className={className} aria-hidden={hidden || undefined}>
      {item.name}
    </span>
  );
}

export const LogoMarquee: React.FC<Props> = ({ label, items }) => {
  const source =
    items && items.length > 0 ? items : clientLogos.map((name) => ({ name }));
  const heading = label?.trim() || 'Trusted by product teams & operators';

  return (
    <section className="py-8 overflow-hidden border-b border-white/5">
      <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-zinc-600 mb-6 animate-fade-in">
        {heading}
      </p>
      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
        <div className="flex w-max animate-marquee">
          {source.map((item, index) => (
            <MarqueeName key={`a-${item.name}-${index}`} item={item} />
          ))}
          {/* Animation-only duplicate — same CMS source, not duplicate documents */}
          {source.map((item, index) => (
            <MarqueeName key={`b-${item.name}-${index}`} item={item} hidden />
          ))}
        </div>
      </div>
    </section>
  );
};
