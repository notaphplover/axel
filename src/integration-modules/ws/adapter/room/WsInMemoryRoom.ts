import WebSocket from 'ws';

import { WsRoom } from './WsRoom';

export class WsInMemoryRoom implements WsRoom {
  private readonly agentIdToSocketMap: Map<string, WebSocket>;

  constructor(public readonly id: string) {
    this.agentIdToSocketMap = new Map<string, WebSocket>();
  }

  public broadcast(data: Record<string, unknown>): void {
    for (const socket of this.agentIdToSocketMap.values()) {
      socket.send(JSON.stringify(data));
    }
  }

  public subscribe(agentId: string, socket: WebSocket): void {
    this.agentIdToSocketMap.set(agentId, socket);
  }

  public unsubscribe(agentId: string): void {
    this.agentIdToSocketMap.delete(agentId);
  }
}
