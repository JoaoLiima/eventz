import { User } from '@/common/decorators/user.decorator';
import { Address, CreateAddress, UpdateAddress } from '@/common/interfaces';
import { LoggedUser } from '@/common/interfaces/user/logged-user.interface';
import { JwtAuthGuard } from '@/guards/jwt/jwt-auth.guard';
import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AddressService } from './address.service';

@UseGuards(JwtAuthGuard)
@Controller('address')
export class AddressController {
  constructor(private addressService: AddressService) {}

  @Post()
  async create(
    @Body() address: CreateAddress,
    @User() user: LoggedUser,
  ): Promise<Address> {
    return this.addressService.create(address, user);
  }

  @Patch()
  async update(@Body() address: UpdateAddress): Promise<Address> {
    return this.addressService.update(address);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    await this.addressService.delete(+id);
  }
}
