import { createDecorator, ServicesAccessor, GetLeadingNonServiceArgs } from './decorator';
import * as descriptors from './descriptors';
import { ServiceCollection } from './serviceCollection';

export const IInstantiationService = createDecorator<IInstantiationService>('instantiationService');

export interface IInstantiationService {
  readonly _serviceBrand: undefined;

  /**
   * Synchronously creates an instance that is denoted by the descriptor
   */
  createInstance<T>(descriptor: descriptors.SyncDescriptor0<T>): T;
  createInstance<Ctor extends new (...args: any[]) => any, R extends InstanceType<Ctor>>(
    ctor: Ctor,
    ...args: GetLeadingNonServiceArgs<ConstructorParameters<Ctor>>
  ): R;

  /**
   * Calls a function with a service accessor.
   */
  invokeFunction<R, TS extends any[] = []>(fn: (accessor: ServicesAccessor, ...args: TS) => R, ...args: TS): R;

  /**
   * Creates a child of this service which inherits all current services
   * and adds/overwrites the given services.
   */
  createChild(services: ServiceCollection): IInstantiationService;
}
