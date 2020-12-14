import { inject, injectable } from 'inversify';
import { Converter } from '../../../../../../common/domain';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { LandCreationQuery } from '../../../../domain/query/card/LandCreationQuery';
import { LandDb } from '../../model/card/LandDb';
import { Model } from 'mongoose';
import mongodb from 'mongodb';

@injectable()
export class LandCreationQueryToLandDbsConverter
  implements Converter<LandCreationQuery, mongodb.OptionalId<LandDb>[]> {
  constructor(
    @inject(GAME_ADAPTER_TYPES.db.model.card.LAND_DB_MODEL)
    private readonly artifactDbModel: Model<LandDb>,
  ) {}

  public transform(input: LandCreationQuery): mongodb.OptionalId<LandDb>[] {
    return [
      {
        cost: input.cost,
        detail: input.detail,
        type: input.type,
      } as LandDb,
    ];
  }
}
