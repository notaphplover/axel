import { CardDeckDb } from '../../model/deck/CardDeckDb';
import { CardDeckFindQuery } from '../../../../domain/query/deck/CardDeckFindQuery';
import { Converter } from '../../../../../../common/domain';
import { FilterQuery as MongoDbFilterQuery } from 'mongodb';
import { hasValue } from '../../../../../../common/domain/utils/hasValue';
import { injectable } from 'inversify';
import mongodb from 'mongodb';

@injectable()
export class CardDeckFindQueryToCardDeckDbFilterQueryConverter
  implements Converter<CardDeckFindQuery, mongodb.FilterQuery<CardDeckDb>> {
  public transform(input: CardDeckFindQuery): mongodb.FilterQuery<CardDeckDb> {
    const andFilterQuery: MongoDbFilterQuery<CardDeckDb>[] = [];
    const filterQuery: mongodb.FilterQuery<CardDeckDb> = {
      $and: andFilterQuery,
    };

    if (hasValue(input.id)) {
      andFilterQuery.push({
        _id: new mongodb.ObjectId(input.id),
      });
    }

    if (hasValue(input.ids) && input.ids.length > 0) {
      andFilterQuery.push({
        _id: {
          $in: input.ids.map((id: string) => new mongodb.ObjectId(id)),
        },
      });
    }

    return filterQuery;
  }
}
