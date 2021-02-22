import { inject, injectable } from 'inversify';
import mongodb from 'mongodb';

import { Converter } from '../../../../../../common/domain';
import {
  MongoDbConnector,
  mongodbAdapter,
} from '../../../../../../integration-modules/mongodb/adapter';
import { MongoDbInsertRepository } from '../../../../../../integration-modules/mongodb/adapter/MongoDbInsertRepository';
import { Creature } from '../../../../domain/model/card/Creature';
import { CreatureCreationQuery } from '../../../../domain/query/card/CreatureCreationQuery';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { CreatureDb } from '../../model/card/CreatureDb';

@injectable()
export class CreatureDbInsertRepository extends MongoDbInsertRepository<
  Creature,
  CreatureDb,
  CreatureCreationQuery
> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @inject(GAME_ADAPTER_TYPES.db.collection.card.CARD_COLLECTION_NAME)
    collectionName: string,
    @inject(
      GAME_ADAPTER_TYPES.db.converter.card.CREATURE_DB_TO_CREATURE_CONVERTER,
    )
    creatureDbToCreatureConverter: Converter<CreatureDb, Creature>,
    @inject(mongodbAdapter.config.types.db.MONGODB_CONNECTOR)
    mongoDbConnector: MongoDbConnector,
    @inject(
      GAME_ADAPTER_TYPES.db.converter.card
        .CREATURE_CREATION_QUERY_TO_CREATURE_DBS_CONVERTER,
    )
    creatureCreationQueryToCreatureDbsConverter: Converter<
      CreatureCreationQuery,
      mongodb.OptionalId<CreatureDb>[]
    >,
  ) {
    super(
      collectionName,
      creatureDbToCreatureConverter,
      mongoDbConnector,
      creatureCreationQueryToCreatureDbsConverter,
    );
  }
}
