import { Messenger } from '../../../../common/domain';
import { User } from '../../../user/domain';

export interface AppWsRequestContext {
  playerGateway: Messenger;
  user: User;
}
