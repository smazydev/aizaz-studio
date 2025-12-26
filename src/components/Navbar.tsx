import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${isScrolled
        ? 'bg-black/80 backdrop-blur-md border-white/10 py-4'
        : 'bg-transparent border-transparent py-6'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-primary-400 to-indigo-600 flex items-center justify-center font-bold text-white font-display text-xl">
              A
            </div>
            <span className="text-xl font-display font-bold tracking-tight">
              Aizaz Studio
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <a href="/services" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Services</a>
            <a href="/engineering-transformation" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">How it Works</a>
            <a href="/case-studies" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Case Studies</a>
            <a href="/about" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">About</a>
            <a
              href="https://calendar.app.google/1EzzMhn1gjvsJy1XA"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-white text-black text-sm font-semibold hover:bg-zinc-200 transition-colors"
            >
              Book a Call
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white p-2"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-zinc-950 border-b border-zinc-800 p-4 flex flex-col gap-4 shadow-2xl">
          <a href="/services" className="text-base font-medium text-zinc-300" onClick={() => setIsMobileMenuOpen(false)}>Services</a>
          <a href="/how-it-works" className="text-base font-medium text-zinc-300" onClick={() => setIsMobileMenuOpen(false)}>How it Works</a>
          <a href="/case-studies" className="text-base font-medium text-zinc-300" onClick={() => setIsMobileMenuOpen(false)}>Case Studies</a>
          <a href="/about" className="text-base font-medium text-zinc-300" onClick={() => setIsMobileMenuOpen(false)}>About</a>
          <a
            href="https://calendar.app.google/1EzzMhn1gjvsJy1XA"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 rounded-lg bg-white text-black font-semibold text-center block"
          >
            Book a Call
          </a>
        </div>
      )}
    </nav>
  );
};