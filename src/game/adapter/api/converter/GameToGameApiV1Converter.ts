import { Converter } from '../../../../common/domain';
import { Game } from '../../../domain/model/Game';
import { GameApiV1 } from '../model/GameApiV1';
import { injectable } from 'inversify';

@injectable()
export class GameToGameApiV1Converter implements Converter<Game, GameApiV1> {
  public transform(input: Game): GameApiV1 {
    return {
      round: input.round,
    };
  }
}
