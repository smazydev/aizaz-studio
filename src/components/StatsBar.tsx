import React from 'react';
import type { HomepageStat } from '../lib/sanity/homepage';
import { siteStats } from '../data/siteContent';

interface Props {
  stats?: HomepageStat[];
}

export const StatsBar: React.FC<Props> = ({ stats }) => {
  const items = stats && stats.length > 0 ? stats : siteStats;

  return (
    <section className="relative border-y border-white/5 bg-zinc-950/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div
          className={`grid gap-8 grid-cols-2 ${
            items.length >= 4 ? 'lg:grid-cols-4' : items.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'
          }`}
        >
          {items.map((stat) => (
            <div key={stat.label} className="text-center lg:text-left">
              <div className="text-3xl md:text-4xl font-display font-bold text-white mb-1">
                {stat.value}
                {stat.suffix ? <span className="text-primary-400">{stat.suffix}</span> : null}
              </div>
              <div className="text-sm text-zinc-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
