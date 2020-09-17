import { Converter } from '../../../../../common/domain';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { LandCreationQuery } from '../../../../domain/query/card/LandCreationQuery';
import { LandDb } from '../../model/card/LandDb';
import { Model } from 'mongoose';
import { inject } from 'inversify';

export class LandCreationQueryToLandDbsConverter
  implements Converter<LandCreationQuery, LandDb[]> {
  constructor(
    @inject(GAME_ADAPTER_TYPES.db.model.card.LAND_DB_MODEL)
    private readonly artifactDbModel: Model<LandDb>,
  ) {}

  public transform(input: LandCreationQuery): LandDb[] {
    return [
      new this.artifactDbModel({
        cost: input.cost,
        type: input.type,
      }),
    ];
  }
}
