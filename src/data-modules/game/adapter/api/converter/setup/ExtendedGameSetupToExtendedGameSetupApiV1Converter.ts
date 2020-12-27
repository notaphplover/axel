import { inject, injectable } from 'inversify';
import { Converter } from '../../../../../../common/domain';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { GameFormat } from '../../../../domain/model/GameFormat';
import { GameFormatApiV1 } from '../../model/GameFormatApiV1';
import { GameSetupToGameSetupApiV1Converter } from './GameSetupToGameSetupApiConverter';
import { PlayerSetup } from '../../../../domain/model/setup/PlayerSetup';
import { PlayerSetupApiV1 } from '../../model/setup/PlayerSetupApiV1';

@injectable()
export class ExtendedGameSetupToExtendedGameSetupApiV1Converter extends GameSetupToGameSetupApiV1Converter<
  PlayerSetup,
  PlayerSetupApiV1
> {
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
  ): PlayerSetupApiV1 {
    return {
      deckId: inputPlayerSetup.deck.id,
      userId: inputPlayerSetup.userId,
    };
  }
}
