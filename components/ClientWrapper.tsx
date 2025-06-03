// components/ClientWrapper.tsx
'use client'

import { ReactNode } from 'react'
import useAutoDarkMode from '@/hooks/useAutoDarkMode'
import { ThemeToggle } from './ThemeToggle'

export default function ClientWrapper({ children }: { children: ReactNode }) {
  useAutoDarkMode()

  return (
    <>
      <ThemeToggle />
      {children}
    </>
  )
}
