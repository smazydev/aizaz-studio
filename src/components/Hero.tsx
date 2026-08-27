import React from 'react';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { trustBadges } from '../data/siteContent';
import { BOOKING_URL } from '../data/siteConfig';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      <div className="absolute inset-0 page-glow pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_80%)] pointer-events-none" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/60 border border-zinc-800 text-xs font-medium text-primary-400 mb-8 backdrop-blur-sm">
              <Sparkles size={12} className="text-primary-400" />
              AI, cloud & automation engineering studio
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[3.4rem] font-display font-bold tracking-tight text-white mb-6 leading-[1.06]">
              Replace manual chaos with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-200 via-primary-300 to-indigo-400">
                systems that scale
              </span>
            </h1>

            <p className="text-lg text-zinc-400 mb-8 max-w-xl leading-relaxed">
              We build AI agents, web apps, NetSuite integrations, and AWS infrastructure for startups and operations heavy businesses, from first workflow automation to full production platforms.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-zinc-200 transition-all hover:scale-[1.02] active:scale-95 group"
              >
                Book a Free Strategy Call
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="/case-studies"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-zinc-900/80 border border-zinc-700 text-white font-medium hover:bg-zinc-800 transition-all"
              >
                View Case Studies
              </a>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {trustBadges.map((badge) => (
                <span key={badge} className="px-3 py-1 rounded-full bg-zinc-900/50 border border-white/5 text-xs text-zinc-400">
                  {badge}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-zinc-500">
              <span className="inline-flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary-500" /> 14 day sprint option</span>
              <span className="inline-flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary-500" /> Senior engineers only</span>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="gradient-border rounded-3xl p-[1px]">
              <div className="rounded-3xl bg-zinc-950/90 border border-white/5 p-6 backdrop-blur-xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="text-xs font-bold uppercase tracking-widest text-zinc-500">Live workflow</div>
                  <div className="flex items-center gap-2 text-xs text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Running
                  </div>
                </div>

                <div className="space-y-3 font-mono text-sm">
                  {[
                    'Lead captured → AI qualified',
                    'CRM updated → rep notified',
                    'Follow up queued → ops dashboard',
                    'NetSuite sync → retry on fail',
                  ].map((step, i) => (
                    <div key={step} className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900/80 border border-white/5">
                      <span className="w-6 h-6 rounded-lg bg-primary-500/15 text-primary-400 text-xs flex items-center justify-center shrink-0">{i + 1}</span>
                      <span className="text-zinc-300">{step}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-white/5 grid grid-cols-3 gap-3 text-center">
                  <div>
                    <div className="text-lg font-display font-bold text-white">14d</div>
                    <div className="text-[10px] uppercase tracking-wider text-zinc-500">Sprint</div>
                  </div>
                  <div>
                    <div className="text-lg font-display font-bold text-white">5.0</div>
                    <div className="text-[10px] uppercase tracking-wider text-zinc-500">Client avg.</div>
                  </div>
                  <div>
                    <div className="text-lg font-display font-bold text-white">24/7</div>
                    <div className="text-[10px] uppercase tracking-wider text-zinc-500">Monitoring</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
