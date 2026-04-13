import { IEvents } from "../base/Events";
import { IProduct } from "../../types";

export class Catalog {
    protected products: IProduct[];
    protected selectedProduct: IProduct | null;
    protected events: IEvents;

    constructor(events: IEvents) {
        this.products = [];
        this.selectedProduct = null;
        this.events = events;
    }

    saveProducts(products: IProduct[]): void {
        this.products = products;
        this.events.emit('catalog:setProducts', this.products);
    }

    getProducts(): IProduct[] {
        return this.products;
    }

    getProductById(id: string): IProduct | undefined {
        return this.products.find(product => product.id === id);
    }

    setSelectedProduct(product: IProduct): void {
        this.selectedProduct = product;
        this.events.emit('catalog:setSelectedProduct', product);
    }

    getSelectedProduct(): IProduct | null {
        return this.selectedProduct;
    }
}