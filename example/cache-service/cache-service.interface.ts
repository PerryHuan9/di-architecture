import { createDecorator } from '../../src';

export interface ICacheService {
  _serviceBrand: undefined;
  setItem(key: string, val: any): void;
  getItem(key: string): any;
}
export const ICacheService = createDecorator<ICacheService>('ICacheService');
