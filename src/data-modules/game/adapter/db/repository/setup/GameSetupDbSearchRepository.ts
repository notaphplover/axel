import { FilterQuery, Model } from 'mongoose';
import { inject, injectable } from 'inversify';
import { Converter } from '../../../../../../common/domain';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { GameSetup } from '../../../../domain/model/setup/GameSetup';
import { GameSetupDb } from '../../model/setup/GameSetupDb';
import { GameSetupFindQuery } from '../../../../domain/query/setup/GameSetupFindQuery';
import { MongooseSearchRepository } from '../../../../../../layer-modules/db/adapter';

@injectable()
export class GameSetupDbSearchRepository extends MongooseSearchRepository<
  GameSetup,
  GameSetupDb,
  GameSetupFindQuery
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
        .GAME_SETUP_FIND_QUERY_TO_GAME_SETUP_DB_FILTER_QUERY_CONVERTER,
    )
    gameSetupFindQueryToGameSetupDbFilterQueryConverter: Converter<
      GameSetupFindQuery,
      FilterQuery<GameSetupDb>
    >,
  ) {
    super(
      model,
      gameSetupDbToGameSetupConverter,
      gameSetupFindQueryToGameSetupDbFilterQueryConverter,
    );
  }
}
