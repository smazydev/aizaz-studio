import React from 'react';
import { Search, User, BarChart3, Workflow, ShieldCheck } from 'lucide-react';

const BenefitCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  isFree?: boolean;
}> = ({ icon, title, description, isFree }) => (
  <div className="bg-zinc-900 rounded-xl p-8 flex flex-col items-start h-full relative group hover:-translate-y-1 transition-transform duration-300 border border-white/5">
    {isFree && (
      <div className="absolute top-4 right-4 bg-primary-500 text-white text-xs font-bold px-2 py-1 rounded uppercase">
        Free!
      </div>
    )}
    <div className="mb-6 text-primary-500">
      {icon}
    </div>
    <h3 className="text-lg font-bold text-white mb-4 leading-tight">
      {title}
    </h3>
    <p className="text-sm text-zinc-400 leading-relaxed">
      {description}
    </p>
  </div>
);

export const WhyUs: React.FC = () => {
  return (
    <section className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-7">
            <div className="text-primary-500 font-bold tracking-widest text-sm mb-4 uppercase">Why Partner With Aizaz Studio</div>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white leading-tight">
              A service model built for founders who want clarity, speed, and reliability
            </h2>
          </div>
          <div className="lg:col-span-5 flex items-end">
            <p className="text-zinc-400 text-lg leading-relaxed">
              Founders don't just need "IT services." You need momentum, predictability, and expert execution that removes drag from your product's journey. That's exactly what this stack delivers.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <BenefitCard
            icon={<Search size={32} />}
            title="Proactive Project Oversight"
            description="A dedicated PM keeps delivery predictable, milestones visible, and execution smooth."
          />
          <BenefitCard
            icon={<User size={32} />}
            title="Senior Engineering Guidance"
            description="Monthly expert consulting for architecture decisions, reviews, and strategic technical direction."
          />
          <BenefitCard
            icon={<BarChart3 size={32} />}
            title="Flexible Scaling"
            description="Scale your team up or down as you grow—engineers, PMs, QA, all on-demand. It's everything you need to move faster with less risk."
          />
          <BenefitCard
            icon={<Workflow size={32} />}
            title="Guaranteed Continuity"
            description="We maintain structured documentation, playbooks, and onboarding so the work never misses a beat during transitions."
          />
          <BenefitCard
            icon={<ShieldCheck size={32} />}
            title="End-to-End QA Assurance"
            description="Every feature is validated thoroughly so you ship stable releases—consistently."
            isFree
          />
        </div>
      </div>
    </section>
  );
};