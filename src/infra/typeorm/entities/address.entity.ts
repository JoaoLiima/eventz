import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EventEntity, CostumerEntity } from '@/infra/typeorm/entities';

@Entity('address')
export class AddressEntity {
  @PrimaryGeneratedColumn('increment', { name: 'address_id' })
  addressId: number;

  @OneToOne(
    () => CostumerEntity,
    (costumer: CostumerEntity) => costumer.address,
    {
      cascade: ['insert', 'update'],
      eager: true,
    },
  )
  @JoinColumn({
    name: 'costumer_id',
  })
  costumer?: CostumerEntity;

  @OneToOne(() => EventEntity, (event: EventEntity) => event.address, {
    cascade: ['insert', 'update'],
    eager: false,
  })
  @JoinColumn({
    name: 'event_id',
  })
  event?: EventEntity;

  @Column({ name: 'zip_code' })
  zipCode: string;

  @Column()
  city: string;

  @Column()
  neighborhood: string;

  @Column()
  street: string;

  @Column()
  number: number;

  @Column({ nullable: true })
  complement?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
