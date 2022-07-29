import { User } from '@/common/interfaces';

export interface Costumer {
  costumerId: string;
  cpf: string;
  user: User;
  createdAt: Date;
  updatedAt: Date;
}
