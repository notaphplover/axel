import { UserRole } from '../model/UserRole';

export interface UserCreationQuery {
  email: string;
  roles: UserRole[];
  username: string;
}
