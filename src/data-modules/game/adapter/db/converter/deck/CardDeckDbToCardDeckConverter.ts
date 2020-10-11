import { CardDeck } from '../../../../domain/model/deck/CardDeck';
import { CardDeckDb } from '../../model/deck/CardDeckDb';
import { Converter } from '../../../../../../common/domain';
import { injectable } from 'inversify';

@injectable()
export class CardDeckDbToCardDeckConverter
  implements Converter<CardDeckDb, CardDeck> {
  public transform(input: CardDeckDb): CardDeck {
    return {
      description: input.description,
      format: input.format,
      id: input._id.toHexString(),
      name: input.name,
      sections: {
        core: {
          references: [...input.sections.core.references],
        },
        sideboard: {
          references: [...input.sections.sideboard.references],
        },
      },
    };
  }
}
