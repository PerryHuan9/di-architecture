import { AutorunObserver } from './autorun';
import { ObservableValue, TransactionImpl } from './base';
import { Derived } from './derived';
import { FromEventObservable } from './utils';

let globalObservableLogger: IObservableLogger | undefined;

export function setLogger(logger: IObservableLogger): void {
  globalObservableLogger = logger;
}

export function getLogger(): IObservableLogger | undefined {
  return globalObservableLogger;
}

interface IChangeInformation {
  oldValue: unknown;
  newValue: unknown;
  change: unknown;
  didChange: boolean;
  hadValue: boolean;
}

export interface IObservableLogger {
  handleObservableChanged(observable: ObservableValue<any, any>, info: IChangeInformation): void;
  handleFromEventObservableTriggered(observable: FromEventObservable<any, any>, info: IChangeInformation): void;

  handleAutorunCreated(autorun: AutorunObserver): void;
  handleAutorunTriggered(autorun: AutorunObserver): void;
  handleAutorunFinished(autorun: AutorunObserver): void;

  handleDerivedCreated(observable: Derived<any>): void;
  handleDerivedRecomputed(observable: Derived<any>, info: IChangeInformation): void;

  handleBeginTransaction(transaction: TransactionImpl): void;
  handleEndTransaction(): void;
}

