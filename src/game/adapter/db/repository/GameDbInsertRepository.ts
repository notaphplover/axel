import { Game, NoIdGame } from '../../../domain/model/Game';
import { inject, injectable } from 'inversify';
import { Converter } from '../../../../common/domain';
import { GAME_ADAPTER_TYPES } from '../../config/types';
import { GameDb } from '../model/GameDb';
import { Model } from 'mongoose';
import { MongooseInsertRepository } from '../../../../layer-modules/db/adapter';

@injectable()
export class GameDbInsertRepository extends MongooseInsertRepository<
  NoIdGame,
  Game,
  GameDb
> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @inject(GAME_ADAPTER_TYPES.db.model.GAME_DB_MODEL)
    model: Model<GameDb>,
    @inject(GAME_ADAPTER_TYPES.db.converter.GAME_DB_TO_GAME_CONVERTER)
    gameDbToGameConverter: Converter<GameDb, Game>,
    @inject(GAME_ADAPTER_TYPES.db.converter.GAME_TO_GAME_DB_CONVERTER)
    gameToGameDbConverter: Converter<Game, GameDb>,
  ) {
    super(model, gameDbToGameConverter, gameToGameDbConverter);
  }
}
