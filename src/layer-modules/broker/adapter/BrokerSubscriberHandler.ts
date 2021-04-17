import { QueryBrokerApi } from './query/QueryBrokerApi';

export interface BrokerSubscriberHandler {
  readonly scopes: string[];
  handle(query: QueryBrokerApi): Promise<void>;
}
