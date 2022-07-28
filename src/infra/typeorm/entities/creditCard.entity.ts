import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CardTypes } from '@/common/enums/cardTypes.enum';
import { WalletEntity } from '@/infra/typeorm/entities';

@Entity('creditCard')
export class CreditCardEntity {
  @PrimaryGeneratedColumn('increment', { name: 'credit_card_id' })
  creditCardId: number;

  @Column({ name: 'security_number', nullable: false })
  securityNumber: number;

  @Column({ name: 'card_number', nullable: false })
  cardNumber: number;

  @Column({ nullable: false })
  expiration: string;

  @Column({ enum: CardTypes })
  type: CardTypes;

  @Column()
  nickname: string;

  @ManyToOne(() => WalletEntity, (wallet: WalletEntity) => wallet.creditCard, {
    cascade: ['insert', 'update'],
    eager: false,
  })
  @JoinColumn({
    name: 'wallet_id',
  })
  wallet: WalletEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
