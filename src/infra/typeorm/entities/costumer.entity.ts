import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity, WalletEntity } from '@/infra/typeorm/entities';

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
  @JoinColumn({
    name: 'wallet_id',
  })
  wallet: WalletEntity;

  @OneToOne(() => UserEntity, (user: UserEntity) => user.address, {
    cascade: ['insert', 'update'],
    eager: false,
  })
  @JoinColumn({
    name: 'user_id',
  })
  user: UserEntity;
}
