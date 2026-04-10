import { IProduct } from "../../types";
import { IEvents } from "../base/Events";
export class Cart { 
    private items: IProduct[] = []; 
 
    addItem(product: IProduct) { 
        this.items.push(product); 
    } 
 
    removeItem(product: IProduct) { 
        this.items = this.items.filter(item => item.id !== product.id); 
    } 
 
    clearCart() { 
        this.items = []; 
    } 
 
    getTotalCost(): number { 
    return this.items.reduce((total, product) => total + (product.price ?? 0), 0); 
} 
 
 
    getItemCount(): number { 
        return this.items.length; 
    } 
 
    hasItem(productId: string): boolean { 
        return this.items.some(item => item.id === productId); 
    } 
} 

export class CartModel {
  private items: IProduct[] = [];
  private _events: IEvents;

  constructor(events: IEvents) {
    this._events = events;
  }

  addItem(product: IProduct): void {
    this.items.push(product);
    this._events.emit('cart:update', {
      action: 'add',
      productId: product.id,
      itemsCount: this.items.length
    });
  }

  removeItem(productId: string): void {
    const initialLength = this.items.length;
    this.items = this.items.filter(item => item.id !== productId);

    if (initialLength !== this.items.length) {
      this._events.emit('cart:update', {
        action: 'remove',
        productId,
        itemsCount: this.items.length
      });
    }
  }

  updateQuantity(productId: string, quantity: number): void {
    // логика обновления количества
    this._events.emit('cart:update', {
      action: 'quantity_change',
      productId,
      quantity,
      itemsCount: this.items.length
    });
  }
}
