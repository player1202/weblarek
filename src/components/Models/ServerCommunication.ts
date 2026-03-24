import { IApi } from "../../types";
import { IOrderResponse } from "../../types";
import { IProduct } from "../../types";

export class ServerCommunication {
  private api: IApi;

  constructor(api: IApi) {
    this.api = api;
  }

  async getProducts(): Promise<IProduct[]> {
    const response = await this.api.get("/product/");
    return response.data as IProduct[];
  }

  async placeOrder(data: any): Promise<IOrderResponse> {
    const response = await this.api.post("/order/", data);
    return response.data as IOrderResponse;
  }
}
