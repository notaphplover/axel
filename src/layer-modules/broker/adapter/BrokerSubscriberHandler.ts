import { QueryBrokerApi } from './query/QueryBrokerApi';

export interface BrokerSubscriberHandler {
  readonly scope: string;
  handle(query: QueryBrokerApi): Promise<void>;
}
