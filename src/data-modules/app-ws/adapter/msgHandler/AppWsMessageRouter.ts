import WebSocket from 'ws';

import { WsMessageHandler } from '../../../../integration-modules/ws/adapter';
import { MessageWsApi } from '../model/MessageWsApi';
import { AppWsMessageHandler } from './AppWsMessageHandler';

export class AppWsMessageRouter<
  TMessage extends MessageWsApi = MessageWsApi,
  TContext = void
> implements WsMessageHandler<TMessage, TContext> {
  private readonly messageTypeToMessageHandlersMap: Map<
    string,
    AppWsMessageHandler<MessageWsApi, TContext>[]
  >;

  constructor(
    appWsMessageHandlers: Iterable<AppWsMessageHandler<MessageWsApi, TContext>>,
  ) {
    this.messageTypeToMessageHandlersMap = new Map<
      string,
      AppWsMessageHandler<MessageWsApi, TContext>[]
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
      | AppWsMessageHandler<MessageWsApi, TContext>[]
      | undefined = this.messageTypeToMessageHandlersMap.get(message.type);

    if (appWsMessageHandlers === undefined) {
      throw new Error(`Unsupported message type ${message.type}`);
    }

    await Promise.all(
      appWsMessageHandlers.map(
        async (
          appWsMessageHandler: AppWsMessageHandler<MessageWsApi, TContext>,
        ): Promise<void> =>
          appWsMessageHandler.handle(socket, message, context),
      ),
    );
  }

  private setMessageTypeToMessageHandlersMap(
    appWsMessageHandlers: Iterable<AppWsMessageHandler<MessageWsApi, TContext>>,
  ) {
    for (const appWsMessageHandler of appWsMessageHandlers) {
      for (const type of appWsMessageHandler.messageTypes) {
        let typeAppWsMessageHandlers:
          | AppWsMessageHandler<MessageWsApi, TContext>[]
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

  private isAppWsMessage(message: unknown): message is MessageWsApi {
    return (
      typeof message === 'object' &&
      typeof (message as MessageWsApi).type === 'string'
    );
  }
}
