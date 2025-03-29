/**
 * Memory leak detection and debugging utilities
 * This file contains functions to help identify and address memory leaks
 */

// Track common leak-prone objects in the application
interface LeakTracker {
  listeners: WeakMap<Element, Set<string>>
  timers: Set<NodeJS.Timeout>
  intervalCount: number
  refsWithCleanup: WeakSet<object>
}

// Global leak tracker
const leakTracker: LeakTracker = {
  listeners: new WeakMap(),
  timers: new Set(),
  intervalCount: 0,
  refsWithCleanup: new WeakSet()
}

/**
 * Track an event listener for potential memory leaks
 * Use this when adding event listeners that should be cleaned up later
 */
export function trackListener(element: Element, eventType: string): void {
  if (process.env.NODE_ENV === 'production') return

  let elementListeners = leakTracker.listeners.get(element)
  if (!elementListeners) {
    elementListeners = new Set()
    leakTracker.listeners.set(element, elementListeners)
  }
  elementListeners.add(eventType)
}

/**
 * Untrack a listener when it's properly cleaned up
 */
export function untrackListener(element: Element, eventType: string): void {
  if (process.env.NODE_ENV === 'production') return

  const elementListeners = leakTracker.listeners.get(element)
  if (elementListeners) {
    elementListeners.delete(eventType)
    if (elementListeners.size === 0) {
      leakTracker.listeners.delete(element)
    }
  }
}

/**
 * Track setTimeout and setInterval calls
 * Returns the timer ID for cleanup
 */
export function trackTimer(
  timerId: NodeJS.Timeout,
  isInterval = false
): NodeJS.Timeout {
  if (process.env.NODE_ENV === 'production') return timerId

  leakTracker.timers.add(timerId)
  if (isInterval) {
    leakTracker.intervalCount++
  }
  return timerId
}

/**
 * Untrack a timer when it's cleaned up with clearTimeout or clearInterval
 */
export function untrackTimer(
  timerId: NodeJS.Timeout,
  isInterval = false
): void {
  if (process.env.NODE_ENV === 'production') return

  leakTracker.timers.delete(timerId)
  if (isInterval) {
    leakTracker.intervalCount--
  }
}

/**
 * Helper functions that wrap timer functions with tracking
 */
export function safeSetTimeout(
  callback: () => void,
  delay?: number
): NodeJS.Timeout {
  const timerId = setTimeout(() => {
    callback()
    untrackTimer(timerId)
  }, delay)

  return trackTimer(timerId)
}

export function safeSetInterval(
  callback: () => void,
  delay?: number
): NodeJS.Timeout {
  const timerId = setInterval(callback, delay)
  return trackTimer(timerId, true)
}

export function safeClearTimeout(timerId: NodeJS.Timeout): void {
  clearTimeout(timerId)
  untrackTimer(timerId)
}

export function safeClearInterval(timerId: NodeJS.Timeout): void {
  clearInterval(timerId)
  untrackTimer(timerId, true)
}

/**
 * Mark React refs or objects that need cleanup
 */
export function trackRefForCleanup(ref: object): void {
  if (process.env.NODE_ENV === 'production') return

  leakTracker.refsWithCleanup.add(ref)
}

/**
 * Unmark a cleaned up ref
 */
export function untrackRefCleanup(ref: object): void {
  if (process.env.NODE_ENV === 'production') return

  leakTracker.refsWithCleanup.delete(ref)
}

/**
 * Get current memory tracking status
 * This can be useful for debugging in development
 */
export function getMemoryTrackingStatus(): Record<string, unknown> {
  return {
    activeTimers: leakTracker.timers.size,
    activeIntervals: leakTracker.intervalCount
  }
}

/**
 * Check for common memory leak patterns in the application
 * Useful to call at regular intervals during development testing
 */
export function checkForMemoryLeaks(): void {
  if (process.env.NODE_ENV === 'production') return

  const memoryTrackingStatus = getMemoryTrackingStatus()

  // Check for timers that might be leaking
  if (Number(memoryTrackingStatus.activeTimers) > 10) {
    console.warn(
      `Potential leak: ${memoryTrackingStatus.activeTimers} active timers detected`
    )
  }

  // Check for intervals that could cause leaks if not cleaned up
  if (Number(memoryTrackingStatus.activeIntervals) > 3) {
    console.warn(
      `Potential leak: ${memoryTrackingStatus.activeIntervals} active intervals detected`
    )
  }

  // Browser-specific checks if we're in a browser environment
  if (typeof window !== 'undefined') {
    // Check DOM node count - large increases can indicate leaks
    const domNodeCount = document.querySelectorAll('*').length

    if (domNodeCount > 2000) {
      console.warn(
        `High DOM node count: ${domNodeCount} nodes. This might indicate a leak.`
      )
    }

    // Try to access Chrome-specific memory info if available
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const windowPerformance = window.performance as any

    if (windowPerformance && windowPerformance.memory) {
      const memoryInfo = windowPerformance.memory
      const usedHeapPercentage =
        (memoryInfo.usedJSHeapSize / memoryInfo.jsHeapSizeLimit) * 100

      if (usedHeapPercentage > 75) {
        console.warn(
          `High memory usage: ${usedHeapPercentage.toFixed(2)}% of available heap`
        )
      }
    }
  }
}

/**
 * Try to find React component leaks by analyzing component counts
 * This requires React DevTools to be installed and is only meant for development
 */
export function checkReactComponentCounts(): void {
  if (process.env.NODE_ENV === 'production' || typeof window === 'undefined')
    return

  // This is a simplified check - the React DevTools has more sophisticated tools
  try {
    const reactRootContainer = document.querySelector('[data-reactroot]')
    if (!reactRootContainer || !('_reactRootContainer' in reactRootContainer)) {
      console.log('No React root container found')
      return
    }

    const reactFiber = reactRootContainer._reactRootContainer

    if (reactFiber) {
      console.log(
        'React component tree is accessible for further debugging with React DevTools'
      )
    }
  } catch (e) {
    // This is just a helper function for development use
    console.log(
      'Unable to access React component details, use React DevTools for better analysis'
    )
  }
}

/**
 * Safely add an event listener with automatic cleanup tracking
 */
export function addTrackedEventListener(
  element: Element,
  eventType: string,
  handler: EventListenerOrEventListenerObject,
  options?: boolean | AddEventListenerOptions
): void {
  element.addEventListener(eventType, handler, options)
  trackListener(element, eventType)
}

/**
 * Safely remove an event listener with automatic cleanup tracking
 */
export function removeTrackedEventListener(
  element: Element,
  eventType: string,
  handler: EventListenerOrEventListenerObject,
  options?: boolean | EventListenerOptions
): void {
  element.removeEventListener(eventType, handler, options)
  untrackListener(element, eventType)
}

// Export a browser-only helper function to run the memory leak checks periodically
export const setupMemoryLeakDetection =
  typeof window !== 'undefined' && process.env.NODE_ENV === 'development'
    ? () => {
        const checkInterval = 30000 // Check every 30 seconds
        return safeSetInterval(() => {
          checkForMemoryLeaks()
        }, checkInterval)
      }
    : () => 0 as unknown as NodeJS.Timeout // No-op in production or SSR
