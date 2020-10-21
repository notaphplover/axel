import { inject, injectable } from 'inversify';
import { Converter } from '../../../../../../common/domain';
import { ExtendedGameSetupDb } from '../../model/setup/ExtendedGameSetupDb';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { GameSetupsCreationQuery } from '../../../../domain/query/setup/GameSetupCreationQuery';
import { Model } from 'mongoose';
import _ from 'lodash';

@injectable()
export class ExtendedGameSetupCreationQueryToExtendedGameSetupDbsConverter
  implements Converter<GameSetupsCreationQuery, ExtendedGameSetupDb[]> {
  constructor(
    @inject(GAME_ADAPTER_TYPES.db.model.setup.EXTENDED_GAME_SETUP_DB_MODEL)
    private readonly extendedGameSetupDbModel: Model<ExtendedGameSetupDb>,
  ) {}

  public transform(input: GameSetupsCreationQuery): ExtendedGameSetupDb[] {
    return [
      new this.extendedGameSetupDbModel({
        format: input.format,
        ownerUserId: input.ownerUserId,
        playerSetups: _.cloneDeep(input.playerSetups),
        playerSlots: input.playerSlots,
      }),
    ];
  }
}
