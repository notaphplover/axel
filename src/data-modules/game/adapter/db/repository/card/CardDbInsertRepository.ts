import { inject, injectable } from 'inversify';
import mongodb from 'mongodb';

import { Converter } from '../../../../../../common/domain';
import {
  MongoDbConnector,
  MongoDbInsertRepository,
  mongodbAdapter,
} from '../../../../../../integration-modules/mongodb/adapter';
import { Card } from '../../../../domain/model/card/Card';
import { CardCreationQuery } from '../../../../domain/query/card/CardCreationQuery';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { CardDb } from '../../model/card/CardDb';

@injectable()
export class CardDbInsertRepository extends MongoDbInsertRepository<
  Card,
  CardDb,
  CardCreationQuery
> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @inject(GAME_ADAPTER_TYPES.db.collection.card.CARD_COLLECTION_NAME)
    collectionName: string,
    @inject(GAME_ADAPTER_TYPES.db.converter.card.CARD_DB_TO_CARD_CONVERTER)
    cardDbToCardConverter: Converter<CardDb, Card>,
    @inject(mongodbAdapter.config.types.db.MONGODB_CONNECTOR)
    mongoDbConnector: MongoDbConnector,
    @inject(
      GAME_ADAPTER_TYPES.db.converter.card
        .CARD_CREATION_QUERY_TO_CARD_DBS_CONVERTER,
    )
    cardCreationQueryToCardDbsConverter: Converter<
      CardCreationQuery,
      mongodb.OptionalId<CardDb>[]
    >,
  ) {
    super(
      collectionName,
      cardDbToCardConverter,
      mongoDbConnector,
      cardCreationQueryToCardDbsConverter,
    );
  }
}
