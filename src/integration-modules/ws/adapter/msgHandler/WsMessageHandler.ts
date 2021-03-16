import WebSocket from 'ws';

export interface WsMessageHandler<TMessage = unknown> {
  handle(socket: WebSocket, message: TMessage): Promise<void>;
}
