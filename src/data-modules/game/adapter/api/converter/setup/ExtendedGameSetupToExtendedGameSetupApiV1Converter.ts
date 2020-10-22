import { inject, injectable } from 'inversify';
import { CardDeck } from '../../../../domain/model/deck/CardDeck';
import { CardDeckApiV1 } from '../../model/deck/CardDeckApiV1';
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
  constructor(
    @inject(
      GAME_ADAPTER_TYPES.api.converter.deck
        .CARD_DECK_TO_CARD_DECK_API_V1_CONVERTER,
    )
    private readonly cardDeckToCardDeckApiV1Converter: Converter<
      CardDeck,
      CardDeckApiV1
    >,
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
      deck: this.cardDeckToCardDeckApiV1Converter.transform(
        inputPlayerSetup.deck,
      ),
      userId: inputPlayerSetup.userId,
    };
  }
}
