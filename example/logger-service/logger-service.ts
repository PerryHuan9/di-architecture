import { ILoggerService } from "./logger-service.interface";

export class MyLoggerService implements ILoggerService {
    log(...arg: any[]): void {
        throw new Error("Method not implemented.");
    }
    info(...arg: any[]): void {
        throw new Error("Method not implemented.");
    }
    error(...arg: any[]): void {
        throw new Error("Method not implemented.");
    }
    warn(...arg: any[]): void {
        throw new Error("Method not implemented.");
    }
}





