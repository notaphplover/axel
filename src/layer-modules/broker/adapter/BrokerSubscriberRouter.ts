import { BrokerSubscriberHandler } from './BrokerSubscriberHandler';
import { QueryBrokerApi } from './query/QueryBrokerApi';

export class BrokerSubscriberRouter implements BrokerSubscriberHandler {
  public readonly scopes: string[];

  private readonly scopeToHandlersMap: Map<string, BrokerSubscriberHandler[]>;

  constructor(brokerSubscriberHandlers: BrokerSubscriberHandler[]) {
    const scopeToHandlersMap: Map<
      string,
      BrokerSubscriberHandler[]
    > = this.getScopeToHandlersMap(brokerSubscriberHandlers);

    this.scopes = [...scopeToHandlersMap.keys()];
    this.scopeToHandlersMap = scopeToHandlersMap;
  }

  public async handle(query: QueryBrokerApi): Promise<void> {
    const handlers:
      | BrokerSubscriberHandler[]
      | undefined = this.scopeToHandlersMap.get(query.type);

    if (handlers !== undefined) {
      await Promise.all(
        handlers.map(async (handler: BrokerSubscriberHandler) =>
          handler.handle(query),
        ),
      );
    }
  }

  private getScopeToHandlersMap(
    brokerSubscriberHandlers: BrokerSubscriberHandler[],
  ): Map<string, BrokerSubscriberHandler[]> {
    const scopeToHandlersMap: Map<string, BrokerSubscriberHandler[]> = new Map<
      string,
      BrokerSubscriberHandler[]
    >();

    for (const brokerSubscriberHandler of brokerSubscriberHandlers) {
      for (const scope of brokerSubscriberHandler.scopes) {
        let scopeBrokerSubscriberHandlers:
          | BrokerSubscriberHandler[]
          | undefined = scopeToHandlersMap.get(scope);

        if (scopeBrokerSubscriberHandlers === undefined) {
          scopeBrokerSubscriberHandlers = [];
          scopeToHandlersMap.set(scope, scopeBrokerSubscriberHandlers);
        }

        scopeBrokerSubscriberHandlers.push(brokerSubscriberHandler);
      }
    }

    return scopeToHandlersMap;
  }
}
