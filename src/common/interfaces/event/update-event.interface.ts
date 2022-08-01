import { EventType } from '@/common/enums';
import { Address } from '@/common/interfaces';

export interface UpdateEvent {
  eventId: number;
  name: string;
  type: EventType;
  price: number;
  address: Address;
}
