import { injectable } from 'inversify';
import mongodb from 'mongodb';

import { Converter } from '../../../../../../common/domain';
import { GameSetupDeletionQuery } from '../../../../domain/query/setup/GameSetupDeletionQuery';
import { GameSetupDb } from '../../model/setup/GameSetupDb';

@injectable()
export class GameSetupDeletionQueryToGameSetupDbFilterConverter
  implements
    Converter<GameSetupDeletionQuery, mongodb.FilterQuery<GameSetupDb>>
{
  public transform(
    input: GameSetupDeletionQuery,
  ): mongodb.FilterQuery<GameSetupDb> {
    const andFilterQuery: mongodb.FilterQuery<GameSetupDb>[] = [];

    andFilterQuery.push({ _id: new mongodb.ObjectID(input.id) });

    const filterQuery: mongodb.FilterQuery<GameSetupDb> = {};

    if (andFilterQuery.length > 0) {
      filterQuery.$and = andFilterQuery;
    }

    return filterQuery;
  }
}
