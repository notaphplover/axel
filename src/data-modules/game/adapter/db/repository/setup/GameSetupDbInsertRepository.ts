import { inject, injectable } from 'inversify';
import { Converter } from '../../../../../../common/domain';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { GameSetup } from '../../../../domain/model/setup/GameSetup';
import { GameSetupDb } from '../../model/setup/GameSetupDb';
import { GameSetupsCreationQuery } from '../../../../domain/query/setup/GameSetupCreationQuery';
import { Model } from 'mongoose';
import { MongooseInsertRepository } from '../../../../../../layer-modules/db/adapter';

@injectable()
export class GameSetupDbInsertRepository extends MongooseInsertRepository<
  GameSetup,
  GameSetupsCreationQuery,
  GameSetupDb
> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @inject(GAME_ADAPTER_TYPES.db.model.setup.GAME_SETUP_DB_MODEL)
    model: Model<GameSetupDb>,
    @inject(
      GAME_ADAPTER_TYPES.db.converter.setup
        .GAME_SETUP_DB_TO_GAME_SETUP_CONVERTER,
    )
    gameSetupDbToGameSetupConverter: Converter<GameSetupDb, GameSetup>,
    @inject(
      GAME_ADAPTER_TYPES.db.converter.setup
        .GAME_SETUP_CREATION_QUERY_TO_GAME_SETUP_DBS_CONVERTER,
    )
    gameSetupCreationQueryToGameSetupDbsConverter: Converter<
      GameSetupsCreationQuery,
      GameSetupDb[]
    >,
  ) {
    super(
      model,
      gameSetupDbToGameSetupConverter,
      gameSetupCreationQueryToGameSetupDbsConverter,
    );
  }
}
