import WebSocket from 'ws';

import { WsMessageHandler } from '../../../../../integration-modules/ws/adapter';
import { AppWsMessage } from '../message/AppWsMessage';
import { AppWsMessageHandler } from './AppWsMessageHandler';

export class AppWsMessageRouter implements WsMessageHandler {
  private readonly messageTypeToMessageHandlersMap: Map<
    string,
    WsMessageHandler[]
  >;

  constructor(appWsMessageHandlers: Iterable<AppWsMessageHandler>) {
    this.messageTypeToMessageHandlersMap = new Map<
      string,
      WsMessageHandler[]
    >();

    this.setMessageTypeToMessageHandlersMap(appWsMessageHandlers);
  }
  public async handle(socket: WebSocket, message: unknown): Promise<void> {
    if (!this.isAppWsMessage(message)) {
      throw new Error('invalid message');
    }

    const appWsMessageHandlers:
      | WsMessageHandler[]
      | undefined = this.messageTypeToMessageHandlersMap.get(message.type);

    if (appWsMessageHandlers === undefined) {
      throw new Error(`Unsupported message type ${message.type}`);
    }

    await Promise.all(
      appWsMessageHandlers.map(
        async (appWsMessageHandler: WsMessageHandler): Promise<void> =>
          appWsMessageHandler.handle(socket, message),
      ),
    );
  }

  private setMessageTypeToMessageHandlersMap(
    appWsMessageHandlers: Iterable<AppWsMessageHandler>,
  ) {
    for (const appWsMessageHandler of appWsMessageHandlers) {
      for (const type of appWsMessageHandler.messageTypes) {
        let typeAppWsMessageHandlers:
          | WsMessageHandler[]
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
