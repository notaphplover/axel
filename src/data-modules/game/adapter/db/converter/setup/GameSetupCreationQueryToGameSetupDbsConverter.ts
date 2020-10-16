import { inject, injectable } from 'inversify';
import { Converter } from '../../../../../../common/domain';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { GameSetupCreationQuery } from '../../../../domain/query/setup/GameSetupCreationQuery';
import { GameSetupDb } from '../../model/setup/GameSetupDb';
import { Model } from 'mongoose';
import _ from 'lodash';

@injectable()
export class GameSetupCreationQueryToGameSetupDbsConverter
  implements Converter<GameSetupCreationQuery, GameSetupDb[]> {
  constructor(
    @inject(GAME_ADAPTER_TYPES.db.model.setup.GAME_SETUP_DB_MODEL)
    private readonly gameSetupDbModel: Model<GameSetupDb>,
  ) {}

  public transform(input: GameSetupCreationQuery): GameSetupDb[] {
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
