import { CardDb } from '../../model/card/CardDb';
import { CardFindQuery } from '../../../../domain/query/card/CardFindQuery';
import { CardType } from '../../../../domain/model/card/CardType';
import { Converter } from '../../../../../../common/domain';
import { hasValue } from '../../../../../../common/domain/utils/hasValue';
import { injectable } from 'inversify';
import mongodb from 'mongodb';

@injectable()
export class CardFindQueryToCardDbFilterQueryConverter
  implements Converter<CardFindQuery, mongodb.FilterQuery<CardDb>> {
  public transform(input: CardFindQuery): mongodb.FilterQuery<CardDb> {
    const andFilterQuery: mongodb.FilterQuery<CardDb>[] = [];
    const filterQuery: mongodb.FilterQuery<CardDb> = { $and: andFilterQuery };

    if (hasValue(input.id)) {
      andFilterQuery.push({ _id: new mongodb.ObjectID(input.id) });
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
