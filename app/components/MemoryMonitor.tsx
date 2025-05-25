'use client'

import { useEffect, useState, useRef } from 'react'
import { safeSetInterval, safeClearInterval } from '../utils/memoryLeak'

interface MemorySnapshot {
  timestamp: number
  heapSize: number | undefined
  route: string
}

// Define Chrome-specific performance memory interface
interface ChromePerformance extends Performance {
  memory?: {
    jsHeapSizeLimit: number
    totalJSHeapSize: number
    usedJSHeapSize: number
  }
}

/**
 * Client-side memory monitor component
 * This collects and logs memory usage information in all environments
 * but only displays the UI in development mode
 */
export function MemoryMonitor() {
  const [memorySnapshots, setMemorySnapshots] = useState<MemorySnapshot[]>([])
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [leakDetected, setLeakDetected] = useState(false)
  const intervalIdRef = useRef<NodeJS.Timeout | undefined>(undefined)

  // Toggle visibility
  const toggleVisibility = () => setIsVisible(!isVisible)
  const toggleExpanded = () => setIsExpanded(!isExpanded)

  // Format bytes to appropriate units (KB, MB, etc.) - used for both logging and UI
  const formatBytes = (bytes: number | undefined) => {
    if (bytes === undefined) return 'Unknown'
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(2)} KB`
    return `${(bytes / 1048576).toFixed(2)} MB`
  }

  useEffect(() => {
    // Memory monitoring runs in all environments, but UI only shows in development
    const captureMemory = () => {
      // Access memory metrics if available (Chrome/Edge browsers only)
      const browserPerformance = window.performance as ChromePerformance
      const memory = browserPerformance.memory

      if (memory) {
        const newSnapshot: MemorySnapshot = {
          timestamp: Date.now(),
          heapSize: memory.usedJSHeapSize,
          route: window.location.pathname
        }

        // In production, only log critical memory issues to avoid log accumulation
        if (process.env.NODE_ENV === 'production') {
          const usedHeapPercentage =
            (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100
          if (usedHeapPercentage > 85) {
            console.warn(
              `[Memory Monitor] Critical usage: ${formatBytes(newSnapshot.heapSize)} (${usedHeapPercentage.toFixed(1)}%)`
            )
          }
          return // Don't accumulate state in production
        }

        // Development logging
        console.log(`[Memory Monitor] ${window.location.pathname}`)
        console.log(`  Heap Used: ${formatBytes(newSnapshot.heapSize)}`)
        console.log(`  Total Heap: ${formatBytes(memory.totalJSHeapSize)}`)
        console.log(`  Heap Limit: ${formatBytes(memory.jsHeapSizeLimit)}`)

        // Only update state for UI in development mode
        setMemorySnapshots(prev => {
          const newSnapshots = [...prev, newSnapshot].slice(-20) // Keep only the last 20 samples

          // Simple leak detection - check if memory usage is consistently growing
          if (newSnapshots.length > 10) {
            const oldestSnapshot = newSnapshots[0]
            const newestSnapshot = newSnapshots[newSnapshots.length - 1]

            if (oldestSnapshot.heapSize && newestSnapshot.heapSize) {
              const growthRate =
                (newestSnapshot.heapSize - oldestSnapshot.heapSize) /
                oldestSnapshot.heapSize

              // If memory grows by more than 10% across 10 samples, flag as potential leak
              if (growthRate > 0.1) {
                setLeakDetected(true)
                console.warn(
                  '⚠️ Potential memory leak detected in the browser!'
                )
                console.warn(
                  `⚠️ Memory grew by ${(growthRate * 100).toFixed(2)}% across the last ${newSnapshots.length} samples`
                )
              } else {
                setLeakDetected(false)
              }
            }
          }

          return newSnapshots
        })
      }
    }

    // Capture memory immediately
    captureMemory()

    // Clean up any existing interval
    if (intervalIdRef.current) {
      safeClearInterval(intervalIdRef.current)
      intervalIdRef.current = undefined
    }

    // Reduce monitoring frequency in production to minimize overhead
    const monitoringInterval =
      process.env.NODE_ENV === 'production' ? 30000 : 5000
    intervalIdRef.current = safeSetInterval(captureMemory, monitoringInterval)

    // Cleanup
    return () => {
      if (intervalIdRef.current) {
        safeClearInterval(intervalIdRef.current)
        intervalIdRef.current = undefined
      }
    }
  }, [])

  // Only render UI in development mode
  if (process.env.NODE_ENV !== 'development') {
    return undefined
  }

  // Calculate a simple chart value (percentage of 100MB for visualization)
  const calculateBarWidth = (bytes: number | undefined) => {
    if (bytes === undefined) return 0
    // Assuming 100MB is "full scale"
    const percentage = Math.min(100, (bytes / 104857600) * 100)
    return `${percentage}%`
  }

  const toggleButtonClasses = `fixed bottom-2 right-2 ${
    leakDetected ? 'bg-red-500' : 'bg-blue-500'
  } text-white py-1 px-3 rounded-md shadow-md z-50 text-xs`

  return (
    <>
      <button className={toggleButtonClasses} onClick={toggleVisibility}>
        {leakDetected ? '⚠️ Memory Leak Detected' : '🧠 Memory Monitor'}
      </button>

      {isVisible && (
        <div className="fixed bottom-10 right-2 bg-white dark:bg-gray-800 p-4 rounded-md shadow-lg z-50 w-80 text-sm border border-gray-300 dark:border-gray-600">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold">Memory Usage</h3>
            <div className="space-x-2">
              <button
                onClick={toggleExpanded}
                className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded"
              >
                {isExpanded ? 'Collapse' : 'Expand'}
              </button>
              <button
                onClick={toggleVisibility}
                className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded"
              >
                Close
              </button>
            </div>
          </div>

          {/* Current memory usage */}
          {memorySnapshots.length > 0 && (
            <div className="mb-4">
              <p>
                Current:{' '}
                {formatBytes(
                  memorySnapshots[memorySnapshots.length - 1]?.heapSize
                )}
                <span className="text-xs text-gray-500 ml-2">
                  {new Date(
                    memorySnapshots[memorySnapshots.length - 1]?.timestamp
                  ).toLocaleTimeString()}
                </span>
              </p>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-1">
                <div
                  className={`h-2.5 rounded-full ${leakDetected ? 'bg-red-500' : 'bg-blue-500'}`}
                  style={{
                    width: calculateBarWidth(
                      memorySnapshots[memorySnapshots.length - 1]?.heapSize
                    )
                  }}
                ></div>
              </div>
            </div>
          )}

          {/* Memory history */}
          {isExpanded && (
            <div className="mt-2 max-h-60 overflow-y-auto">
              <h4 className="font-semibold text-xs mb-1">
                History (Recent First)
              </h4>
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b dark:border-gray-700">
                    <th className="py-1 text-left">Time</th>
                    <th className="py-1 text-left">Route</th>
                    <th className="py-1 text-right">Memory</th>
                  </tr>
                </thead>
                <tbody>
                  {[...memorySnapshots].reverse().map((snapshot, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-100 dark:border-gray-700"
                    >
                      <td className="py-1">
                        {new Date(snapshot.timestamp).toLocaleTimeString()}
                      </td>
                      <td className="py-1 truncate max-w-[100px]">
                        {snapshot.route}
                      </td>
                      <td className="py-1 text-right">
                        {formatBytes(snapshot.heapSize)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {leakDetected && (
            <div className="mt-3 p-2 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 rounded text-xs">
              <p className="font-bold">Potential Memory Leak Detected!</p>
              <p className="mt-1">
                Memory usage is growing consistently. Check for:
              </p>
              <ul className="list-disc list-inside mt-1">
                <li>Uncleaned event listeners</li>
                <li>DOM elements not being garbage collected</li>
                <li>Growing caches or collections</li>
                <li>React component unmounting issues</li>
              </ul>
            </div>
          )}
        </div>
      )}
    </>
  )
}
