import { injectable } from 'inversify';

import { Converter } from '../../../../../../common/domain';
import { GameState } from '../../../../domain/model/live/GameState';
import { GameStateApiV1 } from '../../model/live/GameStateApiV1';

const gameStateToGameStateApiV1Map: {
  [TKey in GameState]: GameStateApiV1;
} = {
  [GameState.ENDED]: GameStateApiV1.ENDED,
  [GameState.NOT_STARTED]: GameStateApiV1.NOT_STARTED,
  [GameState.STARTED]: GameStateApiV1.STARTED,
  [GameState.STARTING]: GameStateApiV1.STARTING,
};

@injectable()
export class GameStateToGameStateApiV1Converter
  implements Converter<GameState, GameStateApiV1>
{
  public transform(gameState: GameState): GameStateApiV1 {
    return gameStateToGameStateApiV1Map[gameState];
  }
}
