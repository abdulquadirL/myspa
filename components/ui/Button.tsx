'use client'

import { ButtonHTMLAttributes } from 'react'
import clsx from 'clsx'

type Variant = 'primary' | 'secondary' | 'outline'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  loading?: boolean
}

export default function Button({
  children,
  variant = 'primary',
  loading = false,
  disabled,
  className,
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2'

  const variants: Record<Variant, string> = {
    primary:
      'bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-600 dark:text-black',
    secondary:
      'bg-amber-500 text-black hover:bg-amber-600 focus:ring-amber-400 dark:bg-amber-400 dark:text-black dark:hover:bg-amber-500',
    outline:
      'border border-gray-600 text-gray-800 hover:bg-gray-100 focus:ring-gray-400 dark:border-amber-300 dark:text-amber-300 dark:hover:bg-gray-800',
  }

  return (
    <button
      disabled={disabled || loading}
      className={clsx(
        baseStyles,
        variants[variant],
        {
          'opacity-50 cursor-not-allowed': disabled || loading,
        },
        className
      )}
      {...props}
    >
      {loading ? '⏳ Loading...' : children}
    </button>
  )
}
