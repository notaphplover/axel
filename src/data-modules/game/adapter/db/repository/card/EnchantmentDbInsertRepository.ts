import {
  MongoDbConnector,
  mongodbAdapter,
} from '../../../../../../integration-modules/mongodb/adapter';
import { inject, injectable } from 'inversify';
import { Converter } from '../../../../../../common/domain';
import { Enchantment } from '../../../../domain/model/card/Enchantment';
import { EnchantmentCreationQuery } from '../../../../domain/query/card/EnchantmentCreationQuery';
import { EnchantmentDb } from '../../model/card/EnchantmentDb';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { MongoDbInsertRepository } from '../../../../../../integration-modules/mongodb/adapter/MongoDbInsertRepository';
import mongodb from 'mongodb';

@injectable()
export class EnchantmentDbInsertRepository extends MongoDbInsertRepository<
  Enchantment,
  EnchantmentDb,
  EnchantmentCreationQuery
> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @inject(GAME_ADAPTER_TYPES.db.collection.card.CARD_COLLECTION_NAME)
    collectionName: string,
    @inject(
      GAME_ADAPTER_TYPES.db.converter.card
        .ENCHANTMENT_DB_TO_ENCHANTMENT_CONVERTER,
    )
    enchantmentDbToEnchantmentConverter: Converter<EnchantmentDb, Enchantment>,
    @inject(mongodbAdapter.config.types.db.MONGODB_CONNECTOR)
    mongoDbConnector: MongoDbConnector,
    @inject(
      GAME_ADAPTER_TYPES.db.converter.card
        .ENCHANTMENT_CREATION_QUERY_TO_ENCHANTMENT_DBS_CONVERTER,
    )
    enchantmentCreationQueryToEnchantmentDbsConverter: Converter<
      EnchantmentCreationQuery,
      mongodb.OptionalId<EnchantmentDb>[]
    >,
  ) {
    super(
      collectionName,
      enchantmentDbToEnchantmentConverter,
      mongoDbConnector,
      enchantmentCreationQueryToEnchantmentDbsConverter,
    );
  }
}
