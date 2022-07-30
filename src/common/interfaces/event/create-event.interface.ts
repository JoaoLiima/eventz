import { EventType } from '@/common/enums';
import { Admin, Address } from '@/common/interfaces';

export interface CreateEvent {
  eventId: number;
  name: string;
  type: EventType;
  price: number;
  createdBy: Admin;
  address: Address;
}
