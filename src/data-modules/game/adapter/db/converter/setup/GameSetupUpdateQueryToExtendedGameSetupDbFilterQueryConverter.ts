import { FilterQuery, MongooseFilterQuery, Types } from 'mongoose';
import { Converter } from '../../../../../../common/domain';
import { ExtendedGameSetupDb } from '../../model/setup/ExtendedGameSetupDb';
import { GameSetupUpdateQuery } from '../../../../domain/query/setup/GameSetupUpdateQuery';
import { PlayerReference } from '../../../../domain/model/setup/PlayerReference';
import { PlayerSetup } from '../../../../domain/model/setup/PlayerSetup';
import _ from 'lodash';
import { injectable } from 'inversify';
import { lodashAdapter } from '../../../../../../integration-modules/lodash/adapter';
import mongodb from 'mongodb';

@injectable()
export class GameSetupUpdateQueryToExtendedGameSetupDbFilterQueryConverter
  implements Converter<GameSetupUpdateQuery, FilterQuery<ExtendedGameSetupDb>> {
  public transform(
    input: GameSetupUpdateQuery,
  ): FilterQuery<ExtendedGameSetupDb> {
    let playerSetupUserIdFilter:
      | mongodb.Condition<string[]>
      | undefined = undefined;

    playerSetupUserIdFilter = this.transformAdditionalPlayerSetups(
      input,
      playerSetupUserIdFilter,
    );

    playerSetupUserIdFilter = this.transformRemovePlayerSetups(
      input,
      playerSetupUserIdFilter,
    );

    const filterQuery: MongooseFilterQuery<ExtendedGameSetupDb> = {
      _id: Types.ObjectId(input.id),
      'playerSetups.userId': playerSetupUserIdFilter,
    };

    return filterQuery;
  }

  private transformAdditionalPlayerSetups(
    input: GameSetupUpdateQuery,
    playerSetupUserIdFilter: mongodb.Condition<string[]> | undefined,
  ): mongodb.Condition<string[]> | undefined {
    if (input.additionalPlayerSetups !== undefined) {
      if (playerSetupUserIdFilter === undefined) {
        playerSetupUserIdFilter = {};
      }

      playerSetupUserIdFilter = _.mergeWith(
        playerSetupUserIdFilter,
        {
          $not: {
            $all: input.additionalPlayerSetups.map(
              (additionalPlayerSetup: PlayerSetup) =>
                additionalPlayerSetup.userId,
            ),
          },
        },
        lodashAdapter.mergeWithArrayCustomizer,
      );
    }

    return playerSetupUserIdFilter;
  }

  private transformRemovePlayerSetups(
    input: GameSetupUpdateQuery,
    playerSetupUserIdFilter: mongodb.Condition<string[]> | undefined,
  ): mongodb.Condition<string[]> | undefined {
    if (input.removePlayerSetups !== undefined) {
      if (playerSetupUserIdFilter === undefined) {
        playerSetupUserIdFilter = {};
      }

      playerSetupUserIdFilter = _.mergeWith(
        playerSetupUserIdFilter,
        {
          $in: input.removePlayerSetups.map(
            (playerReference: PlayerReference) => playerReference.userId,
          ),
        },
        lodashAdapter.mergeWithArrayCustomizer,
      );
    }

    return playerSetupUserIdFilter;
  }
}
