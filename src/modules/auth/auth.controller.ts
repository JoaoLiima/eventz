import { Login } from '@/common/interfaces';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthControlller {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() credentials: Login) {
    const user = await this.authService.validateUser(credentials);

    return await this.authService.login(user);
  }
}
