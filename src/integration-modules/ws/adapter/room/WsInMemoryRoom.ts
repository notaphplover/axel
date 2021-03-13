import WebSocket from 'ws';

import { WsRoom } from './WsRoom';

export class WsInMemoryRoom implements WsRoom {
  private readonly sockets: Set<WebSocket>;

  constructor(public readonly id: string) {
    this.sockets = new Set<WebSocket>();
  }

  public broadcast(data: Record<string, unknown>): void {
    for (const socket of this.sockets) {
      socket.send(JSON.stringify(data));
    }
  }

  public subscribe(socket: WebSocket): void {
    this.sockets.add(socket);
  }

  public unsubscribe(socket: WebSocket): void {
    this.sockets.delete(socket);
  }
}
