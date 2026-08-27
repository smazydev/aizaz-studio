import React from 'react';
import { Linkedin, Github, Twitter, Mail, PhoneCall } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-zinc-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-10 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded bg-gradient-to-br from-primary-400 to-indigo-600 flex items-center justify-center font-bold text-white text-xs font-display">
                A
              </div>
              <span className="text-lg font-display font-bold text-white">Aizaz Studio</span>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed mb-6">
              AI, cloud, and automation engineering for growing businesses. Senior execution for systems that ship, not rented developers.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-zinc-500 hover:text-white transition-colors"><Linkedin size={20} /></a>
              <a href="#" className="text-zinc-500 hover:text-white transition-colors"><Github size={20} /></a>
              <a href="#" className="text-zinc-500 hover:text-white transition-colors"><Twitter size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li><a href="/services/ai-automation-systems" className="hover:text-primary-400 transition-colors">AI Automation</a></li>
              <li><a href="/services/ai-agent-development" className="hover:text-primary-400 transition-colors">AI Agent Development</a></li>
              <li><a href="/services/web-app-saas-development" className="hover:text-primary-400 transition-colors">SaaS Development</a></li>
              <li><a href="/services/aws-devops" className="hover:text-primary-400 transition-colors">AWS & DevOps</a></li>
              <li><a href="/services/netsuite-integration" className="hover:text-primary-400 transition-colors">NetSuite Integration</a></li>
              <li><a href="/services/project-rescue" className="hover:text-primary-400 transition-colors">Project Rescue</a></li>
              <li><a href="/services/technical-audit" className="hover:text-primary-400 transition-colors">Technical Audit</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Industries</h4>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li><a href="/for/startups" className="hover:text-primary-400 transition-colors">Startups</a></li>
              <li><a href="/for/b2b-saas" className="hover:text-primary-400 transition-colors">B2B SaaS</a></li>
              <li><a href="/for/operations-teams" className="hover:text-primary-400 transition-colors">Operations Teams</a></li>
              <li><a href="/for/healthtech" className="hover:text-primary-400 transition-colors">Healthtech</a></li>
              <li><a href="/for/fintech" className="hover:text-primary-400 transition-colors">Fintech</a></li>
              <li><a href="/for/ecommerce-operations" className="hover:text-primary-400 transition-colors">Ecommerce Operations</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li><a href="/about" className="hover:text-primary-400 transition-colors">About</a></li>
              <li><a href="/portfolio" className="hover:text-primary-400 transition-colors">Portfolio</a></li>
              <li><a href="/case-studies" className="hover:text-primary-400 transition-colors">Case Studies</a></li>
              <li><a href="/reviews" className="hover:text-primary-400 transition-colors">Reviews</a></li>
              <li><a href="/careers" className="hover:text-primary-400 transition-colors">Careers</a></li>
              <li><a href="/blog" className="hover:text-primary-400 transition-colors">Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li><a href="/ai-systems-sprint" className="hover:text-primary-400 transition-colors">AI Systems Sprint</a></li>
              <li><a href="/process" className="hover:text-primary-400 transition-colors">Process</a></li>
              <li><a href="/engagement-models" className="hover:text-primary-400 transition-colors">Engagement Models</a></li>
              <li><a href="/security" className="hover:text-primary-400 transition-colors">Security</a></li>
              <li><a href="/compare" className="hover:text-primary-400 transition-colors">Compare</a></li>
              <li><a href="/book-a-call" className="hover:text-primary-400 transition-colors">Book a Call</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-zinc-600">
            <span className="flex items-center gap-2"><Mail size={14} /> hello@aizaz.studio</span>
            <span className="flex items-center gap-2"><PhoneCall size={14} /> +92 334 2056691</span>
          </div>
          <p className="text-xs text-zinc-600">&copy; {new Date().getFullYear()} Aizaz Studio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
