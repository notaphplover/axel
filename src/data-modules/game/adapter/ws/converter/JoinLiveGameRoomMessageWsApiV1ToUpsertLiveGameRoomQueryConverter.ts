import { injectable } from 'inversify';

import { Converter } from '../../../../../common/domain';
import { UpsertLiveGameRoomQuery } from '../../../domain/message/UpsertLiveGameRoomQuery';
import { JoinLiveGameRoomMessageWsApiV1 } from '../message/JoinLiveGameRoomMessageWsApiV1';
import { JoinLiveGameRoomMessageWsApiV1ValidationContext } from '../validator/message/JoinLiveGameRoomMessageWsApiV1ValidationContext';

@injectable()
export class JoinLiveGameRoomMessageWsApiV1ToUpsertLiveGameRoomQueryConverter
  implements
    Converter<
      JoinLiveGameRoomMessageWsApiV1,
      Promise<UpsertLiveGameRoomQuery>,
      JoinLiveGameRoomMessageWsApiV1ValidationContext
    > {
  public async transform(
    input: JoinLiveGameRoomMessageWsApiV1,
    context: JoinLiveGameRoomMessageWsApiV1ValidationContext,
  ): Promise<UpsertLiveGameRoomQuery> {
    return {
      liveGame: context.liveGame,
      playerGateway: context.playerGateway,
      playerId: input.playerId,
    };
  }
}
