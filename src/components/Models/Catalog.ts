import { IProduct } from "../../types";
import { IEvents } from "../base/Events";
export class Catalog {
  events: IEvents;
  private products: IProduct[] = [];
  private selectedProduct: IProduct | null = null;
  constructor(events: IEvents) {
    this.events = events;
  }
  saveProducts(products: IProduct[]) {
    this.products = products;
  }

  getProducts(): IProduct[] {
    return this.products;
  }

  getProductById(id: string): IProduct | undefined {
    return this.products.find((product) => product.id === String(id));
  }

  setSelectedProduct(product: IProduct) {
    this.selectedProduct = product;
  }

  getSelectedProduct(): IProduct | null {
    return this.selectedProduct;
  }
}
