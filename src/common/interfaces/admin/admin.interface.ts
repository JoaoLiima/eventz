import { User } from '@/common/interfaces';

export interface Admin {
  adminId: number;
  user: User;
  createdAt: Date;
  updatedAt: Date;
}
