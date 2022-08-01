import { Entity, PrimaryColumn } from 'typeorm';

@Entity('costumer_event')
export class CostumerEventEntity {
  @PrimaryColumn({ name: 'event_id' })
  eventId: number;

  @PrimaryColumn({ name: 'costumer_id' })
  costumerId: number;
}
