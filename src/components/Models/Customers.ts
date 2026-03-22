export interface IBuyer {
  payment: string;
  email: string;
  phone: string;
  address: string;
}
export class Customers {
    private data:IBuyer;

    constructor() {
        this.data = {
            payment: null,
            email: null,
            phone: null,
            address: null
        };
    }

    saveData(field: keyof typeof this.data, value: string) {
        this.data[field] = value;
    }

    getAllData(): { [key: string]: string | null } {
        return { ...this.data };
    }

    resetData() {
        this.data = { paymentMethod: null, address: null, phone: null, email: null };
    }

    validateData(): { field: string; error: string }[] {
        const errors: { field: string; error: string }[] = [];
        for (const [field, value] of Object.entries(this.data)) {
            if (!value) {
                errors.push({ field, error: `Field ${field} is required` });
            }
        }
        return errors;
    }
}
 
