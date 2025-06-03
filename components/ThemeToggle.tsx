'use client';

import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    const isCurrentlyDark = root.classList.contains('dark');
    root.classList.toggle('dark');
    localStorage.setItem('theme', isCurrentlyDark ? 'light' : 'dark');
    setIsDark(!isCurrentlyDark);
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 left-4 z-50 p-2 bg-white text-amber-200 rounded-full shadow-lg hover:bg-emerald-700 transition flex items-center justify-center"
      aria-label="Toggle theme"
    >
      {isDark ? <Sun size={24} /> : <Moon size={24} />}
    </button>
  );
};