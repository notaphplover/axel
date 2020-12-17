import { Document } from '../../../../../integration-modules/mongodb/adapter';
import { UserRole } from '../../../domain/model/UserRole';

export interface UserDb extends Document {
  email: string;
  hash: string;
  roles: UserRole[];
  username: string;
}
