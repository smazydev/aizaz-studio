import React from 'react';
import { User, Users, Zap, Code2 } from 'lucide-react';

const ServiceCard: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
}> = ({ title, description, icon }) => (
  <div className="group p-8 rounded-2xl bg-zinc-900/30 border border-white/5 hover:border-primary-500/30 hover:bg-zinc-900/50 transition-all duration-300 relative overflow-hidden">
    <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/5 blur-[50px] rounded-full group-hover:bg-primary-500/10 transition-colors" />
    <div className="w-12 h-12 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-primary-400 mb-6 group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
    <p className="text-zinc-400 leading-relaxed">{description}</p>
  </div>
);

export const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 md:text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            Flexible Engineering Capacity
          </h2>
          <p className="text-lg text-zinc-400">
            Whether you need a single specialist or a full product squad, we plug into your existing workflow instantly.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ServiceCard
            icon={<User size={24} />}
            title="Dedicated Developers"
            description="Senior engineers who work exclusively for you. No context switching, just pure focus on your product."
          />
          <ServiceCard
            icon={<Users size={24} />}
            title="Managed Squads"
            description="Complete cross-functional teams (Devs, QA, PM) ready to tackle complex roadmaps from day one."
          />
          <ServiceCard
            icon={<Zap size={24} />}
            title="Project Rescue"
            description="Rapid deployment of experts to fix technical debt, optimize performance, or meet tight deadlines."
          />
          <ServiceCard
            icon={<Code2 size={24} />}
            title="Long-term Staffing"
            description="Scale your core team sustainably with reliable talent retained for the long haul."
          />
        </div>
      </div>
    </section>
  );
};