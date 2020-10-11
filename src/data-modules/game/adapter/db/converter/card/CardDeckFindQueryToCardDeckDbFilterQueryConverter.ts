import { FilterQuery, Types } from 'mongoose';
import { CardDeckDb } from '../../model/card/CardDeckDb';
import { CardDeckFindQuery } from '../../../../domain/query/card/CardDeckFindQuery';
import { Converter } from '../../../../../../common/domain';
import { hasValue } from '../../../../../../common/domain/utils/hasValue';
import { injectable } from 'inversify';

@injectable()
export class CardDeckFindQueryToCardDeckDbFilterQueryConverter
  implements Converter<CardDeckFindQuery, FilterQuery<CardDeckDb>> {
  public transform(input: CardDeckFindQuery): FilterQuery<CardDeckDb> {
    const filterQuery: FilterQuery<CardDeckDb> = {};

    if (hasValue(input.id)) {
      filterQuery._id = Types.ObjectId(input.id);
    }

    return filterQuery;
  }
}
