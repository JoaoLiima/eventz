import { Role } from '@/common/enums';

export interface User {
  userId: number;
  name: string;
  lastName?: string;
  role: Role;
  phone?: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}
