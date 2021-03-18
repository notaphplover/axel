import WebSocket from 'ws';

import { WsMessageHandler } from '../../../../../integration-modules/ws/adapter';
import { AppWsMessage } from '../model/AppWsMessage';
import { AppWsMessageHandler } from './AppWsMessageHandler';

export class AppWsMessageRouter<
  TMessage extends AppWsMessage = AppWsMessage,
  TContext = void
> implements WsMessageHandler<TMessage, TContext> {
  private readonly messageTypeToMessageHandlersMap: Map<
    string,
    AppWsMessageHandler<AppWsMessage, TContext>[]
  >;

  constructor(
    appWsMessageHandlers: Iterable<AppWsMessageHandler<AppWsMessage, TContext>>,
  ) {
    this.messageTypeToMessageHandlersMap = new Map<
      string,
      AppWsMessageHandler<AppWsMessage, TContext>[]
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
      | AppWsMessageHandler<AppWsMessage, TContext>[]
      | undefined = this.messageTypeToMessageHandlersMap.get(message.type);

    if (appWsMessageHandlers === undefined) {
      throw new Error(`Unsupported message type ${message.type}`);
    }

    await Promise.all(
      appWsMessageHandlers.map(
        async (
          appWsMessageHandler: AppWsMessageHandler<AppWsMessage, TContext>,
        ): Promise<void> =>
          appWsMessageHandler.handle(socket, message, context),
      ),
    );
  }

  private setMessageTypeToMessageHandlersMap(
    appWsMessageHandlers: Iterable<AppWsMessageHandler<AppWsMessage, TContext>>,
  ) {
    for (const appWsMessageHandler of appWsMessageHandlers) {
      for (const type of appWsMessageHandler.messageTypes) {
        let typeAppWsMessageHandlers:
          | AppWsMessageHandler<AppWsMessage, TContext>[]
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

  private isAppWsMessage(message: unknown): message is AppWsMessage {
    return (
      typeof message === 'object' &&
      typeof (message as AppWsMessage).type === 'string'
    );
  }
}
