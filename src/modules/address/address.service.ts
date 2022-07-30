import { Address, CreateAddress, UpdateAddress } from '@/common/interfaces';
import { LoggedUser } from '@/common/interfaces/user/logged-user.interface';
import { BadRequestError, NotFoundError } from '@/error';
import { AddressEntity } from '@/infra/typeorm/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CostumerService } from '../costumer/costumer.service';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private addressRepository: Repository<AddressEntity>,
    private costumerService: CostumerService,
  ) {}

  async create(address: CreateAddress, user?: LoggedUser): Promise<Address> {
    if (user && user.role === 'costumer') {
      const costumer = await this.costumerService.findByEmail(user.email);
      return this.addressRepository.save({
        ...address,
        costumer: { ...costumer },
      });
    } else {
      return this.addressRepository.save(address);
    }
  }

  async update(address: UpdateAddress): Promise<Address> {
    const { addressId } = address;
    if (!addressId) throw new BadRequestError('field addressId cannot be null');

    const oldAddress = await this.addressRepository.findOne({
      addressId: address.addressId,
    });
    console.log(oldAddress);
    if (!oldAddress) throw new NotFoundError('address not found');

    return this.addressRepository.save({ ...oldAddress, ...address });
  }

  async delete(id: number) {
    console.log(id);
    const address = await this.addressRepository.findOne({
      addressId: id,
    });

    if (!address) throw new NotFoundError('address not found');

    await this.addressRepository.delete(address);
  }
}
