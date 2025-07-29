import { useEffect, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import { ThemeContext, type Theme } from './ThemeContext';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark'); // Default to dark

  // Helper function to determine if dark mode should be active
  const shouldUseDarkMode = useCallback((currentTheme: Theme): boolean => {
    if (currentTheme === 'dark') return true;
    if (currentTheme === 'light') return false;
    // If theme is 'system', check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }, []);

  // Update the class on the html element when theme changes
  const updateThemeClass = useCallback((currentTheme: Theme) => {
    const root = window.document.documentElement;
    const isDark = shouldUseDarkMode(currentTheme);
    
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [shouldUseDarkMode]);

  // Initialize theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      // Default to dark mode if no preference is saved
      setTheme('dark');
      localStorage.setItem('theme', 'dark');
    }
  }, []);

  // Check for system preference changes
  useEffect(() => {
    if (theme !== 'system') return;
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      updateThemeClass(theme);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, updateThemeClass]);

  // Update theme class when theme changes
  useEffect(() => {
    updateThemeClass(theme);
    localStorage.setItem('theme', theme);
  }, [theme, updateThemeClass]);

  const toggleTheme = () => {
    setTheme(prevTheme => {
      if (prevTheme === 'light') return 'system';
      if (prevTheme === 'dark') return 'light';
      return 'dark';
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// ThemeProvider component
