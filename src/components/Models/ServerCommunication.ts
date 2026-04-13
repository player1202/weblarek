import { IApi } from "../../types";
import { IOrderResponse } from "../../types";
import { IProductsResponse } from "../../types";
import { IOrderRequest } from "../../types";

export class ServerCommunication {
  api: IApi;

  constructor(api: IApi) {
    this.api = api;
  }

  async getItems(): Promise<IProductsResponse> {
    const response = await this.api.get<IProductsResponse>("/product");
    return response;
  }

  placeOrder(orderData: IOrderRequest): Promise<IOrderResponse> {
    return this.api.post<IOrderResponse>("/order", orderData);
  }
}