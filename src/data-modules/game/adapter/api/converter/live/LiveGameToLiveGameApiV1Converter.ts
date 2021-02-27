import { inject, injectable } from 'inversify';

import { Converter } from '../../../../../../common/domain';
import { GameFormat } from '../../../../domain/model/GameFormat';
import { LiveGame } from '../../../../domain/model/live/LiveGame';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { GameFormatApiV1 } from '../../model/GameFormatApiV1';
import { LiveGameApiV1 } from '../../model/live/LiveGameApiV1';

@injectable()
export class LiveGameToLiveGameApiV1Converter
  implements Converter<LiveGame, LiveGameApiV1> {
  constructor(
    @inject(
      GAME_ADAPTER_TYPES.api.converter
        .GAME_FORMAT_TO_GAME_FORMAT_API_V1_CONVERTER,
    )
    private readonly gameFormatToGameFormatApiV1Converter: Converter<
      GameFormat,
      GameFormatApiV1
    >,
  ) {}

  public transform(input: LiveGame): LiveGameApiV1 {
    return {
      format: this.gameFormatToGameFormatApiV1Converter.transform(input.format),
      id: input.id,
      round: input.round,
    };
  }
}
