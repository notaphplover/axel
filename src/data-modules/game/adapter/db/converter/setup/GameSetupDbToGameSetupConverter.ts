import { Converter } from '../../../../../../common/domain';
import { GameSetup } from '../../../../domain/model/setup/GameSetup';
import { GameSetupDb } from '../../model/setup/GameSetupDb';
import _ from 'lodash';
import { injectable } from 'inversify';

@injectable()
export class GameSetupDbToGameSetupConverter
  implements Converter<GameSetupDb, GameSetup> {
  public transform(input: GameSetupDb): GameSetup {
    return {
      format: input.format,
      id: input._id.toHexString(),
      ownerUserId: input.ownerUserId,
      playerSetups: _.cloneDeep(input.playerSetups),
      playerSlots: input.playerSlots,
    };
  }
}
