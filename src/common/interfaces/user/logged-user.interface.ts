import { Role } from '@/common/enums';

export interface LoggedUser {
  userId: number;
  role: Role;
  email: string;
}
