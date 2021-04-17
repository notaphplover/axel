import { injectable } from 'inversify';

import { BrokerSubscriberHandler } from '../../../../../../layer-modules/broker/adapter';
import { QueryBrokerApi } from '../../../../../../layer-modules/broker/adapter/query/QueryBrokerApi';
import { GameBrokerSubscriptionContextScope } from '../../GameBrokerSubscriptionContextScope';

@injectable()
export class LiveGameRoomScopeQueryBrokerApiSubscriberHandler
  implements BrokerSubscriberHandler {
  public scopes: string[] = [GameBrokerSubscriptionContextScope.LiveGameRoom];

  public async handle(_query: QueryBrokerApi): Promise<void> {
    return undefined;
  }
}
