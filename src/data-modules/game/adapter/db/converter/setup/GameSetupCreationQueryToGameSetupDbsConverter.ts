import { Converter } from '../../../../../../common/domain';
import { GameSetupDb } from '../../model/setup/GameSetupDb';
import { GameSetupsCreationQuery } from '../../../../domain/query/setup/GameSetupCreationQuery';
import _ from 'lodash';
import { injectable } from 'inversify';
import mongodb from 'mongodb';

@injectable()
export class GameSetupCreationQueryToGameSetupDbsConverter
  implements
    Converter<GameSetupsCreationQuery, mongodb.OptionalId<GameSetupDb>[]> {
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
