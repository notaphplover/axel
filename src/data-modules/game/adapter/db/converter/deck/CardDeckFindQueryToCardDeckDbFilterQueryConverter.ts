import { injectable } from 'inversify';
import mongodb from 'mongodb';

import { commonDomain, Converter } from '../../../../../../common/domain';
import { CardDeckFindQuery } from '../../../../domain/query/deck/CardDeckFindQuery';
import { CardDeckDb } from '../../model/deck/CardDeckDb';

const hasValue: <TType>(
  value: TType,
) => value is Exclude<TType, null | undefined> = commonDomain.utils.hasValue;

@injectable()
export class CardDeckFindQueryToCardDeckDbFilterQueryConverter
  implements Converter<CardDeckFindQuery, mongodb.FilterQuery<CardDeckDb>>
{
  public transform(input: CardDeckFindQuery): mongodb.FilterQuery<CardDeckDb> {
    const andFilterQuery: mongodb.FilterQuery<CardDeckDb>[] = [];
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
