'use client'

import { motion } from 'framer-motion'

interface PageHeaderProps {
  title: string
  subtitle?: string
  icon?: string
}

export default function PageHeader({ title, subtitle, icon }: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-6"
    >
      <h1 className="text-3xl font-bold flex items-center gap-2">
        {icon && <span>{icon}</span>} {title}
      </h1>
      {subtitle && (
        <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm md:text-base">{subtitle}</p>
      )}
    </motion.div>
  )
}
