import { injectable } from 'inversify';

import { Converter } from '../../../../../common/domain';
import { LiveGameRoomUpsertQuery } from '../../../domain/query/live/room/LiveGameRoomUpsertQuery';
import { LiveGameRoomUpsertQueryWsApiV1 } from '../query/LiveGameRoomUpsertQueryWsApiV1';
import { LiveGameRoomUpsertQueryWsApiV1ValidationContext } from '../validator/query/LiveGameRoomUpsertQueryWsApiV1ValidationContext';

@injectable()
export class LiveGameRoomUpsertQueryWsApiV1ToLiveGameRoomUpsertQueryConverter
  implements
    Converter<
      LiveGameRoomUpsertQueryWsApiV1,
      Promise<LiveGameRoomUpsertQuery>,
      LiveGameRoomUpsertQueryWsApiV1ValidationContext
    >
{
  public async transform(
    input: LiveGameRoomUpsertQueryWsApiV1,
    context: LiveGameRoomUpsertQueryWsApiV1ValidationContext,
  ): Promise<LiveGameRoomUpsertQuery> {
    return {
      liveGame: context.liveGame,
      playerGateway: context.playerGateway,
      playerId: input.playerId,
    };
  }
}
