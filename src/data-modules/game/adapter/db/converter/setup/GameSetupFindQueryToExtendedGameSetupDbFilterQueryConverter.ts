import { Converter } from '../../../../../../common/domain';
import { ExtendedGameSetupDb } from '../../model/setup/ExtendedGameSetupDb';
import { GameSetupFindQuery } from '../../../../domain/query/setup/GameSetupFindQuery';
import { GameSetupFindQueryPlayerSetup } from '../../../../domain/query/setup/GameSetupFindQueryPlayerSetup';
import { hasValue } from '../../../../../../common/domain/utils/hasValue';
import { injectable } from 'inversify';
import mongodb from 'mongodb';

@injectable()
export class GameSetupFindQueryToExtendedGameSetupDbFilterQueryConverter
  implements
    Converter<GameSetupFindQuery, mongodb.FilterQuery<ExtendedGameSetupDb>> {
  public transform(
    input: GameSetupFindQuery,
  ): mongodb.FilterQuery<ExtendedGameSetupDb> {
    const andFilterQuery: mongodb.FilterQuery<ExtendedGameSetupDb>[] = [];

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
      const playerSetupsFilterQuery: mongodb.FilterQuery<ExtendedGameSetupDb>[] = input.playerSetups.map(
        (playerSetup: GameSetupFindQueryPlayerSetup) => {
          return { 'playerSetups.userId': playerSetup.userId };
        },
      );

      andFilterQuery.push({ $and: playerSetupsFilterQuery });
    }

    if (hasValue(input.playerSlots)) {
      andFilterQuery.push({ playerSlots: input.playerSlots });
    }

    const filterQuery: mongodb.FilterQuery<ExtendedGameSetupDb> = {};

    if (andFilterQuery.length > 0) {
      filterQuery.$and = andFilterQuery;
    }

    return filterQuery;
  }
}
