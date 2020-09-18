import { FilterQuery, MongooseFilterQuery, Types } from 'mongoose';
import { CardDb } from '../../model/card/CardDb';
import { CardFindQuery } from '../../../../domain/query/card/CardFindQuery';
import { CardType } from '../../../../domain/model/card/CardType';
import { Converter } from '../../../../../common/domain';
import { hasValue } from '../../../../../common/domain/utils/hasValue';
import { injectable } from 'inversify';

@injectable()
export class CardFindQueryToCardDbFilterQueryConverter
  implements Converter<CardFindQuery, FilterQuery<CardDb>> {
  public transform(input: CardFindQuery): MongooseFilterQuery<CardDb> {
    const andFilterQuery: FilterQuery<CardDb>[] = [];
    const filterQuery: FilterQuery<CardDb> = { $and: [] };

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
