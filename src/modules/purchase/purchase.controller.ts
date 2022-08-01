import { User } from '@/common/decorators/user.decorator';
import { Role } from '@/common/enums';
import { LoggedUser } from '@/common/interfaces/user/logged-user.interface';
import { JwtAuthGuard } from '@/guards/jwt/jwt-auth.guard';
import { Roles } from '@/guards/roles/roles.decorator';
import { RolesGuard } from '@/guards/roles/roles.guard';
import { Controller, Param, Post, UseGuards } from '@nestjs/common';
import { PurchaseService } from './purchase.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.COSTUMER)
@Controller('purchase')
export class PurchaseController {
  constructor(private purchaseService: PurchaseService) {}

  @Post(':eventId')
  async purchaseEvent(
    @Param('eventId') eventId: string,
    @User() user: LoggedUser,
  ) {
    return this.purchaseService.purchaseEvent(+eventId, user.userId);
  }
}
