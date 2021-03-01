import { inject, injectable } from 'inversify';

import { Converter } from '../../../../../../common/domain';
import { CardSetReferences } from '../../../../domain/model/deck/CardSetReferences';
import { Library } from '../../../../domain/model/live/Library';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { CardSetReferencesApiV1 } from '../../model/deck/CardSetReferencesApiV1';
import { LibraryApiV1 } from '../../model/live/LibraryApiV1';

@injectable()
export class LibraryToLibraryApiV1Converter
  implements Converter<Library, LibraryApiV1> {
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
  public transform(library: Library): LibraryApiV1 {
    return {
      cards: this.cardSetReferencesToCardSetReferencesApiV1Converter.transform(
        library.cards,
      ),
    };
  }
}
