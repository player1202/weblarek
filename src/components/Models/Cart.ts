import { IProduct } from "../../types";
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
        return this.items.some(item => item.id === String(productId)); 
    } 
} 