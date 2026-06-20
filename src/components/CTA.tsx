import React from 'react';
import { ArrowRight } from 'lucide-react';
import { BOOKING_URL } from '../data/siteConfig';

export const CTA: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-primary-600/10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-500/20 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <p className="text-primary-400 text-sm font-bold uppercase tracking-widest mb-4">Start Here</p>
        <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
          Turn one manual workflow into a{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400">
            working system in 14 days
          </span>
        </h2>
        <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto">
          Book a free call to map your highest impact automation — or start with our AI Systems Sprint and ship something your team can use immediately.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-full bg-white text-black font-bold text-lg hover:bg-zinc-100 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
          >
            Book a Free Call
            <ArrowRight size={20} />
          </a>
          <a
            href="/ai-systems-sprint"
            className="px-8 py-4 rounded-full border border-zinc-700 text-white font-semibold hover:bg-zinc-900/80 transition-all flex items-center justify-center"
          >
            See the Sprint Offer
          </a>
        </div>
        <p className="mt-6 text-sm text-zinc-500">
          No obligation. Practical conversation about your ops, stack, and next step.
        </p>
      </div>
    </section>
  );
};
