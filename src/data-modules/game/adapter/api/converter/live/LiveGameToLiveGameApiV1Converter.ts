import { inject, injectable } from 'inversify';

import { Converter } from '../../../../../../common/domain';
import { GameFormat } from '../../../../domain/model/GameFormat';
import { GameState } from '../../../../domain/model/live/GameState';
import { LiveGame } from '../../../../domain/model/live/LiveGame';
import { LiveGamePlayerArea } from '../../../../domain/model/live/LiveGamePlayerArea';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { GameFormatApiV1 } from '../../model/GameFormatApiV1';
import { GameStateApiV1 } from '../../model/live/GameStateApiV1';
import { LiveGameApiV1 } from '../../model/live/LiveGameApiV1';
import { LiveGamePlayerAreaApiV1 } from '../../model/live/LiveGamePlayerAreaApiV1';

@injectable()
export class LiveGameToLiveGameApiV1Converter
  implements Converter<LiveGame, LiveGameApiV1>
{
  constructor(
    @inject(
      GAME_ADAPTER_TYPES.api.converter
        .GAME_FORMAT_TO_GAME_FORMAT_API_V1_CONVERTER,
    )
    private readonly gameFormatToGameFormatApiV1Converter: Converter<
      GameFormat,
      GameFormatApiV1
    >,
    @inject(
      GAME_ADAPTER_TYPES.api.converter.live
        .GAME_STATE_TO_GAME_STATE_API_V1_CONVERTER,
    )
    private readonly gameStateToGameStateApiV1Converter: Converter<
      GameState,
      GameStateApiV1
    >,
    @inject(
      GAME_ADAPTER_TYPES.api.converter.live
        .LIVE_GAME_PLAYER_AREA_TO_LIVE_GAME_PLAYER_AREA_API_V1_CONVERTER,
    )
    private readonly liveGamePlayerAreaToLiveGamePlayerAreaApiV1Converter: Converter<
      LiveGamePlayerArea,
      LiveGamePlayerAreaApiV1
    >,
  ) {}

  public transform(input: LiveGame): LiveGameApiV1 {
    return {
      format: this.gameFormatToGameFormatApiV1Converter.transform(input.format),
      id: input.id,
      playerAreas: input.playerAreas.map(
        (liveGamePlayerArea: LiveGamePlayerArea) =>
          this.liveGamePlayerAreaToLiveGamePlayerAreaApiV1Converter.transform(
            liveGamePlayerArea,
          ),
      ),
      round: input.round,
      state: this.gameStateToGameStateApiV1Converter.transform(input.state),
    };
  }
}
