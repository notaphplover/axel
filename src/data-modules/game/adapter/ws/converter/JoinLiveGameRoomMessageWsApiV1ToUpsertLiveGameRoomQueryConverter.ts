import { injectable } from 'inversify';

import { Converter } from '../../../../../common/domain';
import { UpsertLiveGameRoomQuery } from '../../../domain/message/UpsertLiveGameRoomQuery';
import { UpsertLiveGameRoomQueryWsApiV1 } from '../query/UpsertLiveGameRoomQueryWsApiV1';
import { JoinLiveGameRoomMessageWsApiV1ValidationContext } from '../validator/message/JoinLiveGameRoomMessageWsApiV1ValidationContext';

@injectable()
export class JoinLiveGameRoomMessageWsApiV1ToUpsertLiveGameRoomQueryConverter
  implements
    Converter<
      UpsertLiveGameRoomQueryWsApiV1,
      Promise<UpsertLiveGameRoomQuery>,
      JoinLiveGameRoomMessageWsApiV1ValidationContext
    > {
  public async transform(
    input: UpsertLiveGameRoomQueryWsApiV1,
    context: JoinLiveGameRoomMessageWsApiV1ValidationContext,
  ): Promise<UpsertLiveGameRoomQuery> {
    return {
      liveGame: context.liveGame,
      playerGateway: context.playerGateway,
      playerId: input.playerId,
    };
  }
}
