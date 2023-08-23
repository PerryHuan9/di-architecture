import { Event } from '../event';
import { IDisposable } from '../lifecycle';
import { BaseObservable, IObservable, ITransaction, getFunctionName, transaction } from './base';
import { getLogger } from './logging';

export class FromEventObservable<TArgs, T> extends BaseObservable<T> {
  private value: T | undefined;
  private hasValue = false;
  private subscription: IDisposable | undefined;

  constructor(private readonly event: Event<TArgs>, public readonly _getValue: (args: TArgs | undefined) => T) {
    super();
  }

  private getDebugName(): string | undefined {
    return getFunctionName(this._getValue);
  }

  public get debugName(): string {
    const name = this.getDebugName();
    return 'From Event' + (name ? `: ${name}` : '');
  }

  protected override onFirstObserverAdded(): void {
    this.subscription = this.event(this.handleEvent);
  }

  private readonly handleEvent = (args: TArgs | undefined) => {
    const newValue = this._getValue(args);

    const didChange = !this.hasValue || this.value !== newValue;

    getLogger()?.handleFromEventObservableTriggered(this, {
      oldValue: this.value,
      newValue,
      change: undefined,
      didChange,
      hadValue: this.hasValue,
    });

    if (didChange) {
      this.value = newValue;

      if (this.hasValue) {
        transaction(
          (tx) => {
            for (const o of this.observers) {
              tx.updateObserver(o, this);
              o.handleChange(this, undefined);
            }
          },
          () => {
            const name = this.getDebugName();
            return 'Event fired' + (name ? `: ${name}` : '');
          },
        );
      }
      this.hasValue = true;
    }
  };

  protected override onLastObserverRemoved(): void {
    this.subscription!.dispose();
    this.subscription = undefined;
    this.hasValue = false;
    this.value = undefined;
  }

  public get(): T {
    if (this.subscription) {
      if (!this.hasValue) {
        this.handleEvent(undefined);
      }
      return this.value!;
    } else {
      // no cache, as there are no subscribers to keep it updated
      return this._getValue(undefined);
    }
  }
}

export interface IObservableSignal<TChange> extends IObservable<void, TChange> {
  trigger(tx: ITransaction | undefined, change: TChange): void;
}
