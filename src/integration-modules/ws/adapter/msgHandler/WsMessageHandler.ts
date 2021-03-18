import WebSocket from 'ws';

export interface WsMessageHandler<TMessage = unknown, TContext = void> {
  handle(
    socket: WebSocket,
    message: TMessage,
    context: TContext,
  ): Promise<void>;
}
