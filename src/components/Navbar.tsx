import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/services', label: 'Services' },
  { href: '/ai-systems-sprint', label: 'AI Systems Sprint' },
  { href: '/case-studies', label: 'Case Studies' },
  { href: '/process', label: 'Process' },
  { href: '/blog', label: 'Blog' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled
          ? 'bg-zinc-950 border-white/10 py-3 shadow-lg shadow-black/50'
          : 'bg-zinc-950/95 backdrop-blur-md border-white/5 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <img src="/aizaz-logo-white.png" alt="Aizaz Studio" className="w-8 h-8 object-contain" />
            <span className="text-xl font-display font-bold tracking-tight">
              Aizaz<span className="text-zinc-500">.studio</span>
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                {link.label}
              </a>
            ))}
            <a
              href="/book-a-call"
              className="px-5 py-2.5 rounded-full bg-white text-black text-sm font-semibold hover:bg-zinc-200 transition-colors"
            >
              Book a Call
            </a>
          </div>

          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white p-2"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-zinc-950 border-b border-zinc-800 p-4 flex flex-col gap-4 shadow-2xl">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-base font-medium text-zinc-300" onClick={() => setIsMobileMenuOpen(false)}>
              {link.label}
            </a>
          ))}
          <a
            href="/book-a-call"
            className="w-full py-3 rounded-lg bg-white text-black font-semibold text-center block"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Book a Call
          </a>
        </div>
      )}
    </nav>
  );
};
