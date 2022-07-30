import { EventType } from '@/common/enums';
import { Admin } from '@/common/interfaces';

export interface Event {
  eventId: number;
  name: string;
  type: EventType;
  price: number;
  createdBy: Admin;
}
