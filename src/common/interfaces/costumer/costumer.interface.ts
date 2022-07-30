import { User } from '@/common/interfaces';

export interface Costumer {
  costumerId: number;
  cpf: string;
  user: User;
  createdAt: Date;
  updatedAt: Date;
}
