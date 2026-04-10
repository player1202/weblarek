import { IBuyer } from "../../types";
import { ErrorMessage } from "../../types";
import { IEvents } from "../base/Events";
export class Customers {
  private data: IBuyer;
  constructor() {
    this.data = {
      payment: "",
      email: "",
      phone: "",
      address: "",
    };
  }

  saveData(field: keyof typeof this.data, value: string) {
    this.data[field] = value;
  }

  getAllData(): { [key: string]: string | null } {
    return { ...this.data };
  }

  resetData() {
    this.data = {
      payment: '',
      address: '',
      phone: '',
      email: '',
    };
  }

  validateData(): ErrorMessage {
        const errors: ErrorMessage = {};
        for (const [field, value] of Object.entries(this.data)) {
            if (!value) {
                errors[field as keyof IBuyer] = `Поле ${field} обязательно для заполнения`;
            }
        }
        return errors;
    }
}
export class CustomerModel {
  private name: string = '';
  private phone: string = '';
  private address: string = '';
  private _events: IEvents;

  constructor(events: IEvents) {
    this._events = events;
  }

  setName(name: string): void {
    this.name = name;
    this._events.emit('customer:data-change', { field: 'name', value: name });
  }

  setPhone(phone: string): void {
    this.phone = phone;
    this._events.emit('customer:data-change', { field: 'phone', value: phone });
  }

  setAddress(address: string): void {
    this.address = address;
    this._events.emit('customer:data-change', { field: 'address', value: address });
  }
}
