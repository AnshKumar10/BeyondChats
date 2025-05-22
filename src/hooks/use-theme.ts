
import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark' | 'system';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('light');
  
  const setThemeWithPreference = (theme: Theme) => {
    localStorage.setItem('ui-theme', theme);
    setTheme(theme);
  };
  
  useEffect(() => {
    const storedTheme = localStorage.getItem('ui-theme') as Theme || 'light';
    setTheme(storedTheme);
  }, []);
  
  return { theme, setTheme: setThemeWithPreference };
}
