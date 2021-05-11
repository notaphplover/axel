import WebSocket from 'ws';

import { WsMessageHandler } from '../../../../integration-modules/ws/adapter';
import { QueryWsApi } from '../model/QueryWsApi';
import { AppWsMessageHandler } from './AppWsMessageHandler';

export class AppWsMessageRouter<
  TQueryWsApi extends QueryWsApi = QueryWsApi,
  TContext = void,
> implements WsMessageHandler<TQueryWsApi, TContext>
{
  private readonly messageTypeToMessageHandlersMap: Map<
    string,
    AppWsMessageHandler<QueryWsApi, TContext>[]
  >;

  constructor(
    appWsMessageHandlers: Iterable<AppWsMessageHandler<QueryWsApi, TContext>>,
  ) {
    this.messageTypeToMessageHandlersMap = new Map<
      string,
      AppWsMessageHandler<QueryWsApi, TContext>[]
    >();

    this.setMessageTypeToMessageHandlersMap(appWsMessageHandlers);
  }
  public async handle(
    socket: WebSocket,
    message: unknown,
    context: TContext,
  ): Promise<void> {
    if (!this.isAppWsMessage(message)) {
      throw new Error('invalid message');
    }

    const appWsMessageHandlers:
      | AppWsMessageHandler<QueryWsApi, TContext>[]
      | undefined = this.messageTypeToMessageHandlersMap.get(message.type);

    if (appWsMessageHandlers === undefined) {
      throw new Error(`Unsupported message type ${message.type}`);
    }

    await Promise.all(
      appWsMessageHandlers.map(
        async (
          appWsMessageHandler: AppWsMessageHandler<QueryWsApi, TContext>,
        ): Promise<void> =>
          appWsMessageHandler.handle(socket, message, context),
      ),
    );
  }

  private setMessageTypeToMessageHandlersMap(
    appWsMessageHandlers: Iterable<AppWsMessageHandler<QueryWsApi, TContext>>,
  ) {
    for (const appWsMessageHandler of appWsMessageHandlers) {
      for (const type of appWsMessageHandler.messageTypes) {
        let typeAppWsMessageHandlers:
          | AppWsMessageHandler<QueryWsApi, TContext>[]
          | undefined = this.messageTypeToMessageHandlersMap.get(type);

        if (typeAppWsMessageHandlers === undefined) {
          typeAppWsMessageHandlers = [];

          this.messageTypeToMessageHandlersMap.set(
            type,
            typeAppWsMessageHandlers,
          );
        }

        typeAppWsMessageHandlers.push(appWsMessageHandler);
      }
    }
  }

  private isAppWsMessage(message: unknown): message is QueryWsApi {
    return (
      typeof message === 'object' &&
      typeof (message as QueryWsApi).id === 'string' &&
      typeof (message as QueryWsApi).type === 'string'
    );
  }
}
