import { EventBus, EventData, Listener } from "@/event_bus/EventBus";
import { createContext } from "react";
import { Event } from "@/event_bus/EventBus";

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
    protected name: string,
  ) {}

  destroy() {
    this.eventBus.unsubscribe(this.name);
  }

  protected subscribeEvent(event: Event, listener: Listener) {
    this.eventBus.subscribe(event, listener, {
      subscriber: this.name,
    });
  }

  protected emitEvent(event: Event, value?: EventData) {
    return this.eventBus.emit(event, value);
  }
}
