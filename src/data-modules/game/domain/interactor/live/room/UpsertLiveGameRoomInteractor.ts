import { inject, injectable } from 'inversify';

import { Interactor } from '../../../../../../common/domain';
import {
  InsertRepository,
  SearchRepository,
  UpdateRepository,
} from '../../../../../../layer-modules/db/domain';
import { GAME_DOMAIN_TYPES } from '../../../config/types';
import { LiveGameRoom } from '../../../model/live/room/LiveGameRoom';
import { AddPlayerToLiveGameRoomQuery } from '../../../query/live/room/AddPlayerToLiveGameRoomQuery';
import { LiveGameRoomCreationQuery } from '../../../query/live/room/LiveGameRoomCreationQuery';
import { LiveGameRoomFindQuery } from '../../../query/live/room/LiveGameRoomFindQuery';
import { LiveGameRoomUpdateQuery } from '../../../query/live/room/LiveGameRoomUpdateQuery';
import { LiveGameRoomUpdateQueryType } from '../../../query/live/room/LiveGameRoomUpdateQueryType';
import { LiveGameRoomUpsertQuery } from '../../../query/live/room/LiveGameRoomUpsertQuery';

@injectable()
export class UpsertLiveGameRoomInteractor
  implements Interactor<LiveGameRoomUpsertQuery, Promise<LiveGameRoom>>
{
  constructor(
    @inject(
      GAME_DOMAIN_TYPES.repository.live.room
        .LIVE_GAME_ROOM_IN_MEMORY_REPOSITORY,
    )
    private readonly liveGameRoomRepository: InsertRepository<
      LiveGameRoom,
      LiveGameRoomCreationQuery
    > &
      SearchRepository<LiveGameRoom, LiveGameRoomFindQuery> &
      UpdateRepository<LiveGameRoom, LiveGameRoomUpdateQuery>,
  ) {}

  public async interact(
    liveGameRoomUpsertQuery: LiveGameRoomUpsertQuery,
  ): Promise<LiveGameRoom> {
    const liveGameRoomFindQuery: LiveGameRoomFindQuery = {
      liveGameId: liveGameRoomUpsertQuery.liveGame.id,
    };

    const liveGameRoom: LiveGameRoom | null =
      await this.liveGameRoomRepository.findOne(liveGameRoomFindQuery);

    if (liveGameRoom === null) {
      const liveGameRoomCreationQuery: LiveGameRoomCreationQuery = {
        liveGameId: liveGameRoomUpsertQuery.liveGame.id,
      };

      await this.liveGameRoomRepository.insert(liveGameRoomCreationQuery);
    }

    const updateLiveGameRoomquery: AddPlayerToLiveGameRoomQuery = {
      liveGameId: liveGameRoomUpsertQuery.liveGame.id,
      playerGategay: liveGameRoomUpsertQuery.playerGateway,
      playerId: liveGameRoomUpsertQuery.playerId,
      type: LiveGameRoomUpdateQueryType.AddPlayerToLiveGameRoom,
    };

    const liveGameRoomUpdated: LiveGameRoom | null =
      await this.liveGameRoomRepository.updateOneAndSelect(
        updateLiveGameRoomquery,
      );

    if (liveGameRoomUpdated === null) {
      throw new Error('Expected a non null game room');
    }

    return liveGameRoomUpdated;
  }
}
