import { CardSetReferences } from '../../../../domain/model/deck/CardSetReferences';
import { CardSetReferencesApiV1 } from '../../model/deck/CardSetReferencesApiV1';
import { Converter } from '../../../../../../common/domain';
import { injectable } from 'inversify';

@injectable()
export class CardSetReferencesApiV1ToCardSetReferencesConverter
  implements Converter<CardSetReferencesApiV1, CardSetReferences> {
  public transform(input: CardSetReferencesApiV1): CardSetReferences {
    return {
      references: [...input.references],
    };
  }
}
