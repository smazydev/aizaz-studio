import React from 'react';
import { Layers, Rocket, Shield, Users } from 'lucide-react';

const BenefitCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => (
  <div className="glass-card rounded-2xl p-8 flex flex-col items-start h-full group-hover:border-primary-500/20 transition-all duration-300">
    <div className="mb-6 text-primary-500">{icon}</div>
    <h3 className="text-lg font-bold text-white mb-3 leading-tight">{title}</h3>
    <p className="text-sm text-zinc-400 leading-relaxed">{description}</p>
  </div>
);

export const WhyUs: React.FC = () => {
  return (
    <section className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-7">
            <div className="text-primary-500 font-bold tracking-widest text-sm mb-4 uppercase">Why Aizaz.studio</div>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white leading-tight">
              One studio for architecture, engineering, automation, and cloud
            </h2>
          </div>
          <div className="lg:col-span-5 flex items-end">
            <p className="text-zinc-400 text-lg leading-relaxed">
              Most agencies deliver isolated pieces — a website here, a script there, cloud handled by someone else. We bring the layers together so your systems actually work in production.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <BenefitCard
            icon={<Layers size={28} />}
            title="Architecture first thinking"
            description="We design how data, workflows, and tools connect before writing code — so you do not rebuild in six months."
          />
          <BenefitCard
            icon={<Rocket size={28} />}
            title="Ship working systems fast"
            description="Our AI Systems Sprint turns one manual workflow into a deployed automation in 14 days."
          />
          <BenefitCard
            icon={<Shield size={28} />}
            title="Production grade delivery"
            description="Auth, monitoring, backups, and deployment pipelines are part of the build — not afterthoughts."
          />
          <BenefitCard
            icon={<Users size={28} />}
            title="Built for real operations"
            description="We work with ops heavy businesses — ecommerce, clinics, trading teams, NetSuite users, and SaaS founders."
          />
        </div>
      </div>
    </section>
  );
};
