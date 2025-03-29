import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Simple in-memory logging for memory usage
interface MemoryLog {
  timestamp: string
  url: string
  rss: number
  heapTotal: number
  heapUsed: number
  external?: number
  arrayBuffers?: number
}

// Use WeakRef to avoid preventing garbage collection
const createCircularBuffer = <T>(maxSize: number) => {
  const buffer: T[] = []
  return {
    push: (item: T) => {
      if (buffer.length >= maxSize) {
        buffer.shift()
      }
      buffer.push(item)
    },
    getAll: () => [...buffer],
    getRecent: (count: number) => buffer.slice(-Math.min(count, buffer.length))
  }
}

const memoryLogs = createCircularBuffer<MemoryLog>(100)
const MAX_COUNTER = 1000000 // Reset counter when it reaches this value
let requestCounter = 0
const SAMPLING_RATE = process.env.NODE_ENV === 'production' ? 100 : 20 // Less frequent in production

// Add memory measurement every x requests to avoid excessive logging
// and to monitor trends
export function middleware(request: NextRequest) {
  // Increment counter and reset if needed to prevent integer overflow
  requestCounter++
  if (requestCounter >= MAX_COUNTER) {
    requestCounter = 1
  }

  // Only sample every X requests to avoid excessive logging
  if (requestCounter % SAMPLING_RATE === 0) {
    const memoryUsage = process.memoryUsage()
    const timestamp = new Date().toISOString()

    // Add to the memory logs using the circular buffer
    memoryLogs.push({
      timestamp,
      url: request.nextUrl.pathname,
      rss: memoryUsage.rss,
      heapTotal: memoryUsage.heapTotal,
      heapUsed: memoryUsage.heapUsed,
      external: memoryUsage.external,
      arrayBuffers: memoryUsage.arrayBuffers
    })

    // Format memory values for display
    const rssInMB = Math.round(memoryUsage.rss / 1024 / 1024)
    const heapTotalInMB = Math.round(memoryUsage.heapTotal / 1024 / 1024)
    const heapUsedInMB = Math.round(memoryUsage.heapUsed / 1024 / 1024)

    // In production, only log basic info unless there's a potential issue
    if (process.env.NODE_ENV === 'production') {
      // Calculate heap usage percentage
      const memoryUsedPercentage =
        (memoryUsage.heapUsed / memoryUsage.heapTotal) * 100

      // In production, only log when there might be an issue
      if (memoryUsedPercentage > 75) {
        console.warn(`[${timestamp}] ⚠️ High memory usage detected:`)
        console.warn(`  URL: ${request.nextUrl.pathname}`)
        console.warn(
          `  Heap: ${heapUsedInMB}MB / ${heapTotalInMB}MB (${memoryUsedPercentage.toFixed(1)}%)`
        )
        console.warn(`  RSS: ${rssInMB}MB`)
      }
    } else {
      // In development, log more verbose information
      console.log(
        `[${timestamp}] [Memory Monitor] URL: ${request.nextUrl.pathname}`
      )
      console.log(`  RSS: ${rssInMB} MB`)
      console.log(`  Heap Total: ${heapTotalInMB} MB`)
      console.log(`  Heap Used: ${heapUsedInMB} MB`)

      // Check for potential memory leaks
      const memoryUsedPercentage =
        (memoryUsage.heapUsed / memoryUsage.heapTotal) * 100

      if (memoryUsedPercentage > 90) {
        console.warn(
          '⚠️ WARNING: Memory usage is very high (>90%)! Potential memory leak.'
        )
      } else if (memoryUsedPercentage > 75) {
        console.warn(
          '⚠️ WARNING: Memory usage is high (>75%)! Monitor closely.'
        )
      }

      // Check for memory growth over time using the circular buffer
      const allLogs = memoryLogs.getAll()
      if (allLogs.length > 10) {
        const oldestSample = allLogs[0]
        const newestSample = allLogs[allLogs.length - 1]

        const growthRate =
          ((newestSample.heapUsed - oldestSample.heapUsed) /
            oldestSample.heapUsed) *
          100

        if (growthRate > 20) {
          console.warn(
            `⚠️ WARNING: Memory usage has grown by ${growthRate.toFixed(2)}% over the last ${allLogs.length} samples.`
          )
          console.warn('This may indicate a memory leak. Routes accessed:')

          // Show the last 5 routes accessed
          const recentRoutes = memoryLogs.getRecent(5).map(log => log.url)
          console.warn(recentRoutes)
        }
      }
    }
  }

  return NextResponse.next()
}

// Only run middleware on specific paths - modify this as needed for your app
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)'
  ]
}
