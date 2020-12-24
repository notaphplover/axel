import { Converter } from '../../../../../../common/domain';
import { ExtendedGameSetupDb } from '../../model/setup/ExtendedGameSetupDb';
import { GameSetupsCreationQuery } from '../../../../domain/query/setup/GameSetupCreationQuery';
import _ from 'lodash';
import { injectable } from 'inversify';
import mongodb from 'mongodb';

@injectable()
export class ExtendedGameSetupCreationQueryToExtendedGameSetupDbsConverter
  implements
    Converter<
      GameSetupsCreationQuery,
      mongodb.OptionalId<ExtendedGameSetupDb>[]
    > {
  public transform(
    input: GameSetupsCreationQuery,
  ): mongodb.OptionalId<ExtendedGameSetupDb>[] {
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
