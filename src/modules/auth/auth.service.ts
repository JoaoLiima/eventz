import { Injectable } from '@nestjs/common';
import { UserService } from '@/modules/user/user.service';
import { CryptoService } from '@/infra/crypto/crypto.service';
import { JwtService } from '@nestjs/jwt';
import { Login } from '@/common/interfaces/login/login.interface';
import { User } from '@/common/interfaces';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser({ email, password }: Login): Promise<any> {
    const user = await this.userService.findByEmail(email);
    const { credential } = user;
    const isPasswordValid = CryptoService.compare(
      password,
      credential.password,
    );

    if (user && isPasswordValid) {
      delete user.credential;

      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.userId, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
