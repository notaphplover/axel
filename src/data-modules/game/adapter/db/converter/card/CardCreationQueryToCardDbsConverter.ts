import { injectable } from 'inversify';
import mongodb from 'mongodb';

import { Converter } from '../../../../../../common/domain';
import { CardCreationQuery } from '../../../../domain/query/card/CardCreationQuery';
import { CardDb } from '../../model/card/CardDb';

@injectable()
export class CardCreationQueryToCardDbsConverter
  implements Converter<CardCreationQuery, mongodb.OptionalId<CardDb>[]>
{
  public transform(input: CardCreationQuery): mongodb.OptionalId<CardDb>[] {
    return [
      {
        cost: input.cost,
        detail: input.detail,
        types: [...input.types],
        power: input.power,
        toughness: input.toughness,
        subtypes: [],
        supertypes: [],
      },
    ];
  }
}
