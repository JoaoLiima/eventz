import { Role } from '@/common/enums';
import { CreateCredential } from '../credential/create-credential.interface';

export interface CreateUser {
  name: string;
  lastName?: string;
  role: Role;
  phone?: string;
  email: string;
  credential: CreateCredential;
}
