import { InstantiationService, ServiceCollection, SyncDescriptor, createDecorator } from '../src';
import { ICacheService, MyCacheService } from './cache-service';
import { ILoggerService, MyLoggerService } from './logger-service';
import { MainService } from './main-service';

function startup() {
  const collections = new ServiceCollection();
  const service = new InstantiationService(collections);
  collections.set(ICacheService, new SyncDescriptor<ICacheService>(MyCacheService));
  collections.set(ILoggerService, new SyncDescriptor<ILoggerService>(MyLoggerService));
  const main = service.createInstance(MainService);
  main.startup();
}

startup();
