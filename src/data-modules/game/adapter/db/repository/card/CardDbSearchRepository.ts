import {
  MongoDbConnector,
  mongodbAdapter,
} from '../../../../../../integration-modules/mongodb/adapter';
import { inject, injectable } from 'inversify';
import { Card } from '../../../../domain/model/card/Card';
import { CardDb } from '../../model/card/CardDb';
import { CardFindQuery } from '../../../../domain/query/card/CardFindQuery';
import { Converter } from '../../../../../../common/domain';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { MongoDbPaginatedSearchRepository } from '../../../../../../integration-modules/mongodb/adapter/MongoDbPaginatedSearchRepository';
import mongodb from 'mongodb';

@injectable()
export class CardDbSearchRepository extends MongoDbPaginatedSearchRepository<
  Card,
  CardDb,
  CardDb,
  CardFindQuery
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
        .CARD_FIND_QUERY_TO_CARD_DB_FILTER_QUERY_CONVERTER,
    )
    cardFindQueryToCardDbFilterQueryConverter: Converter<
      CardFindQuery,
      mongodb.FilterQuery<CardDb>
    >,
  ) {
    super(
      collectionName,
      cardDbToCardConverter,
      mongoDbConnector,
      cardFindQueryToCardDbFilterQueryConverter,
    );
  }
}
