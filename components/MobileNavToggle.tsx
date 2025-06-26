'use client'

import { useEffect, useState } from 'react'

export default function MobileNavToggle() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(true)
  }, [])

  return visible ? (
    <button
      onClick={() =>
        document.querySelector('aside')?.classList.toggle('-translate-x-full')
      }
      className="md:hidden fixed top-4 left-4 z-50 bg-amber-500 text-white p-2 rounded"
      aria-label="Toggle Navigation"
    >
      ☰
    </button>
  ) : null
}
