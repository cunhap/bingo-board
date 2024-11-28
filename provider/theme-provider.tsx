// providers/theme-provider.tsx
"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';

interface ThemeContextType {
  isDark: boolean;
  isChristmas: boolean;
  toggleDarkMode: () => void;
  toggleChristmas: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);
  const [isChristmas, setIsChristmas] = useState(false);

  useEffect(() => {
    // Load initial theme preferences
    const savedDark = localStorage.getItem('theme-dark') === 'true';
    const savedChristmas = localStorage.getItem('theme-christmas') === 'true';

    if (savedDark) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }

    if (savedChristmas) {
      setIsChristmas(true);
      document.documentElement.classList.add('christmas');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDark(prev => {
      const newValue = !prev;
      if (newValue) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem('theme-dark', String(newValue));
      return newValue;
    });
  };

  const toggleChristmas = () => {
    setIsChristmas(prev => {
      const newValue = !prev;
      if (newValue) {
        document.documentElement.classList.add('christmas');
      } else {
        document.documentElement.classList.remove('christmas');
      }
      localStorage.setItem('theme-christmas', String(newValue));
      return newValue;
    });
  };

  return (
    <ThemeContext.Provider value={{
      isDark,
      isChristmas,
      toggleDarkMode,
      toggleChristmas
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};