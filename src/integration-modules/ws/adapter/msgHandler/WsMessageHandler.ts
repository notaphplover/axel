import WebSocket from 'ws';

export interface WsMessageHandler<TQuery = unknown, TContext = void> {
  handle(socket: WebSocket, query: TQuery, context: TContext): Promise<void>;
}
