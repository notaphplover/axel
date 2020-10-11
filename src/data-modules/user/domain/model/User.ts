import { UserRole } from './UserRole';

export interface User {
  email: string;
  id: string;
  roles: UserRole[];
  username: string;
}
