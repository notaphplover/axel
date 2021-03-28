import { injectable } from 'inversify';

import { Converter } from '../../../../../common/domain';
import { UpsertLiveGameRoomQuery } from '../../../domain/message/UpsertLiveGameRoomQuery';
import { UpsertLiveGameRoomQueryWsApiV1 } from '../query/UpsertLiveGameRoomQueryWsApiV1';
import { UpsertLiveGameRoomQueryWsApiV1ValidationContext } from '../validator/query/UpsertLiveGameRoomQueryWsApiV1ValidationContext';

@injectable()
export class UpsertLiveGameRoomQueryWsApiV1ToUpsertLiveGameRoomQueryConverter
  implements
    Converter<
      UpsertLiveGameRoomQueryWsApiV1,
      Promise<UpsertLiveGameRoomQuery>,
      UpsertLiveGameRoomQueryWsApiV1ValidationContext
    > {
  public async transform(
    input: UpsertLiveGameRoomQueryWsApiV1,
    context: UpsertLiveGameRoomQueryWsApiV1ValidationContext,
  ): Promise<UpsertLiveGameRoomQuery> {
    return {
      liveGame: context.liveGame,
      playerGateway: context.playerGateway,
      playerId: input.playerId,
    };
  }
}
