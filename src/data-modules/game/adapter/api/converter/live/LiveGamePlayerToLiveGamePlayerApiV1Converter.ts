import { inject, injectable } from 'inversify';

import { Converter } from '../../../../../../common/domain';
import { Resource } from '../../../../domain/model/card/Resource';
import { Hand } from '../../../../domain/model/live/Hand';
import { LiveGamePlayer } from '../../../../domain/model/live/LiveGamePlayer';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { ResourceApiV1 } from '../../model/card/ResourceApiV1';
import { HandApiV1 } from '../../model/live/HandApiV1';
import { LiveGamePlayerApiV1 } from '../../model/live/LiveGamePlayerApiV1';

@injectable()
export class LiveGamePlayerToLiveGamePlayerApiV1Converter
  implements Converter<LiveGamePlayer, LiveGamePlayerApiV1>
{
  constructor(
    @inject(GAME_ADAPTER_TYPES.api.converter.live.HAND_TO_HAND_API_V1_CONVERTER)
    private readonly handToHandApiV1Converter: Converter<Hand, HandApiV1>,
    @inject(
      GAME_ADAPTER_TYPES.api.converter.card
        .RESOURCE_TO_RESOURCE_API_V1_CONVERTER,
    )
    private readonly resourceToResourceApiV1Converter: Converter<
      Resource,
      ResourceApiV1
    >,
  ) {}

  public transform(liveGamePlayer: LiveGamePlayer): LiveGamePlayerApiV1 {
    return {
      hand: this.handToHandApiV1Converter.transform(liveGamePlayer.hand),
      lives: liveGamePlayer.lives,
      manaPool: this.resourceToResourceApiV1Converter.transform(
        liveGamePlayer.manaPool,
      ),
      targetId: liveGamePlayer.targetId,
      userId: liveGamePlayer.userId,
    };
  }
}
