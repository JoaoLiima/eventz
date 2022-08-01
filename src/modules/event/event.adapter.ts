import { EventEntity } from '@/infra/typeorm/entities';
import { Event } from '@/common/interfaces';

export function arrayEventAdapter(events: EventEntity[]): Event[] {
  return events.map((event) => {
    delete event.createdBy.user.credential;

    return event;
  });
}

export function eventAdapter(event: EventEntity): Event {
  delete event.createdBy.user.credential;

  return event;
}
