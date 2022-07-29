import { CostumerEntity } from '@/infra/typeorm/entities';
import { Costumer } from '@/common/interfaces';

export function arrayCostumerAdapter(costumers: CostumerEntity[]): Costumer[] {
  return costumers.map((costumer) => costumerAdapter(costumer));
}

export function costumerAdapter(costumer: CostumerEntity): Costumer {
  delete costumer.user.credential;

  return {
    ...costumer,
    user: {
      ...costumer.user,
    },
  };
}
