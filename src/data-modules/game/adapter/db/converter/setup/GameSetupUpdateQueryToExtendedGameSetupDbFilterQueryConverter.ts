import { FilterQuery, MongooseFilterQuery, Types } from 'mongoose';
import { Converter } from '../../../../../../common/domain';
import { ExtendedGameSetupDb } from '../../model/setup/ExtendedGameSetupDb';
import { GameSetupUpdateQuery } from '../../../../domain/query/setup/GameSetupUpdateQuery';
import { PlayerSetup } from '../../../../domain/model/setup/PlayerSetup';
import { injectable } from 'inversify';
import mongodb from 'mongodb';

@injectable()
export class GameSetupUpdateQueryToExtendedGameSetupDbFilterQueryConverter
  implements Converter<GameSetupUpdateQuery, FilterQuery<ExtendedGameSetupDb>> {
  public transform(
    input: GameSetupUpdateQuery,
  ): FilterQuery<ExtendedGameSetupDb> {
    let additionalPlayerSetupUserIdFilter:
      | mongodb.Condition<string[]>
      | undefined;

    if (input.additionalPlayerSetups === undefined) {
      additionalPlayerSetupUserIdFilter = undefined;
    } else {
      additionalPlayerSetupUserIdFilter = {
        $not: {
          $all: input.additionalPlayerSetups.map(
            (additionalPlayerSetup: PlayerSetup) =>
              additionalPlayerSetup.userId,
          ),
        },
      };
    }

    const filterQuery: MongooseFilterQuery<ExtendedGameSetupDb> = {
      _id: Types.ObjectId(input.id),
      'playerSetups.userId': additionalPlayerSetupUserIdFilter,
    };

    return filterQuery;
  }
}
