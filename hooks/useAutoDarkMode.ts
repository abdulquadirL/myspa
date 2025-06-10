'use client';

import { useEffect } from 'react';

const useAutoDarkMode = () => {
  useEffect(() => {
    const root = document.documentElement;

    // Check localStorage for user preference
    const savedTheme = localStorage.getItem('theme');

    const setTheme = (theme: 'light' | 'dark') => {
      if (theme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    };

    if (savedTheme === 'dark' || savedTheme === 'light') {
      setTheme(savedTheme as 'dark' | 'light');
    } else {
      const hour = new Date().getHours();
      const isNight = hour >= 19 || hour < 6; // 7pm - 6am = dark mode
      setTheme(isNight ? 'dark' : 'light');
    }
  }, []);
};

export default useAutoDarkMode;
