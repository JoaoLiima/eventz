import { Role } from '@/common/enums';

export interface CreateUser {
  name: string;
  lastName?: string;
  role: Role;
  phone?: string;
  email?: string;
  password?: string;
}
