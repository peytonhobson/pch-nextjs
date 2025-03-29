'use client'

import dynamic from 'next/dynamic'

// Dynamically import the MemoryMonitor component with SSR disabled
// This ensures it only runs in the browser where memory tracking is available
const MemoryMonitor = dynamic(
  async () => {
    const importedModule = await import('./MemoryMonitor')
    return importedModule.MemoryMonitor
  },
  {
    ssr: false
  }
)

export function MemoryMonitorWrapper() {
  // Only render the monitor UI in development
  if (process.env.NODE_ENV !== 'development') {
    return undefined
  }

  return <MemoryMonitor />
}
