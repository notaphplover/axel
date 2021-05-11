import { injectable } from 'inversify';
import _ from 'lodash';
import mongodb from 'mongodb';

import { Converter } from '../../../../../../common/domain';
import { GameSetupsCreationQuery } from '../../../../domain/query/setup/GameSetupCreationQuery';
import { GameSetupDb } from '../../model/setup/GameSetupDb';

@injectable()
export class GameSetupCreationQueryToGameSetupDbsConverter
  implements
    Converter<GameSetupsCreationQuery, mongodb.OptionalId<GameSetupDb>[]>
{
  public transform(
    input: GameSetupsCreationQuery,
  ): mongodb.OptionalId<GameSetupDb>[] {
    return [
      {
        format: input.format,
        ownerUserId: input.ownerUserId,
        playerSetups: _.cloneDeep(input.playerSetups),
        playerSlots: input.playerSlots,
      },
    ];
  }
}
