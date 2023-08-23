import { createDecorator } from '../../src';

export interface IMainService {
  startup(): void;
}

export const IMainService = createDecorator<IMainService>('IMainService');
