import { Event } from '@/common/interfaces';
import { BadRequestError } from '@/error';
import { CostumerEventEntity } from '@/infra/typeorm/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CostumerService } from '@/modules/costumer/costumer.service';
import { EventService } from '@/modules/event/event.service';
import { WalletService } from '@/modules/wallet/wallet.service';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectRepository(CostumerEventEntity)
    private costumerEventRepository: Repository<CostumerEventEntity>,
    private eventService: EventService,
    private costumerService: CostumerService,
    private walletService: WalletService,
  ) {}

  async purchaseEvent(eventId: number, userId: number): Promise<Event> {
    const costumer = await this.costumerService.findByUserId(userId);
    const event = await this.eventService.findById(eventId);

    if (this.eventAlreadyPurchased(costumer.events, eventId))
      throw new BadRequestError('event already purchased');

    if (costumer.wallet.balance >= event.price) {
      const purchaseAccomplished = await this.walletService.buy(
        event.price,
        costumer.wallet.walletId,
      );
      if (purchaseAccomplished) {
        await this.costumerEventRepository.save({
          costumerId: costumer.costumerId,
          eventId: eventId,
        });

        return event;
      }
    }

    throw new BadRequestError('your balance is insufficient for this purchase');
  }

  private eventAlreadyPurchased(events: Event[], eventId: number): boolean {
    return events.some((event) => event.eventId === eventId);
  }
}
