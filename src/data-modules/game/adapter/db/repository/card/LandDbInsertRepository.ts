import { inject, injectable } from 'inversify';
import mongodb from 'mongodb';

import { Converter } from '../../../../../../common/domain';
import {
  MongoDbConnector,
  mongodbAdapter,
} from '../../../../../../integration-modules/mongodb/adapter';
import { MongoDbInsertRepository } from '../../../../../../integration-modules/mongodb/adapter/MongoDbInsertRepository';
import { Land } from '../../../../domain/model/card/Land';
import { LandCreationQuery } from '../../../../domain/query/card/LandCreationQuery';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { LandDb } from '../../model/card/LandDb';


@injectable()
export class LandDbInsertRepository extends MongoDbInsertRepository<
  Land,
  LandDb,
  LandCreationQuery
> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @inject(GAME_ADAPTER_TYPES.db.collection.card.CARD_COLLECTION_NAME)
    collectionName: string,
    @inject(GAME_ADAPTER_TYPES.db.converter.card.LAND_DB_TO_LAND_CONVERTER)
    landDbToLandConverter: Converter<LandDb, Land>,
    @inject(mongodbAdapter.config.types.db.MONGODB_CONNECTOR)
    mongoDbConnector: MongoDbConnector,
    @inject(
      GAME_ADAPTER_TYPES.db.converter.card
        .LAND_CREATION_QUERY_TO_LAND_DBS_CONVERTER,
    )
    landCreationQueryToLandDbsConverter: Converter<
      LandCreationQuery,
      mongodb.OptionalId<LandDb>[]
    >,
  ) {
    super(
      collectionName,
      landDbToLandConverter,
      mongoDbConnector,
      landCreationQueryToLandDbsConverter,
    );
  }
}
