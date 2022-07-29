import { CryptoService } from '@/infra/crypto/crypto.service';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '@/infra/typeorm/entities';

@Entity('credential')
export class CredentialEntity {
  @PrimaryGeneratedColumn('increment')
  credential_id: number;

  @Column()
  password: string;

  @Column({
    nullable: true,
    name: 'last_password',
  })
  lastPassword?: string;

  @OneToOne(() => UserEntity, (user: UserEntity) => user.credential, {
    cascade: true,
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @BeforeInsert()
  async beforeInsert(): Promise<void> {
    this.password = await CryptoService.hash(this.password);
    this.lastPassword = await CryptoService.hash(this.password);
  }

  @BeforeUpdate()
  async beforeUpdate(): Promise<void> {
    this.password = await CryptoService.hash(this.password);
  }
}
