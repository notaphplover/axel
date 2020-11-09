import { FilterQuery, Model } from 'mongoose';
import { inject, injectable } from 'inversify';
import { Converter } from '../../../../../common/domain';
import { GAME_ADAPTER_TYPES } from '../../config/types';
import { Game } from '../../../domain/model/Game';
import { GameDb } from '../model/GameDb';
import { GameFindQuery } from '../../../domain/query/GameFindQuery';
import { MongooseSearchRepository } from '../../../../../integration-modules/mongoose/adapter';

@injectable()
export class GameDbSearchRepository extends MongooseSearchRepository<
  Game,
  GameDb,
  GameFindQuery
> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @inject(GAME_ADAPTER_TYPES.db.model.GAME_DB_MODEL)
    model: Model<GameDb>,
    @inject(GAME_ADAPTER_TYPES.db.converter.GAME_DB_TO_GAME_CONVERTER)
    gameDbToGameConverter: Converter<GameDb, Game>,
    @inject(
      GAME_ADAPTER_TYPES.db.converter
        .GAME_FIND_QUERY_TO_GAME_DB_FILTER_QUERY_CONVERTER,
    )
    gameFindQueryToGameDbFilterQueryConverter: Converter<
      GameFindQuery,
      FilterQuery<GameDb>
    >,
  ) {
    super(
      model,
      gameDbToGameConverter,
      gameFindQueryToGameDbFilterQueryConverter,
    );
  }
}
