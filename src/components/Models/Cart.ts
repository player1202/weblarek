import { IEvents } from "../base/Events";
import { IProduct } from "../../types";

export class Cart {
    protected items: IProduct[];
    protected events: IEvents;

    constructor(events: IEvents) {
        this.items = [];
        this.events = events;
    }

    addItem(product: IProduct): void {
        this.items.push(product);
        this.events.emit('basket:change'); // Генерируем событие
    }

    removeItem(product: IProduct): void {
        this.items = this.items.filter(item => item.id !== product.id);
        this.events.emit('basket:change'); // Генерируем событие
    }

    getItemCount(): number {
        return this.items.length;
    }

    getTotalCost(): number {
        return this.items.reduce((sum, item) => sum + (item.price || 0), 0);
    }

    hasItem(id: string): boolean {
        return this.items.some(item => item.id === id);
    }

    getProductsToBuy(): IProduct[] {
        return [...this.items];
    }

    clearCart(): void {
        this.items = [];
        this.events.emit('basket:change'); // Генерируем событие
        this.events.emit('basket:clear');  // Дополнительное событие для очистки
    }
}