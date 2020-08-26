import { Game } from '../../domain/model/Game';
import { GameDb } from '../../adapter/db/model/GameDb';
import { Port } from '../../../common/port';
import { injectable } from 'inversify';

@injectable()
export class GameDbToGamePort implements Port<GameDb, Game> {
  public transform(input: Game): Game {
    return {
      round: input.round,
    };
  }
}
