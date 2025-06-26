'use client'

import PageHeader from "@/components/PageHeader"

export default function SettingsPage() {
  return (
    <div className="p-8">
    
      <PageHeader icon="⚙️" title="Settings" subtitle="Manage your admin preferences and spa information"/>
      <h1 className="text-3xl font-bold mb-4">⚙️ Settings</h1>
      <p className="text-gray-600 dark:text-gray-400">
        This section will allow you to manage admin preferences, update business info, and configure notifications.
      </p>
    </div>
  )
}
