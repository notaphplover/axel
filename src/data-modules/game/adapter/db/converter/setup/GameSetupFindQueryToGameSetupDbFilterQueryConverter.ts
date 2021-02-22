import { injectable } from 'inversify';
import mongodb from 'mongodb';

import { Converter } from '../../../../../../common/domain';
import { hasValue } from '../../../../../../common/domain/utils/hasValue';
import { GameSetupFindQuery } from '../../../../domain/query/setup/GameSetupFindQuery';
import { GameSetupFindQueryPlayerSetup } from '../../../../domain/query/setup/GameSetupFindQueryPlayerSetup';
import { GameSetupDb } from '../../model/setup/GameSetupDb';

@injectable()
export class GameSetupFindQueryToGameSetupDbFilterQueryConverter
  implements Converter<GameSetupFindQuery, mongodb.FilterQuery<GameSetupDb>> {
  public transform(
    input: GameSetupFindQuery,
  ): mongodb.FilterQuery<GameSetupDb> {
    const andFilterQuery: mongodb.FilterQuery<GameSetupDb>[] = [];

    if (hasValue(input.format)) {
      andFilterQuery.push({ format: input.format });
    }

    if (hasValue(input.id)) {
      andFilterQuery.push({ _id: new mongodb.ObjectID(input.id) });
    }

    if (hasValue(input.ownerUserId)) {
      andFilterQuery.push({ ownerUserId: input.ownerUserId });
    }

    if (hasValue(input.playerSetups) && input.playerSetups.length > 0) {
      const playerSetupsFilterQuery: mongodb.FilterQuery<GameSetupDb>[] = input.playerSetups.map(
        (playerSetup: GameSetupFindQueryPlayerSetup) => {
          return { 'playerSetups.userId': playerSetup.userId };
        },
      );

      andFilterQuery.push({ $and: playerSetupsFilterQuery });
    }

    if (hasValue(input.playerSlots)) {
      andFilterQuery.push({ playerSlots: input.playerSlots });
    }

    const filterQuery: mongodb.FilterQuery<GameSetupDb> = {};

    if (andFilterQuery.length > 0) {
      filterQuery.$and = andFilterQuery;
    }

    return filterQuery;
  }
}
