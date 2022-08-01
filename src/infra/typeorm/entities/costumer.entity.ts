import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  AddressEntity,
  EventEntity,
  UserEntity,
  WalletEntity,
} from '@/infra/typeorm/entities';

@Entity('costumer')
export class CostumerEntity {
  @PrimaryGeneratedColumn('increment', { name: 'costumer_id' })
  costumerId: number;

  @Column({ nullable: false })
  cpf: string;

  @OneToOne(() => WalletEntity, (wallet: WalletEntity) => wallet.costumer, {
    cascade: ['insert', 'update'],
    eager: false,
  })
  wallet: WalletEntity;

  @OneToOne(() => UserEntity, (user: UserEntity) => user.costumer, {
    cascade: ['insert', 'update'],
    eager: false,
  })
  @JoinColumn({
    name: 'user_id',
  })
  user: UserEntity;

  @ManyToMany(() => EventEntity, (event: EventEntity) => event.costumers, {
    cascade: ['insert', 'update'],
    eager: false,
  })
  @JoinTable({
    name: 'costumer_event',
    joinColumn: {
      name: 'costumer_id',
      referencedColumnName: 'costumerId',
    },
    inverseJoinColumn: {
      name: 'event_id',
      referencedColumnName: 'eventId',
    },
  })
  events: EventEntity[];

  @OneToOne(() => AddressEntity, (address: AddressEntity) => address.costumer)
  address?: AddressEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
