import { inject, injectable } from 'inversify';
import { Converter } from '../../../../../common/domain';
import { GAME_ADAPTER_TYPES } from '../../config/types';
import { GameCreationQuery } from '../../../domain/query/GameCreationQuery';
import { GameDb } from '../model/GameDb';
import { Model } from 'mongoose';

@injectable()
export class GameCreationQueryToGameDbsConverter
  implements Converter<GameCreationQuery, GameDb[]> {
  constructor(
    @inject(GAME_ADAPTER_TYPES.db.model.GAME_DB_MODEL)
    private readonly gameDbModel: Model<GameDb>,
  ) {}

  public transform(query: GameCreationQuery): GameDb[] {
    return [
      new this.gameDbModel({
        round: query.round,
      }),
    ];
  }
}
