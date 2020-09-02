import { inject, injectable } from 'inversify';
import { Converter } from '../../../../common/domain';
import { GAME_ADAPTER_TYPES } from '../../config/types';
import { Game } from '../../../domain/model/Game';
import { GameDb } from '../model/GameDb';
import { Model } from 'mongoose';

@injectable()
export class GameToGameDbConverter implements Converter<Game, GameDb> {
  constructor(
    @inject(GAME_ADAPTER_TYPES.db.model.GAME_DB_MODEL)
    private readonly gameDbModel: Model<GameDb>,
  ) {}

  public transform(input: Game): GameDb {
    return new this.gameDbModel({
      round: input.round,
    });
  }
}
