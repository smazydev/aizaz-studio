import React, { useEffect, useRef, useState } from 'react';
import { Map, Layers, Code2, Cloud, Rocket, CheckCircle2 } from 'lucide-react';

const steps = [
  {
    icon: Map,
    title: 'Workflow discovery',
    subtitle: 'Map the manual process & your stack',
    description:
      'We audit CRM, ERP, email, spreadsheets, and internal tools to find the workflow costing the most time, and define success in measurable terms.',
    details: [
      'Stack & integration inventory',
      'Manual step mapping',
      'Sprint or project scope definition',
      'Success metrics agreed upfront',
    ],
  },
  {
    icon: Layers,
    title: 'Architecture & scope',
    subtitle: 'Design the system before writing code',
    description:
      'Data models, API connections, AI decision points, auth, and failure handling are planned so the build survives production, not just demos.',
    details: [
      'Integration & data flow design',
      'Security and access model',
      'AI / automation logic boundaries',
      'Timeline with weekly milestones',
    ],
  },
  {
    icon: Code2,
    title: 'Build & integrate',
    subtitle: 'Ship working software connected to your tools',
    description:
      'Senior engineers build the automation, dashboard, SaaS feature, or ERP middleware, integrated with NetSuite, Shopify, AWS, HubSpot, and your existing stack.',
    details: [
      'Daily progress with async updates',
      'Staging environment for review',
      'Integration testing with real data',
      'First production ready increment',
    ],
  },
  {
    icon: Cloud,
    title: 'Deploy & monitor',
    subtitle: 'CI/CD, alerts, and reliability built in',
    description:
      'We deploy to AWS (or your cloud), set up monitoring and error alerts, and make sure failures are visible, not silent.',
    details: [
      'Automated deployment pipeline',
      'Logging and error alerting',
      'Backup and rollback planning',
      'Performance baseline checks',
    ],
  },
  {
    icon: Rocket,
    title: 'Handoff & next scale',
    subtitle: 'Documentation, training, extension path',
    description:
      'Your team gets docs, walkthroughs, and a system they can run day one. Many clients roll straight into the next workflow or platform phase.',
    details: [
      'Runbooks and architecture notes',
      'Team walkthrough session',
      'Optional ongoing support',
      'Roadmap for next automation',
    ],
  },
];

export const TransformationTimeline: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % steps.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            if (!Number.isNaN(index)) setActiveIndex(index);
          }
        });
      },
      { rootMargin: '-10% 0px -55% 0px', threshold: 0.25 },
    );

    const nodes = containerRef.current?.querySelectorAll('[data-index]');
    nodes?.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, []);

  const active = steps[activeIndex];
  const ActiveIcon = active.icon;

  return (
    <div ref={containerRef} className="grid lg:grid-cols-12 gap-10 lg:gap-14">
      <div className="lg:col-span-5 lg:sticky lg:top-28 h-fit">
        <div className="p-8 rounded-3xl glass-card gradient-border transition-all duration-500">
          <div className="w-14 h-14 rounded-2xl bg-primary-500/15 border border-primary-500/25 flex items-center justify-center text-primary-400 mb-6 transition-transform duration-500">
            <ActiveIcon size={28} />
          </div>
          <div className="text-primary-400 font-display font-bold text-sm mb-2">
            Step {String(activeIndex + 1).padStart(2, '0')}
          </div>
          <h3 className="text-2xl font-display font-bold text-white mb-2">{active.title}</h3>
          <p className="text-primary-300/80 text-sm mb-4">{active.subtitle}</p>
          <p className="text-zinc-400 leading-relaxed mb-6">{active.description}</p>
          <ul className="space-y-2">
            {active.details.map((detail) => (
              <li key={detail} className="flex items-start gap-2 text-sm text-zinc-400">
                <CheckCircle2 size={16} className="text-primary-500 shrink-0 mt-0.5" />
                {detail}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="lg:col-span-7 space-y-4">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = activeIndex === index;

          return (
            <div
              key={step.title}
              data-index={index}
              className={`rounded-2xl border p-5 sm:p-6 transition-all duration-500 ${
 isActive
 ? 'glass-card border-primary-500/30'
 : 'bg-zinc-950/30 border-white/5 opacity-70'
 }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
 isActive ? 'bg-primary-500 text-white' : 'bg-zinc-900 text-zinc-500'
 }`}
                >
                  <Icon size={20} />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-0.5">
                    Step {String(index + 1).padStart(2, '0')}
                  </div>
                  <div className="font-display font-bold text-white">{step.title}</div>
                  <div className="text-sm text-zinc-500">{step.subtitle}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
