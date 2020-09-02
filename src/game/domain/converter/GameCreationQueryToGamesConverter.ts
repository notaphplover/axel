import { Converter } from '../../../common/domain';
import { Game } from '../model/Game';
import { GameCreationQuery } from '../query/GameCreationQuery';
import { injectable } from 'inversify';

@injectable()
export class GameCreationQueryToGamesConverter
  implements Converter<GameCreationQuery, Game[]> {
  public transform(input: GameCreationQuery): Game[] {
    return [{ round: input.round }];
  }
}
