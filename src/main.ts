import "./scss/styles.scss";
import { Cart } from "./components/Models/Cart";
import { IProduct } from "./types";
import { Customers } from "./components/Models/Customers";
import { Catalog } from "./components/Models/Catalog";
import { ServerCommunication } from "./components/Models/ServerCommunication";
import { Api } from "./components/base/Api";
import { API_URL } from "./utils/constants";
// Создаём несколько товаров
const product1: IProduct = {
  id: "1",
  title: "Продукт 1",
  description: "Описание продукта 1",
  image: "url_to_image_1",
  category: "Категория 1",
  price: 100,
};
const product2: IProduct = {
  id: "2",
  title: "Продукт 2",
  description: "Описание продукта 2",
  image: "url_to_image_2",
  category: "Категория 2",
  price: 200,
};

// Проверяем cart
const cart = new Cart();

// Добавляем товары в корзину
cart.addItem(product1);
cart.addItem(product2);
console.log("Количество товаров в корзине:", cart.getItemCount()); // Должно быть 2
console.log("Общая стоимость товаров:", cart.getTotalCost()); // Должно быть 300
// Проверяем наличие товара
console.log("Есть ли продукт 1 в корзине?", cart.hasItem("1")); // Должно быть true
// Удаляем товар из корзины
cart.removeItem(product1);
console.log("Количество товаров после удаления:", cart.getItemCount()); // Должно быть 1

// Проверяем customers
const customer = new Customers();

// Сохраняем данные
customer.saveData("payment", "наличная");
customer.saveData("email", "example@example.com");
customer.saveData("phone", "+7-123-456-78-90");
customer.saveData("address", "г. Пример, ул. Примерная, д. 1");

console.log("Все данные покупателя:", customer.getAllData());

// Проверяем валидацию
console.log("Валидация данных:", customer.validateData()); // Должны быть пустые ошибки

// Сброс данных
customer.resetData();
console.log("Данные после сброса:", customer.getAllData()); // Все поля должны быть пустыми

// Проверяем Catalog
const catalog = new Catalog();

// Сохраняем список товаров в каталог
catalog.saveProducts([product1, product2]);

console.log("Список товаров:", catalog.getProducts()); // Должны быть product1 и product2

// Проверяем получение товара по идентификатору
console.log("Товар с ID 1:", catalog.getProductById("1")); // Должен быть product1

// Устанавливаем выбранный товар и проверяем его получение
catalog.setSelectedProduct(product1);
console.log("Выбранный товар:", catalog.getSelectedProduct()); // Должен быть product1

const api = new Api(API_URL);

const serverCommunication = new ServerCommunication(api);

(async () => {
  try {
    const products = await serverCommunication.getProducts();
    console.log("Список товаров:", products);
  } catch (error) {
    console.error("Ошибка при получении товаров:", error);
  }
})(); 
