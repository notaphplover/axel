import { FilterQuery, Model } from 'mongoose';
import { inject, injectable } from 'inversify';
import { GAME_ADAPTER_TYPES } from '../../config/types';
import { GAME_PORT_TYPES } from '../../../port/config/types';
import { Game } from '../../../domain/model/Game';
import { GameDb } from '../model/GameDb';
import { GameFindQuery } from '../../../domain/query/GameFindQuery';
import { MongooseSearchRepository } from '../../../../common/adapter';
import { Port } from '../../../../common/port';

@injectable()
export class GameDbSearchReporitory extends MongooseSearchRepository<
  Game,
  GameDb,
  GameFindQuery
> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @inject(GAME_ADAPTER_TYPES.db.model.GAME_DB_MODEL)
    model: Model<GameDb>,
    @inject(GAME_PORT_TYPES.db.GAME_DB_TO_GAME_PORT)
    gameDbToGamePort: Port<GameDb, Game>,
    @inject(GAME_PORT_TYPES.db.GAME_FIND_QUERY_TO_GAME_DB_FILTER_QUERY)
    gameFindQueryToGameDbFilterQueryPort: Port<
      GameFindQuery,
      FilterQuery<GameDb>
    >,
  ) {
    super(model, gameDbToGamePort, gameFindQueryToGameDbFilterQueryPort);
  }
}
