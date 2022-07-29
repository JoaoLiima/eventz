import { AdminEntity } from '@/infra/typeorm/entities';
import { Admin } from '@/common/interfaces';

export function arrayAdminAdapter(admins: AdminEntity[]): Admin[] {
  return admins.map((admin) => adminAdapter(admin));
}

export function adminAdapter(admin: AdminEntity): Admin {
  delete admin.user.credential;

  return {
    ...admin,
    user: {
      ...admin.user,
    },
  };
}
