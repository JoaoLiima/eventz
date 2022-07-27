import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { CostumerEntity, CreditCardEntity } from '@/infra/typeorm/entities';

@Entity('wallet')
export class WalletEntity {
  @PrimaryGeneratedColumn('increment', { name: 'wallet_id' })
  walletId: number;

  @Column({ nullable: false, default: 0 })
  balance: number;

  @OneToMany(
    () => CreditCardEntity,
    (creditCard: CreditCardEntity) => creditCard.wallet,
    {
      eager: true,
    },
  )
  creditCard: CreditCardEntity;

  @OneToOne(
    () => CostumerEntity,
    (costumer: CostumerEntity) => costumer.wallet,
    {
      cascade: ['insert', 'update'],
      eager: false,
    },
  )
  @JoinColumn({
    name: 'costumer_id',
  })
  costumer: CostumerEntity;
}
