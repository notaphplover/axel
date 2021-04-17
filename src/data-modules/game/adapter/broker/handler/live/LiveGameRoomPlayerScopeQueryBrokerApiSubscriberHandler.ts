import { injectable } from 'inversify';

import { BrokerSubscriberHandler } from '../../../../../../layer-modules/broker/adapter';
import { QueryBrokerApi } from '../../../../../../layer-modules/broker/adapter/query/QueryBrokerApi';
import { GameBrokerSubscriptionContextScope } from '../../GameBrokerSubscriptionContextScope';

@injectable()
export class LiveGameRoomPlayerScopeQueryBrokerApiSubscriberHandler
  implements BrokerSubscriberHandler {
  public scopes: string[] = [
    GameBrokerSubscriptionContextScope.LiveGameRoomPlayer,
  ];

  public async handle(_query: QueryBrokerApi): Promise<void> {
    return undefined;
  }
}
