import { User } from '../../../user/domain';

export interface AppWsRequestContext {
  user: User;
}
