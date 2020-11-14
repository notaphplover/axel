import { Converter } from '../../../../../../common/domain';
import { ExtendedGameSetupDb } from '../../model/setup/ExtendedGameSetupDb';
import { GameSetupUpdateQuery } from '../../../../domain/query/setup/GameSetupUpdateQuery';
import { UpdateQuery } from 'mongoose';
import { injectable } from 'inversify';

@injectable()
export class GameSetupUpdateQueryToExtendedGameSetupDbUpdateQueryConverter
  implements Converter<GameSetupUpdateQuery, UpdateQuery<ExtendedGameSetupDb>> {
  public transform(
    input: GameSetupUpdateQuery,
  ): UpdateQuery<ExtendedGameSetupDb> {
    const updateQuery: UpdateQuery<ExtendedGameSetupDb> = {
      $push: {
        playerSetups: {
          $each: input.additionalPlayerSetups,
        },
      },
    };

    return updateQuery;
  }
}
