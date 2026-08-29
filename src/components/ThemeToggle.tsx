import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { applyTheme, currentTheme, type Theme } from '../lib/theme';

export const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    setTheme(currentTheme());
  }, []);

  const toggleTheme = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    setTheme(next);
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="theme-toggle p-2 rounded-full border border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
      aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
      title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
    >
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
};
