import { injectable } from 'inversify';

import { WsInMemoryRoom } from './WsInMemoryRoom';
import { WsRoom } from './WsRoom';
import { WsRoomManager } from './WsRoomManager';

@injectable()
export class WsRoomInMemoryManager implements WsRoomManager {
  private readonly idToRoomMap: Map<string, WsRoom>;

  constructor() {
    this.idToRoomMap = new Map<string, WsRoom>();
  }

  public getOrCreate(roomId: string): WsRoom {
    let existingRoom: WsRoom | undefined = this.idToRoomMap.get(roomId);

    if (existingRoom === undefined) {
      existingRoom = new WsInMemoryRoom(roomId);

      this.idToRoomMap.set(roomId, existingRoom);
    }

    return existingRoom;
  }
}
