import { QueryBrokerApi } from './query/QueryBrokerApi';

export interface BrokerSubscriberHandler {
  scope: string;

  handler: (query: QueryBrokerApi) => Promise<void>;
}
