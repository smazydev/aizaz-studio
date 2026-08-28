type Theme = 'light' | 'dark';

const KEY = 'aizaz-theme';

function currentTheme(): Theme {
  return document.documentElement.classList.contains('theme-dark') ? 'dark' : 'light';
}

export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.remove('theme-light', 'theme-dark');
  root.classList.add(`theme-${theme}`);
  root.setAttribute('data-theme', theme);
  root.style.colorScheme = theme;
  document.body.classList.toggle('theme-light', theme === 'light');
  document.body.classList.toggle('theme-dark', theme === 'dark');
  try {
    localStorage.setItem(KEY, theme);
  } catch {
    /* private mode */
  }
  document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]').forEach((btn) => {
    btn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    btn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
  });
}

export function toggleTheme() {
  applyTheme(currentTheme() === 'dark' ? 'light' : 'dark');
}

export function bindThemeToggle() {
  const win = window as Window & { __aizazToggleTheme?: () => void; __aizazApplyTheme?: (theme: Theme) => void };
  win.__aizazToggleTheme = toggleTheme;
  win.__aizazApplyTheme = applyTheme;

  applyTheme(currentTheme());

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
