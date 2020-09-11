import { NoIdUser } from './NoIdUser';

export interface User extends NoIdUser {
  id: string;
}
