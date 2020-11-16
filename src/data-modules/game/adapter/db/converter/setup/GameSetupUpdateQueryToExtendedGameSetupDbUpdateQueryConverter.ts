import { Converter, Writable } from '../../../../../../common/domain';
import { ExtendedGameSetupDb } from '../../model/setup/ExtendedGameSetupDb';
import { GameSetupUpdateQuery } from '../../../../domain/query/setup/GameSetupUpdateQuery';
import { PlayerSetup } from '../../../../domain/model/setup/PlayerSetup';
import { UpdateQuery } from 'mongoose';
import { injectable } from 'inversify';
import mongodb from 'mongodb';

@injectable()
export class GameSetupUpdateQueryToExtendedGameSetupDbUpdateQueryConverter
  implements Converter<GameSetupUpdateQuery, UpdateQuery<ExtendedGameSetupDb>> {
  public transform(
    input: GameSetupUpdateQuery,
  ): UpdateQuery<ExtendedGameSetupDb> {
    const updateQuery: UpdateQuery<ExtendedGameSetupDb> = {};

    if (input.additionalPlayerSetups !== undefined) {
      if (updateQuery.$push === undefined) {
        updateQuery.$push = {};
      }

      (updateQuery.$push.playerSetups as Writable<
        mongodb.ArrayOperator<PlayerSetup[]>
      >) = {
        $each: input.additionalPlayerSetups,
      };
    }

    return updateQuery;
  }
}
