import { Converter } from '../../../../../../common/domain';
import { ExtendedGameSetupDb } from '../../model/setup/ExtendedGameSetupDb';
import { GameSetupUpdateQuery } from '../../../../domain/query/setup/GameSetupUpdateQuery';
import { PlayerReference } from '../../../../domain/model/setup/PlayerReference';
import { injectable } from 'inversify';
import mongodb from 'mongodb';

@injectable()
export class GameSetupUpdateQueryToExtendedGameSetupDbUpdateQueryConverter
  implements
    Converter<GameSetupUpdateQuery, mongodb.UpdateQuery<ExtendedGameSetupDb>> {
  public transform(
    input: GameSetupUpdateQuery,
  ): mongodb.UpdateQuery<ExtendedGameSetupDb> {
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

    return (updateQuery as unknown) as mongodb.UpdateQuery<ExtendedGameSetupDb>;
  }
}
