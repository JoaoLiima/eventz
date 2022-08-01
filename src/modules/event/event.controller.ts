import { Role } from '@/common/enums';
import {
  CreateEvent,
  Event,
  PaginatedEvent,
  UpdateEvent,
} from '@/common/interfaces';
import { JwtAuthGuard } from '@/guards/jwt/jwt-auth.guard';
import { RolesGuard } from '@/guards/roles/roles.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { EventService } from './event.service';
import { Roles } from '@/guards/roles/roles.decorator';
import { User } from '@/common/decorators/user.decorator';
import { LoggedUser } from '@/common/interfaces/user/logged-user.interface';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
@Controller('event')
export class EventController {
  constructor(private eventService: EventService) {}

  @Post()
  async create(
    @Body() event: CreateEvent,
    @User() user: LoggedUser,
  ): Promise<Event> {
    return this.eventService.create(event, user);
  }

  @Get()
  async find(
    @Query('pageNumber') pageNumber: number,
    @Query('pageSize') pageSize: number,
  ): Promise<PaginatedEvent> {
    return this.eventService.find(pageNumber, pageSize);
  }

  @Get('by-name')
  async findByName(
    @Query('pageNumber') pageNumber: number,
    @Query('pageSize') pageSize: number,
    @Query('name') name: string,
  ): Promise<PaginatedEvent> {
    return this.eventService.findByName(pageNumber, pageSize, name);
  }

  @Patch()
  async update(@Body() event: UpdateEvent): Promise<Event> {
    return this.eventService.update(event);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.eventService.delete(id);
  }
}
