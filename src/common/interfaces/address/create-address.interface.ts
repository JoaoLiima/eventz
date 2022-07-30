import { Costumer, Event } from '@/common/interfaces';

export interface CreateAddress {
  costumer?: Costumer;
  event?: Event;
  zipCode: string;
  city: string;
  neighborhood: string;
  street: string;
  number: number;
  complement?: string;
}
