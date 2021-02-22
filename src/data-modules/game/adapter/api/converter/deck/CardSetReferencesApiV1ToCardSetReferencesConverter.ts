import { injectable } from 'inversify';

import { Converter } from '../../../../../../common/domain';
import { CardSetReferences } from '../../../../domain/model/deck/CardSetReferences';
import { CardSetReferencesApiV1 } from '../../model/deck/CardSetReferencesApiV1';

@injectable()
export class CardSetReferencesApiV1ToCardSetReferencesConverter
  implements Converter<CardSetReferencesApiV1, CardSetReferences> {
  public transform(input: CardSetReferencesApiV1): CardSetReferences {
    return {
      references: [...input.references],
    };
  }
}
