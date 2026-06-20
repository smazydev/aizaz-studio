import React from 'react';
import { siteStats } from '../data/siteContent';

export const StatsBar: React.FC = () => {
  return (
    <section className="relative border-y border-white/5 bg-zinc-950/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {siteStats.map((stat) => (
            <div key={stat.label} className="text-center lg:text-left">
              <div className="text-3xl md:text-4xl font-display font-bold text-white mb-1">
                {stat.value}
                <span className="text-primary-400">{stat.suffix}</span>
              </div>
              <div className="text-sm text-zinc-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
