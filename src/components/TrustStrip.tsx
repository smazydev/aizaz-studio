import React from 'react';

// Using text placeholders for logos as per instruction to not use external images unless picsum
const logos = [
  "InvestorsGoneWild", "1Archiver", "VamsBiome", "TradingDojo", "EthicalAI"
];

export const TrustStrip: React.FC = () => {
  return (
    <section className="py-10 border-y border-white/5 bg-zinc-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-medium text-zinc-500 mb-8">
          TRUSTED BY FAST-GROWING STARTUPS AND AGENCIES
        </p>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          {logos.map((logo, index) => (
            <div key={index} className="text-xl font-display font-bold text-zinc-400">
              {logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};