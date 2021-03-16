import WebSocket from 'ws';

export interface WsRoom {
  readonly id: string;

  broadcast(data: Record<string, unknown>): void;
  send(agentId: string, data: Record<string, unknown>): void;
  subscribe(agentId: string, socket: WebSocket): void;
  unsubscribe(agentId: string): void;
}
