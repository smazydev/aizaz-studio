import React from 'react';
import { ArrowRight } from 'lucide-react';

export const CTA: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-primary-600/10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-500/20 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
          Build Your Dream Team <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400">
            In Days, Not Months
          </span>
        </h2>
        <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto">
          Stop wasting time on recruitment. Start building your product with elite engineers who care about your success.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://calendar.app.google/1EzzMhn1gjvsJy1XA"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-full bg-white text-black font-bold text-lg hover:bg-zinc-100 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
          >
            Schedule a Free Consultation
            <ArrowRight size={20} />
          </a>
        </div>
        <p className="mt-6 text-sm text-zinc-500">
          No obligation. 100% free technical consultation.
        </p>
      </div>
    </section>
  );
};