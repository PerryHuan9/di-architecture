import { ICacheService } from '../cache-service/cache-service.interface';
import { IMainService } from './main-service.interface';

export class MainService implements IMainService {
  constructor(@ICacheService private _cacheService: ICacheService) {}
  startup(): void {
    this._cacheService.setItem('hello', 'world');
  }
}
