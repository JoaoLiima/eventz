import { Admin } from './admin.interface';

export interface PaginatedAdmin {
  data: Admin[];
  total: number;
}
