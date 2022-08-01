import { Event } from './event.interface';

export interface PaginatedEvent {
  data: Event[];
  total: number;
}
