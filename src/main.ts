import "./scss/styles.scss";
import { Cart } from "./components/Models/Cart";
import { IProduct } from "./types";
import { Customers } from "./components/Models/Customers";
import { Catalog } from "./components/Models/Catalog";
import { ServerCommunication } from "./components/Models/ServerCommunication";
import { Api } from "./components/base/Api";
import { API_URL } from "./utils/constants";
import { Header } from "./components/View/header";
import { Gallery } from "./components/View/gallery.ts";
import { ModalWindow } from "./components/View/modalWindow.ts";
import { OrderSuccess } from "./components/View/orderSuccess.ts";
import { BasketModal } from "./components/View/basketModal";
import { ProductInBasket } from "./components/View/ProductCards/productInBasket";
import { ProductInGallery } from "./components/View/ProductCards/productInGallery";
import { ProductPreview } from "./components/View/ProductCards/productPreview";
import { EmailPhoneForm } from "./components/View/form/emailPhoneForm";
import { PaymentAddressForm } from "./components/View/form/paymentAddressForm";
import { EventEmitter } from "./components/base/Events.ts";
import { ensureElement, cloneTemplate } from "./utils/utils.ts";
import { IOrderRequest, IOrderResponse } from "./types/index.ts";

const events = new EventEmitter();

const productsModel = new Catalog(events);
const productsToBuyModel = new Cart(events);
const buyerInfoModel = new Customers(events);
const apiModel = new ServerCommunication(new Api(API_URL));

const headerModel = new Header(ensureElement(".header"), events);
const galleryModel = new Gallery(ensureElement(".page__wrapper"), events);
const modalWindowModel = new ModalWindow(ensureElement(".modal"), events);
const basketModalModel = new BasketModal(
  cloneTemplate<HTMLElement>("#basket"),
  events,
);
const paymentAddressFormModel = new PaymentAddressForm(
  cloneTemplate<HTMLElement>("#order"),
  events,
);
const emailPhoneFormModel = new EmailPhoneForm(
  cloneTemplate<HTMLElement>("#contacts"),
  events,
);
const orderSuccessModel = new OrderSuccess(
  cloneTemplate<HTMLElement>("#success"),
  events,
);
const previewCard = new ProductPreview(
  cloneTemplate<HTMLElement>("#card-preview"),
  events,
);

events.on("catalog:setProducts", () => {
  const products = productsModel.getProducts();

  const cards = products.map((product) => {
    const card = new ProductInGallery(
      cloneTemplate<HTMLTemplateElement>("#card-catalog"),
      {
        onClick: () => events.emit("product:select", product),
      },
    );
    return card.render(product);
  });
  galleryModel.gallery = cards;
});

events.on("basket:open", () => {
  basketModalModel.registerButtonDisabled =
    productsToBuyModel.getItemCount() === 0;
  modalWindowModel.content = basketModalModel.render();
});

events.on("product:select", (product: IProduct) => {
  productsModel.setSelectedProduct(product);
});

events.on("catalog:setSelectedProduct", () => {
  const productSelected = productsModel.getSelectedProduct();
  if (!productSelected) return;
  const isInBusket = productsToBuyModel.hasItem(productSelected.id);
  previewCard.buttonText = isInBusket ? "Удалить из корзины" : "Купить";
  if (productSelected.price === null) {
    previewCard.buttonText = "Недоступно";
    previewCard.buttonProhibited(true);
  } else {
    previewCard.buttonProhibited(false);
  }
  modalWindowModel.content = previewCard.render(productSelected);
});

events.on("product:choose", () => {
  const productToBuy = productsModel.getSelectedProduct();
  if (!productToBuy) return;
  const isInBusket = productsToBuyModel.hasItem(productToBuy.id);
  if (isInBusket) {
    productsToBuyModel.removeItem(productToBuy);
  } else {
    productsToBuyModel.addItem(productToBuy);
  }
  modalWindowModel.close();
});

events.on("product:delete", (product: IProduct) => {
  const productToDelete = productsModel.getProductById(product.id);
  if (!productToDelete) return;
  productsToBuyModel.removeItem(productToDelete);
});

events.on("basket:change", () => {
  const products = productsToBuyModel.getProductsToBuy();

  const arrProducts = products.map((product, index) => {
    const productToBuy = productsModel.getProductById(product.id);
    const basketCard = new ProductInBasket(
      cloneTemplate<HTMLElement>("#card-basket"),
      {
        onClick: () => events.emit("product:delete", product),
      },
    );
    basketCard.index = index + 1;
    return basketCard.render(productToBuy);
  });

  const itemCount = productsToBuyModel.getItemCount();

  headerModel.counter = itemCount;
  basketModalModel.totalPrice = productsToBuyModel.getTotalCost();
  basketModalModel.items = arrProducts;
  basketModalModel.registerButtonDisabled = itemCount === 0;
});

events.on("basket:submit", () => {
  modalWindowModel.content = paymentAddressFormModel.render();
});

events.on("payment:online", () => {
  buyerInfoModel.setPayment("online");
});

events.on("payment:cash", () => {
  buyerInfoModel.setPayment("cash");
});

events.on("buyer:changePayment", () => {
  const paymentWay = buyerInfoModel.getAllData();
  paymentAddressFormModel.payment = paymentWay.payment;
  const errors = buyerInfoModel.validateData();
  let validate: string = "";
  if (errors.payment && errors.address) {
    validate = `${errors.address}; ${errors.payment}`;
  } else if (errors.address) {
    validate = `${errors.address}`;
  } else if (errors.payment) {
    validate = `${errors.payment}`;
  }
  paymentAddressFormModel.errors = validate;
  if (!errors.payment && !errors.address) {
    paymentAddressFormModel.isallowedButton(false);
  } else {
    paymentAddressFormModel.isallowedButton(true);
  }
});

events.on("address:input", (data: { value: string }) => {
  buyerInfoModel.setAddress(data.value);
});

events.on("buyer:changeAddress", () => {
  const address = buyerInfoModel.getAllData().address;
  paymentAddressFormModel.address = address;
  const errors = buyerInfoModel.validateData();
  let validate: string = "";
  if (errors.payment && errors.address) {
    validate = `${errors.address}; ${errors.payment}`;
  } else if (errors.address) {
    validate = `${errors.address}`;
  } else if (errors.payment) {
    validate = `${errors.payment}`;
  }
  paymentAddressFormModel.errors = validate;
  if (!errors.payment && !errors.address) {
    paymentAddressFormModel.isallowedButton(false);
  } else {
    paymentAddressFormModel.isallowedButton(true);
  }
});

events.on("order:submit", () => {
  modalWindowModel.content = emailPhoneFormModel.render();
});

events.on("email:input", (data: { value: string }) => {
  buyerInfoModel.setEmail(data.value);
});

events.on("buyer:changeEmail", () => {
  const email = buyerInfoModel.getAllData().email;
  emailPhoneFormModel.email = email;
  const errors = buyerInfoModel.validateData();
  let validate: string = "";
  if (errors.phone && errors.email) {
    validate = `${errors.email}; ${errors.phone}`;
  } else if (errors.phone) {
    validate = `${errors.phone}`;
  } else if (errors.email) {
    validate = `${errors.email}`;
  }
  emailPhoneFormModel.errors = validate;
  if (!errors.phone && !errors.email) {
    emailPhoneFormModel.isallowedButton(false);
  } else {
    emailPhoneFormModel.isallowedButton(true);
  }
});

events.on("phone:input", (data: { value: string }) => {
  buyerInfoModel.setPhone(data.value);
});

events.on("buyer:changePhone", () => {
  const phone = buyerInfoModel.getAllData().phone;
  emailPhoneFormModel.phone = phone;
  const errors = buyerInfoModel.validateData();
  let validate: string = "";
  if (errors.phone && errors.email) {
    validate = `${errors.email}; ${errors.phone}`;
  } else if (errors.phone) {
    validate = `${errors.phone}`;
  } else if (errors.email) {
    validate = `${errors.email}`;
  }
  emailPhoneFormModel.errors = validate;
  if (!errors.phone && !errors.email) {
    emailPhoneFormModel.isallowedButton(false);
  } else {
    emailPhoneFormModel.isallowedButton(true);
  }
});

events.on("contacts:submit", async () => {
  const buyerInfo = buyerInfoModel.getAllData();
  const sum = productsToBuyModel.getTotalCost();
  const products = productsToBuyModel.getProductsToBuy();
  const ids = products.map((elem) => elem.id);
  const orderRequest: IOrderRequest = {
    payment: buyerInfo.payment,
    email: buyerInfo.email,
    address: buyerInfo.address,
    phone: buyerInfo.phone,
    total: sum,
    items: ids,
  };
  try {
    const response = await apiModel.placeOrder(orderRequest);
    // Убрали событие api:successPost, вызываем методы напрямую
    productsToBuyModel.clearCart();
    buyerInfoModel.resetData();
    orderSuccessModel.totalSum = response.total;
    modalWindowModel.content = orderSuccessModel.render();
  } catch (error) {
    console.error("Ошибка при оформлении заказа:", error);
  }
});

events.on("buyer:clear", () => {
  paymentAddressFormModel.payment = "";
  paymentAddressFormModel.address = "";
  paymentAddressFormModel.isallowedButton(true);
  emailPhoneFormModel.email = "";
  emailPhoneFormModel.phone = "";
  emailPhoneFormModel.isallowedButton(true);
});

events.on("orderSucces:close", () => {
  modalWindowModel.close();
});

events.on("modal:close", () => {
  modalWindowModel.close();
});

async function fetchCatalog() {
  try {
    const response = await apiModel.getItems();
    console.log("Товары загружены:", response.items.length);
    productsModel.saveProducts(response.items);
  } catch (error) {
    console.error("Ошибка при получении товаров:", error);
  }
}

fetchCatalog().catch(console.error);