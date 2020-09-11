import { UserRole } from './UserRole';

export interface NoIdUser {
  email: string;
  roles: UserRole[];
  username: string;
}
