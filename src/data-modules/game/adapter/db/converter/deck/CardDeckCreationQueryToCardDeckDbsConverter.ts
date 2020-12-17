import { CardDeckCreationQuery } from '../../../../domain/query/deck/CardDeckCreationQuery';
import { CardDeckDb } from '../../model/deck/CardDeckDb';
import { Converter } from '../../../../../../common/domain';
import { injectable } from 'inversify';
import mongodb from 'mongodb';

@injectable()
export class CardDeckCreationQueryToCardDeckDbsConverter
  implements
    Converter<CardDeckCreationQuery, mongodb.OptionalId<CardDeckDb>[]> {
  public transform(
    input: CardDeckCreationQuery,
  ): mongodb.OptionalId<CardDeckDb>[] {
    return [
      {
        description: input.description,
        format: input.format,
        name: input.name,
        sections: {
          core: {
            references: [...input.sections.core.references],
          },
          sideboard: {
            references: [...input.sections.sideboard.references],
          },
        },
      },
    ];
  }
}
