import { injectable } from 'inversify';
import mongodb from 'mongodb';

import { commonDomain, Converter } from '../../../../../../common/domain';
import { GameSetupFindQuery } from '../../../../domain/query/setup/GameSetupFindQuery';
import { GameSetupFindQueryPlayerSetup } from '../../../../domain/query/setup/GameSetupFindQueryPlayerSetup';
import { GameSetupDb } from '../../model/setup/GameSetupDb';

const hasValue: <TType>(
  value: TType,
) => value is Exclude<TType, null | undefined> = commonDomain.utils.hasValue;

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
