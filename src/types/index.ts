export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    get<T>(uri: string): Promise<{ data: T }>;
    post<T>(uri: string, data: object, method?: ApiPostMethods): Promise<{ data: T }>;
}
export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
} 
export interface IOrderResponse {
  orderId: string;
  totalAmount: number;
}
export interface IBuyer {
  payment: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
}
export type ErrorMessage = Partial<Record<keyof IBuyer, string>>;
