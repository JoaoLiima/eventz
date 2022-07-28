import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity, EventEntity } from '@/infra/typeorm/entities';

@Entity('address')
export class AddressEntity {
  @PrimaryGeneratedColumn('increment', { name: 'address_id' })
  addressId: number;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.address, {
    cascade: ['insert', 'update'],
    eager: false,
  })
  @JoinColumn({
    name: 'user_id',
  })
  user?: UserEntity;

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
  number: string;

  @Column({ nullable: true })
  complement?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
