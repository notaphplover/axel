import { inject, injectable } from 'inversify';
import { Converter } from '../../../../../../common/domain';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { Land } from '../../../../domain/model/card/Land';
import { LandCreationQuery } from '../../../../domain/query/card/LandCreationQuery';
import { LandDb } from '../../model/card/LandDb';
import { Model } from 'mongoose';
import { MongooseInsertRepository } from '../../../../../../layer-modules/db/adapter';

@injectable()
export class LandDbInsertRepository extends MongooseInsertRepository<
  Land,
  LandCreationQuery,
  LandDb
> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @inject(GAME_ADAPTER_TYPES.db.model.card.LAND_DB_MODEL)
    model: Model<LandDb>,
    @inject(GAME_ADAPTER_TYPES.db.converter.card.LAND_DB_TO_LAND_CONVERTER)
    landDbToLandConverter: Converter<LandDb, Land>,
    @inject(
      GAME_ADAPTER_TYPES.db.converter.card
        .LAND_CREATION_QUERY_TO_LAND_DBS_CONVERTER,
    )
    landCreationQueryToLandDbsConverter: Converter<LandCreationQuery, LandDb[]>,
  ) {
    super(model, landDbToLandConverter, landCreationQueryToLandDbsConverter);
  }
}
