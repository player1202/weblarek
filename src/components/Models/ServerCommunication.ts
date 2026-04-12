import { IApi } from "../../types";
import { IOrderResponse } from "../../types";
import { IProductFromApi } from "../../types";
import { IOrderRequest } from "../../types";

export class ServerCommunication {
  api: IApi;

  constructor(api: IApi) {
    this.api = api;
  }

  async getItems(): Promise<any> {
    try {
      console.log("Запрос к API:", (this.api as any).baseUrl + "/product");
      const response = await this.api.get("/product");
      console.log("Ответ получен");
      return response;
    } catch (error) {
      console.error("Ошибка в getItems:", error);
      throw error;
    }
  }

  placeOrder(orderData: IOrderRequest): Promise<IOrderResponse> {
    return this.api.post("/order", orderData);
  }
}