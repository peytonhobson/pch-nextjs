import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

/**
 * API endpoint that returns memory usage statistics
 * This can be used by monitoring tools to track memory usage in production
 *
 * NOTE: You should protect this endpoint in production with
 * proper authentication to prevent leaking sensitive information
 */

// Mark this route as dynamic since it uses headers
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    // In production, require a simple API key for protection
    if (process.env.NODE_ENV === 'production') {
      const headersList = headers()
      const apiKey = headersList.get('x-api-key')

      // You should set this in your .env.local file
      const validApiKey = process.env.MEMORY_STATS_API_KEY

      if (!validApiKey) {
        console.warn(
          'Memory stats API key not configured in environment variables'
        )
        return NextResponse.json(
          { error: 'API access not configured' },
          { status: 500 }
        )
      }

      if (apiKey !== validApiKey) {
        return NextResponse.json(
          { error: 'Unauthorized - Invalid API key' },
          { status: 401 }
        )
      }
    }

    // Gather memory usage statistics
    const memoryUsage = process.memoryUsage()

    // Current timestamp
    const timestamp = new Date().toISOString()

    // Get additional system info if available
    const nodeVersion = process.version
    const uptime = process.uptime()

    // Format the memory values to MB for readability
    const memoryStats = {
      timestamp,
      rss: Math.round(memoryUsage.rss / 1024 / 1024),
      heapTotal: Math.round(memoryUsage.heapTotal / 1024 / 1024),
      heapUsed: Math.round(memoryUsage.heapUsed / 1024 / 1024),
      external: memoryUsage.external
        ? Math.round(memoryUsage.external / 1024 / 1024)
        : 0,
      arrayBuffers: memoryUsage.arrayBuffers
        ? Math.round(memoryUsage.arrayBuffers / 1024 / 1024)
        : 0,
      memoryUtilization: Math.round(
        (memoryUsage.heapUsed / memoryUsage.heapTotal) * 100
      ),
      nodeVersion,
      uptime: Math.round(uptime),
      environment: process.env.NODE_ENV
    }

    return NextResponse.json(memoryStats)
  } catch (error) {
    console.error('Error retrieving memory stats:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve memory statistics' },
      { status: 500 }
    )
  }
}
