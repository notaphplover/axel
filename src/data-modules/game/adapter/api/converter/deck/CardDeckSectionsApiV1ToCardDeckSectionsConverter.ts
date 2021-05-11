import { inject, injectable } from 'inversify';

import { Converter } from '../../../../../../common/domain';
import { CardDeckSections } from '../../../../domain/model/deck/CardDeckSections';
import { CardSetReferences } from '../../../../domain/model/deck/CardSetReferences';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { CardDeckSectionsApiV1 } from '../../model/deck/CardDeckSectionsApiV1';
import { CardSetReferencesApiV1 } from '../../model/deck/CardSetReferencesApiV1';

@injectable()
export class CardDeckSectionsApiV1ToCardDeckSectionsConverter
  implements Converter<CardDeckSectionsApiV1, CardDeckSections>
{
  constructor(
    @inject(
      GAME_ADAPTER_TYPES.api.converter.deck
        .CARD_SET_REFERENCES_API_V1_TO_CARD_SET_REFERENCES_CONVERTER,
    )
    private readonly cardSetReferencesApiV1ToCardSetReferencesConverter: Converter<
      CardSetReferencesApiV1,
      CardSetReferences
    >,
  ) {}

  public transform(input: CardDeckSections): CardDeckSectionsApiV1 {
    return {
      core: this.cardSetReferencesApiV1ToCardSetReferencesConverter.transform(
        input.core,
      ),
      sideboard:
        this.cardSetReferencesApiV1ToCardSetReferencesConverter.transform(
          input.sideboard,
        ),
    };
  }
}
