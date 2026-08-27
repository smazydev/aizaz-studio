import React from 'react';
import { clientLogos } from '../data/siteContent';

export const LogoMarquee: React.FC = () => {
  const track = [...clientLogos, ...clientLogos];

  return (
    <section className="py-8 overflow-hidden border-b border-white/5">
      <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-zinc-600 mb-6 animate-fade-in">
        Trusted by product teams & operators
      </p>
      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
        <div className="flex w-max animate-marquee">
          {track.map((logo, index) => (
            <span
              key={`${logo}-${index}`}
              className="mx-8 md:mx-12 text-lg md:text-xl font-display font-semibold text-zinc-600 whitespace-nowrap shrink-0"
            >
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
