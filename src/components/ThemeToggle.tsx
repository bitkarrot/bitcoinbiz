import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from './ThemeContext';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="rounded-md p-2 bg-secondary/50 hover:bg-secondary transition-colors"
      aria-label={`Switch to ${theme === 'light' ? 'system' : theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Current theme: ${theme}. Click to switch.`}
    >
      {theme === 'light' ? (
        <Moon className="h-5 w-5" />
      ) : theme === 'dark' ? (
        <Sun className="h-5 w-5 text-yellow-300" />
      ) : (
        <Monitor className="h-5 w-5" />
      )}
    </button>
  );
}
