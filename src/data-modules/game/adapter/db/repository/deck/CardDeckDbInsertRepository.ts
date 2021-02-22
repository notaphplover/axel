import { inject, injectable } from 'inversify';
import mongodb from 'mongodb';

import { Converter } from '../../../../../../common/domain';
import {
  MongoDbConnector,
  mongodbAdapter,
} from '../../../../../../integration-modules/mongodb/adapter';
import { MongoDbInsertRepository } from '../../../../../../integration-modules/mongodb/adapter/MongoDbInsertRepository';
import { CardDeck } from '../../../../domain/model/deck/CardDeck';
import { CardDeckCreationQuery } from '../../../../domain/query/deck/CardDeckCreationQuery';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { CardDeckDb } from '../../model/deck/CardDeckDb';


@injectable()
export class CardDeckDbInsertRepository extends MongoDbInsertRepository<
  CardDeck,
  CardDeckDb,
  CardDeckCreationQuery
> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @inject(GAME_ADAPTER_TYPES.db.collection.deck.DECK_COLLECTION_NAME)
    collectionName: string,
    @inject(
      GAME_ADAPTER_TYPES.db.converter.deck.CARD_DECK_DB_TO_CARD_DECK_CONVERTER,
    )
    cardDeckDbToCardDeckConverter: Converter<CardDeckDb, CardDeck>,
    @inject(mongodbAdapter.config.types.db.MONGODB_CONNECTOR)
    mongoDbConnector: MongoDbConnector,
    @inject(
      GAME_ADAPTER_TYPES.db.converter.deck
        .CARD_DECK_CREATION_QUERY_TO_CARD_DBS_CONVERTER,
    )
    cardDeckCreationQueryToCardDeckDbsConverter: Converter<
      CardDeckCreationQuery,
      mongodb.OptionalId<CardDeckDb>[]
    >,
  ) {
    super(
      collectionName,
      cardDeckDbToCardDeckConverter,
      mongoDbConnector,
      cardDeckCreationQueryToCardDeckDbsConverter,
    );
  }
}
