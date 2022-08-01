import {
  CreateEvent,
  Event,
  PaginatedEvent,
  UpdateEvent,
} from '@/common/interfaces';
import { LoggedUser } from '@/common/interfaces/user/logged-user.interface';
import { EventEntity } from '@/infra/typeorm/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { AdminService } from '@/modules/admin/admin.service';
import { EventType } from '@/common/enums';
import { BadRequestError, NotFoundError } from '@/error';
import { arrayEventAdapter, eventAdapter } from './event.adapter';
import { AddressService } from '../address/address.service';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventEntity)
    private eventRepository: Repository<EventEntity>,
    private adminService: AdminService,
    private addressService: AddressService,
  ) {}

  async create(event: CreateEvent, user: LoggedUser): Promise<Event> {
    if (event.type === EventType.PRESENTIAL && !event.address)
      throw new BadRequestError('presential events requires an address');

    const admin = await this.adminService.findByUserId(user.userId);

    const createdEvent = await this.eventRepository.save({
      ...event,
      createdBy: admin,
    });
    return eventAdapter(createdEvent);
  }

  async find(pageNumber = 1, pageSize = 10): Promise<PaginatedEvent> {
    const [result, total] = await this.eventRepository.findAndCount({
      take: pageSize,
      skip: (pageNumber - 1) * pageSize,
      order: {
        name: 'ASC',
      },
      relations: ['address'],
    });

    return {
      data: arrayEventAdapter(result),
      total,
    };
  }

  async findByName(
    pageNumber = 1,
    pageSize = 10,
    name: string,
  ): Promise<PaginatedEvent> {
    if (!name) throw new BadRequestError('name field is required');

    const [result, total] = await this.eventRepository.findAndCount({
      take: pageSize,
      skip: (pageNumber - 1) * pageSize,
      where: {
        name: Like(`%${name}%`),
      },
      relations: ['address'],
    });

    return {
      data: arrayEventAdapter(result),
      total,
    };
  }

  async findById(id: number): Promise<Event> {
    const event = await this.eventRepository.findOne({
      relations: ['address'],
      where: {
        eventId: id,
      },
    });

    return event;
  }

  async update(event: UpdateEvent): Promise<Event> {
    if (!event.eventId) throw new BadRequestError('field eventId is required');

    const oldEvent = await this.eventRepository.findOne({
      relations: ['address'],
      where: { eventId: event.eventId },
    });

    if (!oldEvent) throw new NotFoundError('event not found');

    if (
      oldEvent.type === EventType.REMOTE &&
      event.type === EventType.PRESENTIAL &&
      !event.address
    ) {
      throw new BadRequestError('presential events requires an address');
    }

    if (
      oldEvent.type === EventType.PRESENTIAL &&
      event.type === EventType.REMOTE
    ) {
      await this.addressService.delete(oldEvent.address.addressId);
      delete oldEvent.address;
    }

    return this.eventRepository.save({ ...oldEvent, ...event });
  }

  async delete(id: number) {
    const event = await this.eventRepository.findOne({ eventId: id });

    if (!event) throw new NotFoundError('event not found');

    await this.eventRepository.delete(event);
  }
}
