import { IProduct } from "../../types";
import { IEvents } from "../base/Events";
export class Catalog  { 
    private products: IProduct[] = []; 
    private selectedProduct: IProduct | null = null; 
 
    saveProducts(products: IProduct[]) { 
        this.products = products; 
    } 
 
    getProducts(): IProduct[] { 
        return this.products; 
    } 
 
    getProductById(id: string): IProduct | undefined { 
        return this.products.find(product => product.id === String(id)); 
    } 
 
    setSelectedProduct(product: IProduct) { 
        this.selectedProduct = product; 
    } 
 
    getSelectedProduct(): IProduct | null { 
        return this.selectedProduct; 
    } 
} 
export class CatalogModel {
  private products: IProduct[] = [];
  private _events: IEvents;

  constructor(events: IEvents) {
    this._events = events;
  }

  loadProducts(newProducts: IProduct[]): void {
    this.products = newProducts;
    this._events.emit('catalog:products-loaded', { products: this.products });
  }
}

