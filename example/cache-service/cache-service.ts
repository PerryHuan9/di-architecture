import { ILoggerService } from '../logger-service/logger-service.interface';
import { ICacheService } from './cache-service.interface';

export class MyCacheService implements ICacheService {
  constructor(@ILoggerService private _loggerService: ILoggerService) {}
  _serviceBrand: undefined;
  private map = new Map();

  setItem(key: string, val: any): void {
    this._loggerService.log('setItem:', [key, val]);
    this.map.set(key, val);
  }
  getItem(key: string) {
    const val = this.map.get(key);
    this._loggerService.log('setItem:', [key, val]);
    return val;
  }
}
