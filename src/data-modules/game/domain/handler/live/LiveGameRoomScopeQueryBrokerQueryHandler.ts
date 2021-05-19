import { injectable } from 'inversify';

import {
  BrokerQuery,
  BrokerQueryHandler,
} from '../../../../../layer-modules/broker/domain';
import { GameBrokerSubscriptionContextScope } from '../../model/context/GameBrokerSubscriptionContextScope';

@injectable()
export class LiveGameRoomScopeQueryBrokerQueryHandler
  implements BrokerQueryHandler
{
  public scopes: string[] = [GameBrokerSubscriptionContextScope.LiveGameRoom];

  public async handle(_query: BrokerQuery): Promise<void> {
    return undefined;
  }
}
