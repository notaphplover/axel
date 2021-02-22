import { inject, injectable } from 'inversify';
import mongodb from 'mongodb';

import { Converter } from '../../../../../../common/domain';
import {
  MongoDbConnector,
  mongodbAdapter,
} from '../../../../../../integration-modules/mongodb/adapter';
import { MongoDbPaginatedSearchRepository } from '../../../../../../integration-modules/mongodb/adapter/MongoDbPaginatedSearchRepository';
import { Card } from '../../../../domain/model/card/Card';
import { CardFindQuery } from '../../../../domain/query/card/CardFindQuery';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { CardDb } from '../../model/card/CardDb';


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
