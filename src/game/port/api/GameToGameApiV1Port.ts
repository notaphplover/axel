import { Game } from '../../domain/model/Game';
import { GameApiV1 } from '../../adapter/api/model/GameApiV1';
import { Port } from '../../../common/port';
import { injectable } from 'inversify';

@injectable()
export class GameToGameApiV1Port implements Port<Game, GameApiV1> {
  public transform(input: Game): GameApiV1 {
    return {
      round: input.round,
    };
  }
}
