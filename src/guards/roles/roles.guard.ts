import { Role } from '@/common/enums';
import { UnauthorizedError } from '@/error';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    const isAllowed = requiredRoles.some((role) => user.role === role);

    if (!isAllowed) {
      throw new UnauthorizedError(
        'the current user does not have privileges to perform this action',
      );
    }

    return isAllowed;
  }
}
