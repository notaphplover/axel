import { Converter } from '../../../../common/domain';
import { Game } from '../../../domain/model/Game';
import { GameDb } from '../model/GameDb';
import { injectable } from 'inversify';

@injectable()
export class GameDbToGameConverter implements Converter<GameDb, Game> {
  public transform(input: GameDb): Game {
    return {
      id: input._id.toHexString(),
      round: input.round,
    };
  }
}
