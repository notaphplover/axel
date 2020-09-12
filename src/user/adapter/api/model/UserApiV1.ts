import { UserRole } from '../../../domain/model/UserRole';

export interface UserApiV1 {
  email: string;
  id: string;
  roles: UserRole[];
  username: string;
}
