import {
  MongoDbConnector,
  mongodbAdapter,
} from '../../../../../../integration-modules/mongodb/adapter';
import { inject, injectable } from 'inversify';
import { CardDeck } from '../../../../domain/model/deck/CardDeck';
import { CardDeckCreationQuery } from '../../../../domain/query/deck/CardDeckCreationQuery';
import { CardDeckDb } from '../../model/deck/CardDeckDb';
import { Converter } from '../../../../../../common/domain';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { MongoDbInsertRepository } from '../../../../../../integration-modules/mongodb/adapter/MongoDbInsertRepository';
import mongodb from 'mongodb';

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
