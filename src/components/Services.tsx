import React from 'react';
import { Bot, Globe, Cloud, Link2, ArrowUpRight } from 'lucide-react';

const services = [
  {
    icon: <Bot size={24} />,
    title: 'AI Automation Systems',
    description: 'Agents, chatbots, lead qualification, support triage, and workflow automations connected to your real tools.',
    href: '/services/ai-automation-systems',
  },
  {
    icon: <Globe size={24} />,
    title: 'Web App & SaaS Development',
    description: 'Production ready apps, dashboards, portals, and MVPs with auth, payments, APIs, and scalable architecture.',
    href: '/services/web-app-saas-development',
  },
  {
    icon: <Link2 size={24} />,
    title: 'NetSuite & ERP Automation',
    description: 'Integrations, SuiteScript workflows, and middleware between NetSuite, Shopify, CRMs, and warehouses.',
    href: '/services/netsuite-erp-automation',
  },
  {
    icon: <Cloud size={24} />,
    title: 'AWS & DevOps',
    description: 'Cloud infrastructure, Docker, CI/CD, monitoring, backups, and backend systems built to stay online.',
    href: '/services/aws-devops',
  },
];

export const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 md:flex md:items-end md:justify-between gap-8">
          <div className="max-w-2xl">
            <div className="text-primary-500 font-bold tracking-widest text-sm mb-4 uppercase">What We Build</div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Systems that connect your business — not another disconnected tool
            </h2>
            <p className="text-lg text-zinc-400">
              From AI workflows to ERP integrations and cloud infrastructure, we design and ship the technical backbone operations teams actually rely on.
            </p>
          </div>
          <a
            href="/services"
            className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-primary-400 hover:text-primary-300 transition-colors mt-6 md:mt-0 shrink-0"
          >
            View all services
            <ArrowUpRight size={16} />
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service) => (
            <a
              key={service.href}
              href={service.href}
              className="group p-8 rounded-2xl bg-zinc-900/30 border border-white/5 hover:border-primary-500/30 hover:bg-zinc-900/50 transition-all duration-300 relative overflow-hidden block"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/5 blur-[50px] rounded-full group-hover:bg-primary-500/10 transition-colors" />
              <div className="w-12 h-12 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-primary-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors">
                {service.title}
              </h3>
              <p className="text-zinc-400 leading-relaxed mb-4">{service.description}</p>
              <span className="text-sm font-medium text-primary-400 inline-flex items-center gap-1">
                Learn more <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </a>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <a href="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-primary-400">
            View all services <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};
