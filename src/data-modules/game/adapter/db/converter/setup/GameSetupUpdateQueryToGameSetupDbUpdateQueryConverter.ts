import { injectable } from 'inversify';
import mongodb from 'mongodb';

import { Converter } from '../../../../../../common/domain';
import { PlayerReference } from '../../../../domain/model/setup/PlayerReference';
import { GameSetupUpdateQuery } from '../../../../domain/query/setup/GameSetupUpdateQuery';
import { GameSetupDb } from '../../model/setup/GameSetupDb';

@injectable()
export class GameSetupUpdateQueryToGameSetupDbUpdateQueryConverter
  implements Converter<GameSetupUpdateQuery, mongodb.UpdateQuery<GameSetupDb>>
{
  public transform(
    input: GameSetupUpdateQuery,
  ): mongodb.UpdateQuery<GameSetupDb> {
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
          format: true,
          ownerUserId: true,
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
          playerSlots: true,
        },
      });
    }

    return updateQuery as unknown as mongodb.UpdateQuery<GameSetupDb>;
  }
}
