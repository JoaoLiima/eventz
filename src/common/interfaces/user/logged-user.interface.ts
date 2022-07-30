import { Role } from '@/common/enums';

export interface LoggedUser {
  id: number;
  role: Role;
  email: string;
}
