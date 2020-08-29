import { Converter } from '../../../../common/domain';
import { Game } from '../../../domain/model/Game';
import { GameDb } from '../model/GameDb';
import { injectable } from 'inversify';

@injectable()
export class GameDbToGameConverter implements Converter<GameDb, Game> {
  public transform(input: Game): Game {
    return {
      round: input.round,
    };
  }
}