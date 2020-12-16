import { FilterQuery, Types } from 'mongoose';
import { Converter } from '../../../../../../common/domain';
import { ExtendedGameSetupDb } from '../../model/setup/ExtendedGameSetupDb';
import { GameSetupFindQuery } from '../../../../domain/query/setup/GameSetupFindQuery';
import { GameSetupFindQueryPlayerSetup } from '../../../../domain/query/setup/GameSetupFindQueryPlayerSetup';
import { FilterQuery as MongoDbFilterQuery } from 'mongodb';
import { hasValue } from '../../../../../../common/domain/utils/hasValue';
import { injectable } from 'inversify';

@injectable()
export class GameSetupFindQueryToExtendedGameSetupDbFilterQueryConverter
  implements Converter<GameSetupFindQuery, FilterQuery<ExtendedGameSetupDb>> {
  public transform(
    input: GameSetupFindQuery,
  ): FilterQuery<ExtendedGameSetupDb> {
    const andFilterQuery: MongoDbFilterQuery<ExtendedGameSetupDb>[] = [];

    if (hasValue(input.format)) {
      andFilterQuery.push({ format: input.format });
    }

    if (hasValue(input.id)) {
      andFilterQuery.push({ _id: Types.ObjectId(input.id) });
    }

    if (hasValue(input.ownerUserId)) {
      andFilterQuery.push({ ownerUserId: input.ownerUserId });
    }

    if (hasValue(input.playerSetups) && input.playerSetups.length > 0) {
      const playerSetupsFilterQuery: MongoDbFilterQuery<ExtendedGameSetupDb>[] = input.playerSetups.map(
        (playerSetup: GameSetupFindQueryPlayerSetup) => {
          return { 'playerSetups.userId': playerSetup.userId };
        },
      );

      andFilterQuery.push({ $and: playerSetupsFilterQuery });
    }

    if (hasValue(input.playerSlots)) {
      andFilterQuery.push({ playerSlots: input.playerSlots });
    }

    const filterQuery: FilterQuery<ExtendedGameSetupDb> = {};

    if (andFilterQuery.length > 0) {
      filterQuery.$and = andFilterQuery;
    }

    return filterQuery;
  }
}
