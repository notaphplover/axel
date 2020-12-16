import { FilterQuery, Types } from 'mongoose';
import { CardDeckDb } from '../../model/deck/CardDeckDb';
import { CardDeckFindQuery } from '../../../../domain/query/deck/CardDeckFindQuery';
import { Converter } from '../../../../../../common/domain';
import { FilterQuery as MongoDbFilterQuery } from 'mongodb';
import { hasValue } from '../../../../../../common/domain/utils/hasValue';
import { injectable } from 'inversify';

@injectable()
export class CardDeckFindQueryToCardDeckDbFilterQueryConverter
  implements Converter<CardDeckFindQuery, FilterQuery<CardDeckDb>> {
  public transform(input: CardDeckFindQuery): FilterQuery<CardDeckDb> {
    const andFilterQuery: MongoDbFilterQuery<CardDeckDb>[] = [];
    const filterQuery: FilterQuery<CardDeckDb> = {
      $and: andFilterQuery,
    };

    if (hasValue(input.id)) {
      andFilterQuery.push({
        _id: Types.ObjectId(input.id),
      });
    }

    if (hasValue(input.ids) && input.ids.length > 0) {
      andFilterQuery.push({
        _id: {
          $in: input.ids.map((id: string) => Types.ObjectId(id)),
        },
      });
    }

    return filterQuery;
  }
}
