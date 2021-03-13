import WebSocket from 'ws';

export interface WsRoom {
  readonly id: string;

  broadcast(data: Record<string, unknown>): void;

  subscribe(socket: WebSocket): void;

  unsubscribe(socket: WebSocket): void;
}
