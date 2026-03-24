import { IBuyer } from "../../types";
import { ErrorMessage } from "../../types";
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