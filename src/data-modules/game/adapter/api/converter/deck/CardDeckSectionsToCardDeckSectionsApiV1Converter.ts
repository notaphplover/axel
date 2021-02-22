import { inject, injectable } from 'inversify';

import { Converter } from '../../../../../../common/domain';
import { CardDeckSections } from '../../../../domain/model/deck/CardDeckSections';
import { CardSetReferences } from '../../../../domain/model/deck/CardSetReferences';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { CardDeckSectionsApiV1 } from '../../model/deck/CardDeckSectionsApiV1';
import { CardSetReferencesApiV1 } from '../../model/deck/CardSetReferencesApiV1';

@injectable()
export class CardDeckSectionsToCardDeckSectionsApiV1Converter
  implements Converter<CardDeckSections, CardDeckSectionsApiV1> {
  constructor(
    @inject(
      GAME_ADAPTER_TYPES.api.converter.deck
        .CARD_SET_REFERENCES_TO_CARD_SET_REFERENCES_API_V1_CONVERTER,
    )
    private readonly cardSetReferencesToCardSetReferencesApiV1Converter: Converter<
      CardSetReferences,
      CardSetReferencesApiV1
    >,
  ) {}

  public transform(input: CardDeckSections): CardDeckSectionsApiV1 {
    return {
      core: this.cardSetReferencesToCardSetReferencesApiV1Converter.transform(
        input.core,
      ),
      sideboard: this.cardSetReferencesToCardSetReferencesApiV1Converter.transform(
        input.sideboard,
      ),
    };
  }
}
