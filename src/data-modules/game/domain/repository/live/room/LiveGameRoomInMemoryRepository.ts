import { injectable } from 'inversify';

import { Messenger } from '../../../../../../common/domain';
import {
  InsertRepository,
  SearchRepository,
  UpdateRepository,
} from '../../../../../../layer-modules/db/domain';
import { LiveGameRoom } from '../../../model/live/room/LiveGameRoom';
import { AddPlayerToLiveGameRoomQuery } from '../../../query/live/room/AddPlayerToLiveGameRoomQuery';
import { LiveGameRoomCreationQuery } from '../../../query/live/room/LiveGameRoomCreationQuery';
import { LiveGameRoomFindQuery } from '../../../query/live/room/LiveGameRoomFindQuery';
import { LiveGameRoomUpdateQuery } from '../../../query/live/room/LiveGameRoomUpdateQuery';
import { LiveGameRoomUpdateQueryType } from '../../../query/live/room/LiveGameRoomUpdateQueryType';
import { RemovePlayerFromGameRoomQuery } from '../../../query/live/room/RemovePlayerFromGameRoomQuery';

@injectable()
export class LiveGameRoomInMemoryRepository
  implements
    SearchRepository<LiveGameRoom, LiveGameRoomFindQuery>,
    InsertRepository<LiveGameRoom, LiveGameRoomCreationQuery>,
    UpdateRepository<LiveGameRoom, LiveGameRoomUpdateQuery>
{
  private readonly liveGameIdToLiveGameRoomMap: Map<string, LiveGameRoom>;

  constructor() {
    this.liveGameIdToLiveGameRoomMap = new Map<string, LiveGameRoom>();
  }

  public async insert(
    query: LiveGameRoomCreationQuery,
  ): Promise<LiveGameRoom[]> {
    const liveGameId: string = query.liveGameId;

    if (this.liveGameIdToLiveGameRoomMap.has(liveGameId)) {
      throw new Error(`There's already a room for game ${liveGameId}.`);
    } else {
      const liveGameRoom: LiveGameRoom = {
        liveGameId: liveGameId,
        playerIdToPlayerGatewayMap: new Map<string, Messenger>(),
      };

      this.liveGameIdToLiveGameRoomMap.set(liveGameId, liveGameRoom);

      return [liveGameRoom];
    }
  }

  public async find(query: LiveGameRoomFindQuery): Promise<LiveGameRoom[]> {
    const liveGameRoomOrUndefined: LiveGameRoom | undefined =
      this.liveGameIdToLiveGameRoomMap.get(query.liveGameId);

    const liveGameRooms: LiveGameRoom[] = [];

    if (liveGameRoomOrUndefined !== undefined) {
      liveGameRooms.push(liveGameRoomOrUndefined);
    }

    return liveGameRooms;
  }

  public async findOne(
    query: LiveGameRoomFindQuery,
  ): Promise<LiveGameRoom | null> {
    const liveGameRooms: LiveGameRoom[] = await this.find(query);

    const firstGameRoom: LiveGameRoom | undefined = liveGameRooms[0];

    return firstGameRoom ?? null;
  }

  public async update(query: LiveGameRoomUpdateQuery): Promise<void> {
    await this.innerUpdate(query);
  }

  public async updateAndSelect(
    query: LiveGameRoomUpdateQuery,
  ): Promise<LiveGameRoom[]> {
    const liveGameRoomOrNull: LiveGameRoom | null = await this.innerUpdate(
      query,
    );

    const liveGameRooms: LiveGameRoom[] = [];

    if (liveGameRoomOrNull !== null) {
      liveGameRooms.push(liveGameRoomOrNull);
    }

    return liveGameRooms;
  }

  public async updateOne(query: LiveGameRoomUpdateQuery): Promise<void> {
    await this.innerUpdate(query);
  }

  public async updateOneAndSelect(
    query: LiveGameRoomUpdateQuery,
  ): Promise<LiveGameRoom | null> {
    return this.innerUpdate(query);
  }

  private async innerUpdate(
    query: LiveGameRoomUpdateQuery,
  ): Promise<LiveGameRoom | null> {
    const liveGameRoomOrUndefined: LiveGameRoom | undefined =
      this.liveGameIdToLiveGameRoomMap.get(query.liveGameId);

    if (liveGameRoomOrUndefined === undefined) {
      return null;
    } else {
      return this.updateLiveGameRoom(query, liveGameRoomOrUndefined);
    }
  }

  private updateLiveGameRoom(
    query: LiveGameRoomUpdateQuery,
    room: LiveGameRoom,
  ): LiveGameRoom {
    switch (query.type) {
      case LiveGameRoomUpdateQueryType.AddPlayerToLiveGameRoom:
        return this.addPlayerToLiveGameRoom(query, room);
      case LiveGameRoomUpdateQueryType.RemovePlayerFromLiveGameRoom:
        return this.removePlayerFromLiveGameRoom(query, room);
    }
  }

  private addPlayerToLiveGameRoom(
    query: AddPlayerToLiveGameRoomQuery,
    room: LiveGameRoom,
  ): LiveGameRoom {
    room.playerIdToPlayerGatewayMap.set(query.playerId, query.playerGategay);

    return room;
  }

  private removePlayerFromLiveGameRoom(
    query: RemovePlayerFromGameRoomQuery,
    room: LiveGameRoom,
  ): LiveGameRoom {
    room.playerIdToPlayerGatewayMap.delete(query.playerId);

    return room;
  }
}
