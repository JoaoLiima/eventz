import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Patch,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from '@/modules/admin/admin.service';
import {
  Admin,
  CreateAdmin,
  PaginatedAdmin,
  UpdateAdmin,
} from '@/common/interfaces';
import { JwtAuthGuard } from '@/guards/jwt/jwt-auth.guard';
import { Public } from '@/common/decorators/public-route.decorator';

@UseGuards(JwtAuthGuard)
@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Post()
  @Public()
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
