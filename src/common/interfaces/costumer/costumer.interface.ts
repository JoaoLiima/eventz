import { User, Wallet, Event } from '@/common/interfaces';

export interface Costumer {
  costumerId: number;
  cpf: string;
  user: User;
  wallet?: Wallet;
  events?: Event[];
  createdAt: Date;
  updatedAt: Date;
}
