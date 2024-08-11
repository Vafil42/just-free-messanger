export type Listener = (value: any) => void | any | Promise<void | any>;

interface SubsriptionOptions {
  disposable?: boolean;
  subscriber?: string;
}

interface Subsription {
  listener: Listener;
  options?: SubsriptionOptions;
}

export class EventBus {
  private subsriptions: Map<string, Subsription[]> = new Map();

  constructor() {}

  subscribe(event: string, listener: Listener, options?: SubsriptionOptions) {
    if (!this.subsriptions.has(event)) {
      this.subsriptions.set(event, []);
    }

    this.subsriptions.get(event)?.push({ listener, options });
  }

  emit(event: string, value?: any) {
    if (!this.subsriptions.has(event)) {
      return;
    }

    const subsriptions = this.subsriptions.get(event);

    if (!subsriptions || !subsriptions.length) return;

    for (const subscription of subsriptions) {
      const result = subscription.listener(value);

      if (!subscription.options) {
        if (result) return result;

        continue;
      }

      if (subscription.options.disposable) this.remove(event, subscription);

      if (result) return result;
    }
  }

  remove(event: string, subscription: Subsription) {
    if (!this.subsriptions.has(event)) {
      return;
    }

    const subsriptions = this.subsriptions.get(event);
    const subscriptionIndex = subsriptions?.indexOf(subscription);

    if (!subsriptions || !subscriptionIndex) return;

    subsriptions.splice(subscriptionIndex, 1);
  }

  unsubscribe(subscriber: string) {
    for (const event of this.subsriptions.keys()) {
      const subsriptions = this.subsriptions
        .get(event)
        ?.filter((value) => value.options?.subscriber === subscriber);

      if (!subsriptions || !subsriptions.length) continue;

      for (const subscription of subsriptions) {
        this.remove(event, subscription);
      }
    }
  }
}
