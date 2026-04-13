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
    try {
      console.log("Запрос к API:", (this.api as any).baseUrl + "/product");
      const response = await this.api.get("/product");
      console.log("Ответ получен:", response);
      
    
      if (!response || typeof response !== 'object') {
        throw new Error("Неверный формат ответа от API");
      }
      
    
      return response as IProductsResponse;
    } catch (error) {
      console.error("Ошибка в getItems:", error);
      throw error;
    }
  }

  placeOrder(orderData: IOrderRequest): Promise<IOrderResponse> {
    return this.api.post("/order", orderData);
  }
}