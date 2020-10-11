import { FilterQuery, Model } from 'mongoose';
import { inject, injectable } from 'inversify';
import { Card } from '../../../../domain/model/card/Card';
import { CardDb } from '../../model/card/CardDb';
import { CardFindQuery } from '../../../../domain/query/card/CardFindQuery';
import { Converter } from '../../../../../common/domain';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { MongooseSearchRepository } from '../../../../../layer-modules/db/adapter';

@injectable()
export class CardDbSearchRepository extends MongooseSearchRepository<
  Card,
  CardDb,
  CardFindQuery
> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @inject(GAME_ADAPTER_TYPES.db.model.card.CARD_DB_MODEL)
    model: Model<CardDb>,
    @inject(GAME_ADAPTER_TYPES.db.converter.card.CARD_DB_TO_CARD_CONVERTER)
    cardDbToCardConverter: Converter<CardDb, Card>,
    @inject(
      GAME_ADAPTER_TYPES.db.converter.card
        .CARD_FIND_QUERY_TO_CARD_DB_FILTER_QUERY_CONVERTER,
    )
    cardFindQueryToCardDbFilterQueryConverter: Converter<
      CardFindQuery,
      FilterQuery<CardDb>
    >,
  ) {
    super(
      model,
      cardDbToCardConverter,
      cardFindQueryToCardDbFilterQueryConverter,
    );
  }
}
