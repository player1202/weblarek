import { IProduct } from "../../types";
import { IEvents } from "../base/Events";
export class Cart {
  events: IEvents;
  private items: IProduct[] = [];

  addItem(product: IProduct) {
    this.items.push(product);
  }
  getProductsToBuy(): IProduct[] {
    return this.items;
  }
  constructor(events: IEvents) {
    this.items = [];
    this.events = events;
  }

  removeItem(product: IProduct) {
    this.items = this.items.filter((item) => item.id !== product.id);
  }

  clearCart() {
    this.items = [];
  }

  getTotalCost(): number {
    return this.items.reduce(
      (total, product) => total + (product.price ?? 0),
      0,
    );
  }

  getItemCount(): number {
    return this.items.length;
  }

  hasItem(productId: string): boolean {
    return this.items.some((item) => item.id === productId);
  }
}
