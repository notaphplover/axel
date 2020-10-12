import { inject, injectable } from 'inversify';
import { CardDeck } from '../../../../domain/model/deck/CardDeck';
import { CardDeckApiV1 } from '../../model/deck/CardDeckApiV1';
import { CardDeckSections } from '../../../../domain/model/deck/CardDeckSections';
import { CardDeckSectionsApiV1 } from '../../model/deck/CardDeckSectionsApiV1';
import { Converter } from '../../../../../../common/domain';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { GameFormat } from '../../../../domain/model/GameFormat';
import { GameFormatApiV1 } from '../../model/GameFormatApiV1';

@injectable()
export class CardDeckToCardDeckApiV1Converter
  implements Converter<CardDeck, CardDeckApiV1> {
  constructor(
    @inject(
      GAME_ADAPTER_TYPES.api.converter.deck
        .CARD_DECK_SECTION_TO_CARD_DECK_SECTIONS_API_V1_CONVERTER,
    )
    private readonly cardDeckSectionsToCardDeckSectionsApiV1Converter: Converter<
      CardDeckSections,
      CardDeckSectionsApiV1
    >,
    @inject(
      GAME_ADAPTER_TYPES.api.converter
        .GAME_FORMAT_TO_GAME_FORMAT_API_V1_CONVERTER,
    )
    private readonly gameFormatToGameFormatApiV1Converter: Converter<
      GameFormat,
      GameFormatApiV1
    >,
  ) {}

  public transform(input: CardDeck): CardDeckApiV1 {
    return {
      description: input.description,
      format: this.gameFormatToGameFormatApiV1Converter.transform(input.format),
      id: input.id,
      name: input.name,
      sections: this.cardDeckSectionsToCardDeckSectionsApiV1Converter.transform(
        input.sections,
      ),
    };
  }
}
