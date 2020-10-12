import { CardSetReferences } from '../../../../domain/model/deck/CardSetReferences';
import { CardSetReferencesApiV1 } from '../../model/deck/CardSetReferencesApiV1';
import { Converter } from '../../../../../../common/domain';
import { injectable } from 'inversify';

@injectable()
export class CardSetReferencesToCardSetReferencesApiV1Converter
  implements Converter<CardSetReferences, CardSetReferencesApiV1> {
  public transform(input: CardSetReferences): CardSetReferencesApiV1 {
    return {
      references: [...input.references],
    };
  }
}
