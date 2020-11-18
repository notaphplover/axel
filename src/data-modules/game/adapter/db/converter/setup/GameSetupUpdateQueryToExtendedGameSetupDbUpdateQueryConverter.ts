import { Converter } from '../../../../../../common/domain';
import { ExtendedGameSetupDb } from '../../model/setup/ExtendedGameSetupDb';
import { GameSetupUpdateQuery } from '../../../../domain/query/setup/GameSetupUpdateQuery';
import { PlayerReference } from '../../../../domain/model/setup/PlayerReference';
import { UpdateQuery } from 'mongoose';
import { injectable } from 'inversify';

@injectable()
export class GameSetupUpdateQueryToExtendedGameSetupDbUpdateQueryConverter
  implements Converter<GameSetupUpdateQuery, UpdateQuery<ExtendedGameSetupDb>> {
  public transform(
    input: GameSetupUpdateQuery,
  ): UpdateQuery<ExtendedGameSetupDb> {
    const updateQuery: unknown[] = [];

    if (input.additionalPlayerSetups !== undefined) {
      updateQuery.push({
        $addFields: {
          playerSetups: {
            $concatArrays: ['$playerSetups', input.additionalPlayerSetups],
          },
        },
      });
    }

    if (input.removePlayerSetups !== undefined) {
      updateQuery.push({
        $project: {
          playerSetups: {
            $filter: {
              input: '$playerSetups',
              as: 'out',
              cond: {
                $not: {
                  $in: [
                    '$$out.userId',
                    input.removePlayerSetups.map(
                      (playerReference: PlayerReference) =>
                        playerReference.userId,
                    ),
                  ],
                },
              },
            },
          },
        },
      });
    }

    return updateQuery;
  }
}
