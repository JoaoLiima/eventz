import { UpdateUser, User } from '@/common/interfaces';
import { UserEntity } from '@/infra/typeorm/entities';

export function mergeUsers(currentUser: UserEntity, newUser: UpdateUser): User {
  delete currentUser.credential;
  delete newUser.credential;

  return {
    ...currentUser,
    ...newUser,
  };
}
