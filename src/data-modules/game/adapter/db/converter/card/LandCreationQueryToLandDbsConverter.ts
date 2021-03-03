import { injectable } from 'inversify';
import mongodb from 'mongodb';

import { Converter } from '../../../../../../common/domain';
import { LandCreationQuery } from '../../../../domain/query/card/LandCreationQuery';
import { LandDb } from '../../model/card/LandDb';

@injectable()
export class LandCreationQueryToLandDbsConverter
  implements Converter<LandCreationQuery, mongodb.OptionalId<LandDb>[]> {
  public transform(input: LandCreationQuery): mongodb.OptionalId<LandDb>[] {
    return [
      {
        cost: input.cost,
        detail: input.detail,
        type: input.type,
        subtypes: [],
        supertypes: [],
      },
    ];
  }
}
