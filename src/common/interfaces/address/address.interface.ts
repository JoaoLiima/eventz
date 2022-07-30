import { User, Event } from '@/common/interfaces';

export interface Address {
  addressId: number;
  user?: User;
  event?: Event;
  zipCode: string;
  city: string;
  neighborhood: string;
  street: string;
  number: number;
  complement?: string;
  createdAt: Date;
  updatedAt: Date;
}
