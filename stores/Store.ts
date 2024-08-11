import { EventBus, Listener } from "@/event_bus/EventBus";
import { createContext } from "react";
import { action, computed, makeObservable, observable } from "mobx";

export enum FieldErrors {
  Requered,
}

const ReadableFieldErrors = {
  [FieldErrors.Requered]: "This field is requered",
};

export type StoreConstructor<T extends Store> = new (
  eventBus: EventBus,
  name: string,
) => T;

export const createStoreContext = <T extends Store>() => {
  return createContext<T | undefined>(undefined);
};

export class Store {
  constructor(
    protected eventBus: EventBus,
    protected entityName: string,
  ) {
    makeObservable(this);
  }

  @observable submitable = true;
  @observable errorEnabled = false;

  destroy() {
    this.eventBus.unsubscribe(this.entityName);
  }

  protected subscribeEvent(event: string, listener: Listener) {
    this.eventBus.subscribe(event, listener, {
      subscriber: this.entityName,
    });
  }

  protected emitEvent(event: string, value?: any) {
    return this.eventBus.emit(event, value);
  }

  protected createSetter(field: string) {
    return action((value: any) => {
      (this as any)[field] = value;
    });
  }

  @action
  protected enableError() {
    if (!this.submitable) {
      this.errorEnabled = true;
      return true;
    }
  }

  protected createError(field: string, errors: FieldErrors[]) {
    return computed<string | undefined>(() => {
      const value = (this as any)[field];
      let activeError: FieldErrors | undefined = undefined;

      for (const error of errors) {
        if (error === FieldErrors.Requered) {
          if (!value || value === "") {
            activeError = error;
            break;
          }
        }
      }

      if (activeError === undefined) {
        this.submitable = true;
        return;
      }

      this.submitable = false;
      if (!this.errorEnabled) return;
      return ReadableFieldErrors[activeError];
    });
  }
}
