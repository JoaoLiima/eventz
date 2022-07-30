export interface UpdateAddress {
  addressId: number;
  zipCode: string;
  city: string;
  neighborhood: string;
  street: string;
  number: number;
  complement?: string;
}
