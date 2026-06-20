import React from 'react';
import { Star, Quote } from 'lucide-react';
import { clientReviews } from '../data/siteContent';

const Stars: React.FC<{ count: number }> = ({ count }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: count }).map((_, i) => (
      <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
    ))}
  </div>
);

export const ClientReviews: React.FC = () => {
  const avgRating = (
    clientReviews.reduce((sum, r) => sum + r.rating, 0) / clientReviews.length
  ).toFixed(1);

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-500/[0.03] to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
          <div>
            <div className="text-primary-500 font-bold tracking-widest text-sm mb-4 uppercase">Client Results</div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Teams ship faster with us in the loop
            </h2>
            <p className="text-zinc-400 max-w-xl">
              Named founders. Specific outcomes. No anonymous &ldquo;great agency&rdquo; quotes.
            </p>
          </div>
          <div className="flex items-center gap-4 px-6 py-4 rounded-2xl glass-card shrink-0">
            <div className="text-3xl font-display font-bold text-white">{avgRating}</div>
            <div>
              <Stars count={5} />
              <div className="text-xs text-zinc-500 mt-1">Avg. client satisfaction</div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {clientReviews.map((review) => (
            <article
              key={review.author + review.company}
              className="group p-8 rounded-2xl glass-card hover:border-primary-500/20 transition-all duration-300 flex flex-col h-full"
            >
              <div className="flex items-center justify-between mb-6">
                <Stars count={review.rating} />
                <Quote size={20} className="text-zinc-700 group-hover:text-primary-500/40 transition-colors" />
              </div>
              <p className="text-zinc-300 leading-relaxed mb-6 grow">&ldquo;{review.quote}&rdquo;</p>
              <div className="pt-6 border-t border-white/5">
                <div className="inline-flex px-2.5 py-1 rounded-md bg-primary-500/10 text-primary-300 text-xs font-medium mb-4">
                  {review.highlight}
                </div>
                <div className="font-semibold text-white text-sm">{review.author}</div>
                <div className="text-xs text-zinc-500">
                  {review.role}, {review.company} · {review.region}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
