import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Patch,
  Delete,
  Param,
} from '@nestjs/common';
import { AdminService } from '@/modules/admin/admin.service';
import {
  Admin,
  CreateAdmin,
  PaginatedAdmin,
  UpdateAdmin,
} from '@/common/interfaces';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Post()
  async createAdmin(@Body() data: CreateAdmin): Promise<Admin> {
    return this.adminService.create(data);
  }

  @Get()
  async findAll(
    @Query('pageNumber') pageNumber,
    @Query('pageSize') pageSize,
  ): Promise<PaginatedAdmin> {
    return this.adminService.find(pageNumber, pageSize);
  }

  @Get('by-email')
  async findByEmail(@Query('email') email: string): Promise<Admin> {
    return this.adminService.findByEmail(email);
  }

  @Get('by-phone')
  async findByPhone(@Query('phone') phone: string): Promise<Admin> {
    return this.adminService.findByPhone(phone);
  }

  @Patch()
  async update(@Body() data: UpdateAdmin): Promise<Admin> {
    return this.adminService.update(data);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    return this.adminService.delete(+id);
  }
}
