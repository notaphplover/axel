import WebSocket from 'ws';

export interface WsMessageHandler {
  handle(socket: WebSocket, message: unknown): Promise<void>;
}
