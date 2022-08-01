import { WalletEntity } from '@/infra/typeorm/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(WalletEntity)
    private walletRepository: Repository<WalletEntity>,
  ) {}

  async buy(price: number, walletId: number): Promise<boolean> {
    const wallet = await this.walletRepository.findOne({ walletId });
    wallet.balance -= price;

    await this.walletRepository.save(wallet);
    return true;
  }
}
