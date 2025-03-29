// Logger utility for PCH NextJS app
// This provides consistent logging across the application with different log levels
// and the ability to send logs to external services

type LogLevel = 'debug' | 'info' | 'warn' | 'error'

interface LogEntry {
  timestamp: string
  level: LogLevel
  message: string
  component?: string
  data?: unknown
  error?: Partial<Error>
}

interface LoggerOptions {
  level?: LogLevel
  component?: string
  enabled?: boolean
  captureConsole?: boolean
  maxLogSize?: number
}

// Default log level hierarchy
const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3
}

class Logger {
  private static instance: Logger
  private options: LoggerOptions = {
    level: 'info',
    enabled: true,
    captureConsole: false,
    maxLogSize: 100 // Default to storing last 100 logs in memory
  }
  private logs: LogEntry[] = []
  private originalConsole = {
    log: console.log,
    info: console.info,
    warn: console.warn,
    error: console.error,
    debug: console.debug
  }

  private constructor() {
    // Check if we're in a production environment
    const isProduction = process.env.NODE_ENV === 'production'

    // In production, we set the default level to 'info'
    // In development, we set it to 'debug'
    this.options.level = isProduction ? 'info' : 'debug'

    if (this.options.captureConsole) {
      this.overrideConsole()
    }
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger()
    }
    return Logger.instance
  }

  public configure(options: LoggerOptions): void {
    this.options = { ...this.options, ...options }

    // If captureConsole setting changed, update console overrides
    if (options.captureConsole !== undefined) {
      if (options.captureConsole) {
        this.overrideConsole()
      } else {
        this.restoreConsole()
      }
    }
  }

  private overrideConsole(): void {
    console.log = (...args: unknown[]) => {
      this.originalConsole.log(...args)
      this.info(String(args[0]), undefined, args.slice(1))
    }

    console.info = (...args: unknown[]) => {
      this.originalConsole.info(...args)
      this.info(String(args[0]), undefined, args.slice(1))
    }

    console.warn = (...args: unknown[]) => {
      this.originalConsole.warn(...args)
      this.warn(String(args[0]), undefined, args.slice(1))
    }

    console.error = (...args: unknown[]) => {
      this.originalConsole.error(...args)
      this.error(String(args[0]), undefined, args.slice(1))
    }

    console.debug = (...args: unknown[]) => {
      this.originalConsole.debug(...args)
      this.debug(String(args[0]), undefined, args.slice(1))
    }
  }

  private restoreConsole(): void {
    console.log = this.originalConsole.log
    console.info = this.originalConsole.info
    console.warn = this.originalConsole.warn
    console.error = this.originalConsole.error
    console.debug = this.originalConsole.debug
  }

  private isLevelEnabled(level: LogLevel): boolean {
    return (
      Boolean(this.options.enabled) &&
      LOG_LEVELS[level] >= LOG_LEVELS[this.options.level as LogLevel]
    )
  }

  private formatLogEntry(
    level: LogLevel,
    message: string,
    component?: string,
    data?: unknown,
    error?: Error
  ): LogEntry {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      component: component || this.options.component
    }

    if (data) entry.data = this.sanitizeData(data)
    if (error) entry.error = this.formatError(error)

    return entry
  }

  private sanitizeData(data: unknown): unknown {
    // Clone data to avoid modifying the original
    try {
      // For circular references, use a more robust approach
      return JSON.parse(JSON.stringify(data, this.replacer))
    } catch (e) {
      // If JSON.stringify fails (e.g., circular references), return a simplified version
      return String(data)
    }
  }

  private replacer(key: string, value: unknown): unknown {
    if (
      key === 'password' ||
      key === 'token' ||
      key === 'secret' ||
      key === 'apiKey'
    ) {
      return '[REDACTED]'
    }

    // Handle circular references
    const seen = new WeakSet()
    if (typeof value === 'object' && value !== undefined) {
      if (seen.has(value as object)) {
        return '[Circular Reference]'
      }
      seen.add(value as object)
    }

    return value
  }

  private formatError(error: Error): Partial<Error> {
    return {
      name: error.name,
      message: error.message,
      stack: error.stack
    }
  }

  private logToConsole(entry: LogEntry): void {
    const prefix = `[${entry.timestamp}] ${entry.level.toUpperCase()}${entry.component ? ` [${entry.component}]` : ''}:`

    switch (entry.level) {
      case 'debug':
        this.originalConsole.debug(
          prefix,
          entry.message,
          entry.data || '',
          entry.error || ''
        )
        break
      case 'info':
        this.originalConsole.info(
          prefix,
          entry.message,
          entry.data || '',
          entry.error || ''
        )
        break
      case 'warn':
        this.originalConsole.warn(
          prefix,
          entry.message,
          entry.data || '',
          entry.error || ''
        )
        break
      case 'error':
        this.originalConsole.error(
          prefix,
          entry.message,
          entry.data || '',
          entry.error || ''
        )
        break
    }
  }

  private addToMemory(entry: LogEntry): void {
    this.logs.push(entry)

    // Trim logs if they exceed maxLogSize
    if (this.logs.length > (this.options.maxLogSize || 100)) {
      this.logs = this.logs.slice(-(this.options.maxLogSize || 100))
    }
  }

  // Public logging methods
  public debug(
    message: string,
    component?: string,
    data?: unknown,
    error?: Error
  ): void {
    if (!this.isLevelEnabled('debug')) return

    const entry = this.formatLogEntry('debug', message, component, data, error)
    this.logToConsole(entry)
    this.addToMemory(entry)
  }

  public info(
    message: string,
    component?: string,
    data?: unknown,
    error?: Error
  ): void {
    if (!this.isLevelEnabled('info')) return

    const entry = this.formatLogEntry('info', message, component, data, error)
    this.logToConsole(entry)
    this.addToMemory(entry)
  }

  public warn(
    message: string,
    component?: string,
    data?: unknown,
    error?: Error
  ): void {
    if (!this.isLevelEnabled('warn')) return

    const entry = this.formatLogEntry('warn', message, component, data, error)
    this.logToConsole(entry)
    this.addToMemory(entry)
  }

  public error(
    message: string,
    component?: string,
    data?: unknown,
    error?: Error
  ): void {
    if (!this.isLevelEnabled('error')) return

    const entry = this.formatLogEntry('error', message, component, data, error)
    this.logToConsole(entry)
    this.addToMemory(entry)
  }

  // Memory usage monitoring specific to identifying memory leaks
  public logMemoryUsage(component?: string): void {
    if (typeof process !== 'undefined' && process.memoryUsage) {
      const memoryUsage = process.memoryUsage()
      this.info('Memory usage stats', component, {
        rss: `${Math.round(memoryUsage.rss / 1024 / 1024)} MB`,
        heapTotal: `${Math.round(memoryUsage.heapTotal / 1024 / 1024)} MB`,
        heapUsed: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)} MB`,
        external: memoryUsage.external
          ? `${Math.round(memoryUsage.external / 1024 / 1024)} MB`
          : 'N/A',
        arrayBuffers: memoryUsage.arrayBuffers
          ? `${Math.round(memoryUsage.arrayBuffers / 1024 / 1024)} MB`
          : 'N/A'
      })
    } else if (typeof window !== 'undefined') {
      // Browser memory info
      // Try to access Chrome-specific memory info if available
      type ChromePerformance = {
        memory?: {
          jsHeapSizeLimit: number
          totalJSHeapSize: number
          usedJSHeapSize: number
        }
      }

      const windowPerformance = window.performance as ChromePerformance

      if (windowPerformance && windowPerformance.memory) {
        const memoryInfo = windowPerformance.memory
        this.info('Browser memory usage stats', component, {
          jsHeapSizeLimit: `${Math.round(memoryInfo.jsHeapSizeLimit / 1024 / 1024)} MB`,
          totalJSHeapSize: `${Math.round(memoryInfo.totalJSHeapSize / 1024 / 1024)} MB`,
          usedJSHeapSize: `${Math.round(memoryInfo.usedJSHeapSize / 1024 / 1024)} MB`
        })
      } else {
        this.info('Browser memory details not available', component)
      }
    } else {
      this.info('Memory usage stats not available', component)
    }
  }

  // Get all logs (for debugging or sending to a server)
  public getLogs(): LogEntry[] {
    return [...this.logs]
  }

  // Clear all stored logs
  public clearLogs(): void {
    this.logs = []
  }

  // Export logs to JSON file (client-side only)
  public exportLogs(): string {
    return JSON.stringify(this.logs, undefined, 2)
  }
}

// Export a singleton instance
export const logger = Logger.getInstance()

// Helper to create component-specific loggers
export function createLogger(component: string): {
  debug: (message: string, data?: unknown, error?: Error) => void
  info: (message: string, data?: unknown, error?: Error) => void
  warn: (message: string, data?: unknown, error?: Error) => void
  error: (message: string, data?: unknown, error?: Error) => void
  logMemoryUsage: () => void
} {
  return {
    debug: (message: string, data?: unknown, error?: Error) =>
      logger.debug(message, component, data, error),
    info: (message: string, data?: unknown, error?: Error) =>
      logger.info(message, component, data, error),
    warn: (message: string, data?: unknown, error?: Error) =>
      logger.warn(message, component, data, error),
    error: (message: string, data?: unknown, error?: Error) =>
      logger.error(message, component, data, error),
    logMemoryUsage: () => logger.logMemoryUsage(component)
  }
}

// Export default for convenience
export default logger
