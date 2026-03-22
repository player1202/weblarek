import { IBuyer } from "../../types";
import { ErrorItem } from "../../types";
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
    this.data = { payment: null, address: null, phone: null, email: null };
  }

validateData(): Partial<Record<keyof IBuyer, string>> {
    const errors: Partial<Record<keyof IBuyer, string>> = {};
    for (const [field, value] of Object.entries(this.data)) {
        if (!value) {
            errors[field as keyof IBuyer] = `Field ${field} is required`;
        }
    }
    return errors;
}
}
