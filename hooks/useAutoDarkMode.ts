'use client'

import { useEffect } from 'react'

export default function useAutoDarkMode() {
  useEffect(() => {
    const root = document.documentElement
    const savedTheme = localStorage.getItem('theme')

    if (savedTheme) {
      // Respect stored preference
      root.classList.toggle('dark', savedTheme === 'dark')
    } else {
      // Set based on time of day
      const hour = new Date().getHours()
      const prefersDark = hour >= 19 || hour < 7
      root.classList.toggle('dark', prefersDark)
      localStorage.setItem('theme', prefersDark ? 'dark' : 'light')
    }
  }, [])
}
// This hook automatically applies dark mode based on time of day or user preference.
// It checks localStorage for a saved theme and applies it, or defaults to dark mode at night.