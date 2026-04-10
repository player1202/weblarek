import "./scss/styles.scss";
import { Cart } from "./components/Models/Cart";
import { IProduct } from "./types";
import { Customers } from "./components/Models/Customers";
import { Catalog } from "./components/Models/Catalog";
import { ServerCommunication } from "./components/Models/ServerCommunication";
import { Api } from "./components/base/Api";
import { API_URL } from "./utils/constants";
import { BasketCardView } from "./components/View/BasketCardView";
import { ModalWindow } from "./components/View/ModalView";
import { ProductPreview } from "./components/View/PreviewCardView";
import { ConcreteProductCard } from "./components/View/BaseProductCardView";
import { EventEmitter, IEvents } from "./components/base/Events";
import { ICardActions } from "./types";
import { ProductInGallery } from "./components/View/ProductInGallery";
import { BasketModal } from "./components/View/basketModal";
import { OrderFormView } from "./components/View/OrderFormView";
import { Header } from "./components/View/header";
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
//BaseProductCardView
const cardTemplate = document.querySelector(
  "#card-template",
) as HTMLTemplateElement;

// Импортируем фрагмент
const fragment = document.importNode(cardTemplate.content, true);

// Создаём обёртку — теперь у нас HTMLElement
const cardInstance = document.createElement("div");
cardInstance.appendChild(fragment);

// Теперь можно создать карточку
const productCard = new ConcreteProductCard(cardInstance);

productCard.title = "Пример товара";
productCard.price = 150;

const container = document.querySelector(".products-container") as HTMLElement;
container.appendChild(cardInstance);
//BasketCardView
const basketCardTemplate = document.querySelector(
  "#basket-card-template",
) as HTMLTemplateElement;

const Basketfragment = document.importNode(basketCardTemplate.content, true);

const BasketCardInstance = document.createElement("div");
BasketCardInstance.appendChild(Basketfragment);

const basketCard = new BasketCardView(cardInstance);
basketCard.index = 1;

const BasketContainer = document.querySelector(
  ".basket-container",
) as HTMLElement;

BasketContainer.appendChild(cardInstance);
//PreviewCardView
const events = new EventEmitter();

const productTemplate = document.querySelector(
  "#product-preview-template",
) as HTMLTemplateElement;

const PreviewFragment = document.importNode(productTemplate.content, true);
const PreviewCardInstance = document.createElement("div");
PreviewCardInstance.appendChild(PreviewFragment);

const PreviewProductCard = new ProductPreview(PreviewCardInstance, events);

const PreviewContainer = document.querySelector(
  ".products-container",
) as HTMLElement;
PreviewContainer.appendChild(PreviewCardInstance);

events.on("product:choose", () => {
  console.log("Продукт выбран!");
});

//ProductInGallery

// 2. Получаем HTML‑шаблон карточки из DOM
const galleryTemplate = document.querySelector(
  "#gallery-card-template",
) as HTMLTemplateElement;

const GalleryFragment = document.importNode(galleryTemplate.content, true);
const GalleryCardInstance = document.createElement("div");
GalleryCardInstance.appendChild(GalleryFragment);

const actions: ICardActions = {
  onClick: () => {
    console.log("Карточка галереи нажата!");
  },
};

const galleryCard = new ProductInGallery(GalleryCardInstance, actions);

const GalleryContainer = document.querySelector(
  ".gallery-container",
) as HTMLElement;
GalleryContainer.appendChild(GalleryCardInstance);

//BasketModal
const ModalEvents = new EventEmitter();

const basketModalTemplate = document.querySelector('#basket-modal-template') as HTMLTemplateElement;

const ModalFragment = document.importNode(basketModalTemplate.content, true);
const modalInstance = document.createElement('div');
modalInstance.appendChild(ModalFragment);

const basketModal = new BasketModal(modalInstance, ModalEvents);

const ModalContainer = document.querySelector('.modal-container') as HTMLElement;
ModalContainer.appendChild(modalInstance);

ModalEvents.on('busket:submit', () => {
  console.log('Корзина отправлена!');
});

const productCard1 = document.createElement('div');
productCard1.textContent = 'Товар 1';
const productCard2 = document.createElement('div');
productCard2.textContent = 'Товар 2';

basketModal.item = [productCard1, productCard2];

basketModal.totalPrice = 150; 

//header
const HeaderEvents = new EventEmitter();

const headerTemplate = document.querySelector('#header-template') as HTMLTemplateElement;

const HeaderFragment = document.importNode(headerTemplate.content, true);
const headerInstance = document.createElement('div');
headerInstance.appendChild(HeaderFragment);

const header = new Header(headerInstance, HeaderEvents);

const HeaderContainer = document.querySelector('.header-container') as HTMLElement;
HeaderContainer.appendChild(headerInstance);

HeaderEvents.on('basket:open', () => {
  console.log('Корзина открывается!');
});

header.counter = 3; // устанавливаем значение счётчика товаров в корзине

//ModalView
const ModalViewEvents = new EventEmitter();

const modalTemplate = document.querySelector('#modal-template') as HTMLTemplateElement;

const ModalViewFragment = document.importNode(modalTemplate.content, true);
const ViewModalInstance = document.createElement('div');
ViewModalInstance.appendChild(ModalViewFragment);

const modalWindow = new ModalWindow(ViewModalInstance, ModalViewEvents);

const ModalViewContainer = document.querySelector('.modal-container') as HTMLElement;
ModalViewContainer.appendChild(ViewModalInstance);

ModalViewEvents.on('modal:close', () => {
  console.log('Модальное окно закрывается!');
  modalWindow.close();
});

//OrderFormView
const orderEvents = new EventEmitter();

//  Получаем HTML‑шаблон формы из DOM
const orderTemplate = document.querySelector('#order-success-template') as HTMLTemplateElement;

//  Преобразуем шаблон в DOM‑фрагмент
const OrderFragment = document.importNode(orderTemplate.content, true);

//  Создаём обёртку — контейнер для фрагмента
const orderInstance = document.createElement('div');
orderInstance.appendChild(OrderFragment);

// Инициализируем компонент OrderFormView
const orderForm = new OrderFormView(orderInstance, orderEvents);

//  Находим контейнер в DOM, куда добавим форму
const orderContainer = document.querySelector('.modal-container') as HTMLElement; 
orderContainer.appendChild(orderInstance);

//  Подписываемся на событие закрытия формы
orderEvents.on('orderSucces:close', () => {
  console.log('Форма успешного заказа закрывается!');
  
});

//  Устанавливаем сумму, которая будет отображена в форме
const totalOrderSum = 1500; 
orderForm.totalSum = totalOrderSum;

 


 
