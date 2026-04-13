export type ApiPostMethods = "POST" | "PUT" | "DELETE";

export interface IApi {
  get<T extends object>(uri: string): Promise<T>;
  post<T extends object>(
    uri: string,
    data: object,
    method?: ApiPostMethods,
  ): Promise<T>;
}

export interface IProductsResponse {
  items: IProduct[];
  total: number;
}

export interface ICardActions {
  onClick: () => void;
}

export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}
export type PaymentType = "online" | "cash";

export interface IBuyer {
  payment: PaymentType | "";
  email: string;
  phone: string;
  address: string;
}

export type IOrderRequest = IBuyer & {
  items: string[];
  total: number;
};

export type IOrderResponse = {
  id: string;
  total: number;
};

export type ErrorMessage = Partial<Record<keyof IBuyer, string>>;