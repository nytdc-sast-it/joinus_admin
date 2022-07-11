export type RoleType = '' | '*' | 'admin' | 'user';
export interface UserState {
  id?: number;
  username?: string;
  avatar?: string;
  role: RoleType;
  isAdmin: boolean;
}
