import { formatError } from './formatError';

type LogLevel = 'info' | 'warn' | 'error';

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  data?: any;
}

class GridLogger {
  private logs: LogEntry[] = [];
  private readonly maxLogs = 1000;

  private createLogEntry(level: LogLevel, message: string, data?: any): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level,
      message,
      data: data instanceof Error ? formatError(data) : data
    };
  }

  private log(level: LogLevel, message: string, data?: any) {
    const entry = this.createLogEntry(level, message, data);
    this.logs.push(entry);

    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }

    // Only log to console in development
    if (process.env.NODE_ENV === 'development') {
      const logFn = console[level] || console.log;
      if (data instanceof Error) {
        logFn(`${message}:`, formatError(data));
      } else if (data !== undefined) {
        logFn(`${message}:`, data);
      } else {
        logFn(message);
      }
    }
  }

  info(message: string, data?: any) {
    this.log('info', message, data);
  }

  warn(message: string, data?: any) {
    this.log('warn', message, data);
  }

  error(message: string, data?: any) {
    this.log('error', message, data);
  }

  getLogs(): LogEntry[] {
    return [...this.logs];
  }

  clearLogs() {
    this.logs = [];
  }
}

export const logger = new GridLogger();