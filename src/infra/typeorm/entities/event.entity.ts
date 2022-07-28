import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { AddressEntity, AdminEntity } from '@/infra/typeorm/entities';
import { EventType } from '@/common/enums/eventType.enum';

@Entity('event')
export class EventEntity {
  @PrimaryGeneratedColumn('increment', { name: 'event_id' })
  eventId: number;

  @Column({ nullable: false })
  name: string;

  @Column({ enum: EventType })
  type: EventType;

  @Column({ nullable: false })
  price: number;

  @ManyToOne(() => AdminEntity, (admin: AdminEntity) => admin.event, {
    cascade: ['insert', 'update'],
    eager: true,
  })
  @JoinColumn({ name: 'created_by' })
  createdBy: AdminEntity;

  @OneToOne(() => AddressEntity, (address: AddressEntity) => address.event, {
    cascade: ['insert', 'update'],
    eager: false,
  })
  address: AddressEntity;
}
