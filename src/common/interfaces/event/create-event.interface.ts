import { EventType } from '@/common/enums';
import { Admin, CreateAddress } from '@/common/interfaces';

export interface CreateEvent {
  name: string;
  type: EventType;
  price: number;
  createdBy: Admin;
  address: CreateAddress;
}
