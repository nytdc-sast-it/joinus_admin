import { ClubDTO, DepartmentDTO } from '@/api/club';

export type RoleType = '' | '*' | 'admin' | 'user';
export interface UserState {
  id?: number;
  username?: string;
  avatar?: string;
  role: RoleType;
  admin: boolean;
  club: ClubDTO | undefined;
  department: DepartmentDTO | undefined;
}
