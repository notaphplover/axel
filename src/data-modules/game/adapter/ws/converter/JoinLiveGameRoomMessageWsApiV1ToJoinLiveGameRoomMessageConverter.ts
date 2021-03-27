import { injectable } from 'inversify';

import { Converter } from '../../../../../common/domain';
import { JoinLiveGameRoomMessage } from '../../../domain/message/JoinLiveGameRoomMessage';
import { JoinLiveGameRoomMessageWsApiV1 } from '../message/JoinLiveGameRoomMessageWsApiV1';
import { JoinLiveGameRoomMessageWsApiV1ValidationContext } from '../validator/message/JoinLiveGameRoomMessageWsApiV1ValidationContext';

@injectable()
export class JoinLiveGameRoomMessageWsApiV1ToJoinLiveGameRoomMessageConverter
  implements
    Converter<
      JoinLiveGameRoomMessageWsApiV1,
      Promise<JoinLiveGameRoomMessage>,
      JoinLiveGameRoomMessageWsApiV1ValidationContext
    > {
  public async transform(
    input: JoinLiveGameRoomMessageWsApiV1,
    context: JoinLiveGameRoomMessageWsApiV1ValidationContext,
  ): Promise<JoinLiveGameRoomMessage> {
    return {
      liveGame: context.liveGame,
      playerGateway: context.playerGateway,
      playerId: input.playerId,
    };
  }
}
