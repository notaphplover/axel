import { injectable } from 'inversify';
import mongodb from 'mongodb';

import { Converter } from '../../../../../../common/domain';
import { hasValue } from '../../../../../../common/domain/utils/hasValue';
import { CardType } from '../../../../domain/model/card/CardType';
import { CardFindQuery } from '../../../../domain/query/card/CardFindQuery';
import { CardDb } from '../../model/card/CardDb';

@injectable()
export class CardFindQueryToCardDbFilterQueryConverter
  implements Converter<CardFindQuery, mongodb.FilterQuery<CardDb>> {
  public transform(input: CardFindQuery): mongodb.FilterQuery<CardDb> {
    const andFilterQuery: mongodb.FilterQuery<CardDb>[] = [];

    if (hasValue(input.id)) {
      andFilterQuery.push({ _id: new mongodb.ObjectID(input.id) });
    }

    if (hasValue(input.types)) {
      if (Array.isArray(input.types)) {
        if (input.types.length > 0) {
          andFilterQuery.push({
            $or: input.types.map((type: CardType) => {
              return { types: type };
            }),
          });
        }
      } else {
        andFilterQuery.push({ types: input.types });
      }
    }

    const filterQuery: mongodb.FilterQuery<CardDb> = {};

    if (andFilterQuery.length > 0) {
      filterQuery.$and = andFilterQuery;
    }

    return filterQuery;
  }
}
