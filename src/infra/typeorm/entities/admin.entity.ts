import {
  Entity,
  JoinColumn,
  OneToOne,
  OneToMany,
  PrimaryGeneratedColumn,
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
}
