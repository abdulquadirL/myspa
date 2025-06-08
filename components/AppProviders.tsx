// components/AppProviders.tsx
"use client";

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import useAutoDarkMode from "@/hooks/useAutoDarkMode";
import ThemeToggle from "./ThemeToggle";


export default function AppProviders({ children }: { children: ReactNode }) {
  // Automatically adjust theme based on system preferences
  useAutoDarkMode();

  return (
    <SessionProvider>
      {/* Theme toggle for light/dark mode */}
      <ThemeToggle />
      {/* Render child components */}
      {children}
    </SessionProvider>
  );
}
