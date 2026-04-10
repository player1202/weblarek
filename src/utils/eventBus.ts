export class EventBus {
  private events: Map<string, Function[]> = new Map();

  emit(eventName: string, data?: any): void {
    const listeners = this.events.get(eventName);
    if (listeners) {
      listeners.forEach(listener => listener(data));
    }
  }

  on(eventName: string, listener: Function): void {
    if (!this.events.has(eventName)) {
      this.events.set(eventName, []);
    }
    this.events.get(eventName)!.push(listener);
  }
}

export const eventBus = new EventBus();
