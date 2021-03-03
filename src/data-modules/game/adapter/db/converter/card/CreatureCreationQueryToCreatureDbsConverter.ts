import { injectable } from 'inversify';
import mongodb from 'mongodb';

import { Converter } from '../../../../../../common/domain';
import { CreatureCreationQuery } from '../../../../domain/query/card/CreatureCreationQuery';
import { CreatureDb } from '../../model/card/CreatureDb';

@injectable()
export class CreatureCreationQueryToCreatureDbsConverter
  implements
    Converter<CreatureCreationQuery, mongodb.OptionalId<CreatureDb>[]> {
  public transform(
    input: CreatureCreationQuery,
  ): mongodb.OptionalId<CreatureDb>[] {
    return [
      {
        cost: input.cost,
        detail: input.detail,
        type: input.type,
        power: input.power,
        toughness: input.toughness,
        subtypes: [],
        supertypes: [],
      },
    ];
  }
}
