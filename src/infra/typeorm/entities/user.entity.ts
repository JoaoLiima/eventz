import { Role } from '@/common/enums/roles.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  AddressEntity,
  AdminEntity,
  CostumerEntity,
} from '@/infra/typeorm/entities';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('increment', { name: 'user_id' })
  userId: number;

  @Column()
  name: string;

  @Column({
    nullable: true,
    name: 'last_name',
  })
  lastName?: string;

  @Column({ enum: Role })
  role: Role;

  @Column({ nullable: true, unique: true })
  phone?: string;

  @Column({ nullable: true, unique: true })
  email?: string;

  @Column()
  password?: string;

  @OneToOne(() => AdminEntity, (admin: AdminEntity) => admin.user)
  admin?: AdminEntity;

  @OneToOne(() => CostumerEntity, (costumer: CostumerEntity) => costumer.user)
  costumer?: CostumerEntity;

  @OneToMany(() => AddressEntity, (address: AddressEntity) => address.user, {
    eager: true,
  })
  address?: AddressEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
