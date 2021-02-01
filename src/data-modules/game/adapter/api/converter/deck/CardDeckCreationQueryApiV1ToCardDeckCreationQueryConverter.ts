import { inject, injectable } from 'inversify';
import { CardDeckCreationQuery } from '../../../../domain/query/deck/CardDeckCreationQuery';
import { CardDeckCreationQueryApiV1 } from '../../query/deck/CardDeckCreationQueryApiV1';
import { CardDeckSections } from '../../../../domain/model/deck/CardDeckSections';
import { CardDeckSectionsApiV1 } from '../../model/deck/CardDeckSectionsApiV1';
import { Converter } from '../../../../../../common/domain';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { GameFormat } from '../../../../domain/model/GameFormat';
import { GameFormatApiV1 } from '../../model/GameFormatApiV1';

@injectable()
export class CardDeckCreationQueryApiV1ToCardDeckCreationQueryConverter
  implements
    Converter<CardDeckCreationQueryApiV1, Promise<CardDeckCreationQuery>> {
  constructor(
    @inject(
      GAME_ADAPTER_TYPES.api.converter.deck
        .CARD_DECK_SECTION_API_V1_TO_CARD_DECK_SECTIONS_CONVERTER,
    )
    private readonly cardDeckSectionsToCardDeckSectionsApiV1Converter: Converter<
      CardDeckSectionsApiV1,
      CardDeckSections
    >,
    @inject(
      GAME_ADAPTER_TYPES.api.converter
        .GAME_FORMAT_API_V1_TO_GAME_FORMAT_CONVERTER,
    )
    private readonly gameFormatApiV1ToGameFormatConverter: Converter<
      GameFormatApiV1,
      GameFormat
    >,
  ) {}

  public async transform(
    input: CardDeckCreationQueryApiV1,
  ): Promise<CardDeckCreationQuery> {
    return {
      description: input.description,
      format: this.gameFormatApiV1ToGameFormatConverter.transform(input.format),
      name: input.name,
      sections: this.cardDeckSectionsToCardDeckSectionsApiV1Converter.transform(
        input.sections,
      ),
    };
  }
}
