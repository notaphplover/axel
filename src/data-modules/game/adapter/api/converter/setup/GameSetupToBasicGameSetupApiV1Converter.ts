import { inject, injectable } from 'inversify';

import { Converter } from '../../../../../../common/domain';
import { GameFormat } from '../../../../domain/model/GameFormat';
import { PlayerSetup } from '../../../../domain/model/setup/PlayerSetup';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { GameFormatApiV1 } from '../../model/GameFormatApiV1';
import { PlayerReferenceApiV1 } from '../../model/setup/PlayerReferenceApiV1';
import { GameSetupToGameSetupApiV1Converter } from './GameSetupToGameSetupApiV1Converter';

@injectable()
export class GameSetupToBasicGameSetupApiV1Converter extends GameSetupToGameSetupApiV1Converter<PlayerReferenceApiV1> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @inject(
      GAME_ADAPTER_TYPES.api.converter
        .GAME_FORMAT_TO_GAME_FORMAT_API_V1_CONVERTER,
    )
    gameFormatToGameFormatApiV1Converter: Converter<
      GameFormat,
      GameFormatApiV1
    >,
  ) {
    super(gameFormatToGameFormatApiV1Converter);
  }

  protected transformInputPlayerSetupIntoOutputPlayerSetup(
    inputPlayerSetup: PlayerSetup,
  ): PlayerReferenceApiV1 {
    return {
      userId: inputPlayerSetup.userId,
    };
  }
}
