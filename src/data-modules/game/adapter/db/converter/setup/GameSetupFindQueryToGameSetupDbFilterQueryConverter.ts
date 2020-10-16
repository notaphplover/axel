import { FilterQuery, MongooseFilterQuery, Types } from 'mongoose';
import { Converter } from '../../../../../../common/domain';
import { GameSetupDb } from '../../model/setup/GameSetupDb';
import { GameSetupFindQuery } from '../../../../domain/query/setup/GameSetupFindQuery';
import { GameSetupFindQueryPlayerSetup } from '../../../../domain/query/setup/GameSetupFindQueryPlayerSetup';
import { FilterQuery as MongoDbFilterQuery } from 'mongodb';
import { hasValue } from '../../../../../../common/domain/utils/hasValue';
import { injectable } from 'inversify';

@injectable()
export class GameSetupFindQueryToGameSetupDbFilterQueryConverter
  implements Converter<GameSetupFindQuery, FilterQuery<GameSetupDb>> {
  public transform(input: GameSetupFindQuery): FilterQuery<GameSetupDb> {
    const andFilterQuery: MongoDbFilterQuery<GameSetupDb>[] = [];
    const filterQuery: MongooseFilterQuery<GameSetupDb> = {
      $and: andFilterQuery,
    };

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
      const playerSetupsFilterQuery: MongoDbFilterQuery<
        GameSetupDb
      >[] = input.playerSetups.map(
        (playerSetup: GameSetupFindQueryPlayerSetup) => {
          return { 'playerSetup.userId': playerSetup.userId };
        },
      );

      andFilterQuery.push({ $and: playerSetupsFilterQuery });
    }

    if (hasValue(input.playerSlots)) {
      andFilterQuery.push({ playerSlots: input.playerSlots });
    }

    return filterQuery;
  }
}
