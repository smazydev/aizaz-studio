export type Theme = 'light' | 'dark';

/** Canonical storage key. Legacy `theme` is read for migration. */
const KEY = 'aizaz-theme';
const LEGACY_KEY = 'theme';

export function readStoredTheme(): Theme | null {
  try {
    const raw = localStorage.getItem(KEY) ?? localStorage.getItem(LEGACY_KEY);
    if (raw === 'light' || raw === 'dark') return raw;
  } catch {
    /* private mode */
  }
  return null;
}

export function systemTheme(): Theme {
  try {
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  } catch {
    return 'dark';
  }
}

export function resolveTheme(): Theme {
  return readStoredTheme() ?? systemTheme();
}

export function currentTheme(): Theme {
  const attr = document.documentElement.getAttribute('data-theme');
  if (attr === 'light' || attr === 'dark') return attr;
  return document.documentElement.classList.contains('theme-light') ? 'light' : 'dark';
}

export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.remove('theme-light', 'theme-dark');
  root.classList.add(`theme-${theme}`);
  root.setAttribute('data-theme', theme);
  root.style.colorScheme = theme;
  if (document.body) {
    document.body.classList.toggle('theme-light', theme === 'light');
    document.body.classList.toggle('theme-dark', theme === 'dark');
  }
  try {
    localStorage.setItem(KEY, theme);
    localStorage.setItem(LEGACY_KEY, theme);
  } catch {
    /* private mode */
  }
  document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]').forEach((btn) => {
    btn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    btn.setAttribute(
      'aria-label',
      theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme',
    );
  });
}

export function toggleTheme() {
  applyTheme(currentTheme() === 'dark' ? 'light' : 'dark');
}

export function bindThemeToggle() {
  const win = window as Window & {
    __aizazToggleTheme?: () => void;
    __aizazApplyTheme?: (theme: Theme) => void;
  };
  win.__aizazToggleTheme = toggleTheme;
  win.__aizazApplyTheme = applyTheme;

  applyTheme(resolveTheme());

  document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]').forEach((btn) => {
    if (btn.dataset.themeBound === '1') return;
    btn.dataset.themeBound = '1';
    btn.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      toggleTheme();
    });
  });
}
