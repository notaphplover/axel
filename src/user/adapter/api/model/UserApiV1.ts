import { UserRoleApiV1 } from './UserRoleApiV1';

export interface UserApiV1 {
  email: string;
  id: string;
  roles: UserRoleApiV1[];
  username: string;
}
