import { createDecorator } from "../../src";

export interface ILoggerService {
    log(...arg: any[]): void;
    info(...arg: any[]): void;
    error(...arg: any[]): void;
    warn(...arg: any[]): void;
}
export const ILoggerService = createDecorator<ILoggerService>("ILoggerService");
