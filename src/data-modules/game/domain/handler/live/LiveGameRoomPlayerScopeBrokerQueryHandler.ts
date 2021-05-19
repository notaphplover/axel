import { injectable } from 'inversify';

import { BrokerQueryHandler } from '../../../../../layer-modules/broker/domain';
import { BrokerQuery } from '../../../../../layer-modules/broker/domain/query/BrokerQuery';
import { GameBrokerSubscriptionContextScope } from '../../model/context/GameBrokerSubscriptionContextScope';

@injectable()
export class LiveGameRoomPlayerScopeBrokerQueryHandler
  implements BrokerQueryHandler
{
  public scopes: string[] = [
    GameBrokerSubscriptionContextScope.LiveGameRoomPlayer,
  ];

  public async handle(_query: BrokerQuery): Promise<void> {
    return undefined;
  }
}
