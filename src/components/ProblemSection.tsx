import React from 'react';
import { ArrowRight } from 'lucide-react';
import { problemPoints } from '../data/siteContent';

export const ProblemSection: React.FC = () => {
  return (
    <section className="py-24 bg-zinc-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="text-primary-500 font-bold tracking-widest text-sm mb-4 uppercase">The real problem</div>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
              You do not need more tools.
              <span className="text-gradient block mt-2">You need connected systems.</span>
            </h2>
            <p className="text-lg text-zinc-400 mb-8 leading-relaxed">
              Most businesses are not short on software. They are short on architecture, workflows that run reliably across CRM, ERP, cloud, and internal teams without someone babysitting spreadsheets all day.
            </p>
            <a
              href="/ai-systems-sprint"
              className="inline-flex items-center gap-2 text-primary-400 font-semibold hover:text-primary-300 transition-colors"
            >
              See the 14 day sprint <ArrowRight size={16} />
            </a>
          </div>

          <div className="space-y-4">
            {problemPoints.map((point, index) => (
              <div
                key={point.title}
                className="p-6 rounded-2xl glass-card flex gap-5 hover:border-white/10 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center text-primary-400 font-display font-bold shrink-0">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-bold text-white mb-2">{point.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{point.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
