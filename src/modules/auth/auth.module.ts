import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '@/modules/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '@/guards/jwt/jwt.strategy';
import { AuthControlller } from './auth.controller';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthControlller],
})
export class AuthModule {}
