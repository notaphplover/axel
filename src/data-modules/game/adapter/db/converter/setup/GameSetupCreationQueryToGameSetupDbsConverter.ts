import { inject, injectable } from 'inversify';
import { Converter } from '../../../../../../common/domain';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { GameSetupDb } from '../../model/setup/GameSetupDb';
import { GameSetupsCreationQuery } from '../../../../domain/query/setup/GameSetupCreationQuery';
import { Model } from 'mongoose';
import _ from 'lodash';

@injectable()
export class GameSetupCreationQueryToGameSetupDbsConverter
  implements Converter<GameSetupsCreationQuery, GameSetupDb[]> {
  constructor(
    @inject(GAME_ADAPTER_TYPES.db.model.setup.GAME_SETUP_DB_MODEL)
    private readonly gameSetupDbModel: Model<GameSetupDb>,
  ) {}

  public transform(input: GameSetupsCreationQuery): GameSetupDb[] {
    return [
      new this.gameSetupDbModel({
        format: input.format,
        ownerUserId: input.ownerUserId,
        playerSetups: _.cloneDeep(input.playerSetups),
        playerSlots: input.playerSlots,
      }),
    ];
  }
}
