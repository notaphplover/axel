import { FilterQuery as MongooseFilterQuery, Types } from 'mongoose';
import { CardDb } from '../../model/card/CardDb';
import { CardFindQuery } from '../../../../domain/query/card/CardFindQuery';
import { CardType } from '../../../../domain/model/card/CardType';
import { Converter } from '../../../../../../common/domain';
import { FilterQuery as MongoDbFilterQuery } from 'mongodb';
import { hasValue } from '../../../../../../common/domain/utils/hasValue';
import { injectable } from 'inversify';

@injectable()
export class CardFindQueryToCardDbFilterQueryConverter
  implements Converter<CardFindQuery, MongooseFilterQuery<CardDb>> {
  public transform(input: CardFindQuery): MongooseFilterQuery<CardDb> {
    const andFilterQuery: MongoDbFilterQuery<CardDb>[] = [];
    const filterQuery: MongooseFilterQuery<CardDb> = { $and: andFilterQuery };

    if (hasValue(input.id)) {
      andFilterQuery.push({ _id: Types.ObjectId(input.id) });
    }

    if (hasValue(input.types)) {
      if (Array.isArray(input.types)) {
        andFilterQuery.push({
          $or: input.types.map((type: CardType) => {
            return { type };
          }),
        });
      } else {
        andFilterQuery.push({ type: input.types });
      }
    }

    return filterQuery;
  }
}
