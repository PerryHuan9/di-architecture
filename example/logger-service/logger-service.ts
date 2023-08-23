import { ILoggerService } from './logger-service.interface';

export class MyLoggerService implements ILoggerService {
  log(...arg: any[]): void {
    console.log(...arg);
  }
  info(...arg: any[]): void {
    console.info(...arg);
  }
  error(...arg: any[]): void {
    console.error(...arg);
  }
  warn(...arg: any[]): void {
    console.warn(...arg);
  }
}
