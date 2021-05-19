import { Handler } from '../../../common/application';
import { BrokerQuery } from './query/BrokerQuery';

export interface BrokerQueryHandler
  extends Handler<BrokerQuery, Promise<void>> {
  readonly scopes: string[];
}
