import './scss/styles.scss';
import { Catalog } from './components/Models/Catalog';
import { Cart } from './components/Models/Cart';
import { Customers } from './components/Models/Customers';
import { apiProducts } from './utils/data';

const catalog = new Catalog();
catalog.saveProducts(apiProducts.items);
console.log('Массив товаров из каталога:', catalog.getProducts());
const cart = new Cart();
console.log('Количество товаров в коризине:',cart.getItemCount());
const customer = new Customers();
customer.saveData('address', ' ул. Примерная, д. 1');
console.log('Данные покупателя:', customer.getAllData());
