'use client'

import PageHeader from "@/components/PageHeader"

export default function AnalyticsPage() {
  return (
    <div className="p-8">
      <PageHeader icon="📈" title="Analytics" subtitle="View booking trends,"/>
      <h1 className="text-3xl font-bold mb-4">📈 Analytics</h1>
      <p className="text-gray-600 dark:text-gray-400">
        Coming soon! Here you’ll be able to view booking trends, client engagement, and service performance analytics.
      </p>
    </div>
  )
}
