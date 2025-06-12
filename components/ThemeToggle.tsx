'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldUseDark = savedTheme
      ? savedTheme === 'dark'
      : prefersDark || new Date().getHours() < 6 || new Date().getHours() >= 19;

    if (shouldUseDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    setIsDark(root.classList.contains('dark'));
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    const currentlyDark = root.classList.contains('dark');
    root.classList.toggle('dark');
    localStorage.setItem('theme', currentlyDark ? 'light' : 'dark');
    setIsDark(!currentlyDark);
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-50 px-4 py-2 text-sm bg-cream-600 text-white rounded-lg shadow-lg hover:bg-cream-300 transition dark:bg-amber-400 dark:text-black"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {isDark ? '☀' : '🌙 '}
    </motion.button>
  );
}
