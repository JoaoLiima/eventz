import {
  Entity,
  JoinColumn,
  OneToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity, EventEntity } from '@/infra/typeorm/entities';

@Entity('admin')
export class AdminEntity {
  @PrimaryGeneratedColumn('increment', { name: 'admin_id' })
  adminId: number;

  @OneToMany(() => EventEntity, (event: EventEntity) => event.createdBy)
  @JoinColumn({ name: 'created_by' })
  event: EventEntity;

  @OneToOne(() => UserEntity, (user: UserEntity) => user.admin, {
    cascade: ['insert'],
    eager: true,
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
