import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  AddressEntity,
  UserEntity,
  WalletEntity,
} from '@/infra/typeorm/entities';

@Entity('costumer')
export class CostumerEntity {
  @PrimaryGeneratedColumn('increment', { name: 'costumer_id' })
  costumerId: string;

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

  @OneToOne(() => AddressEntity, (address: AddressEntity) => address.costumer)
  address?: AddressEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
