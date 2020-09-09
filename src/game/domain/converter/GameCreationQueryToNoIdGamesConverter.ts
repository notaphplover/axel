import { Converter } from '../../../common/domain';
import { GameCreationQuery } from '../query/GameCreationQuery';
import { NoIdGame } from '../model/Game';
import { injectable } from 'inversify';

@injectable()
export class GameCreationQueryToNoIdGamesConverter
  implements Converter<GameCreationQuery, NoIdGame[]> {
  public transform(input: GameCreationQuery): NoIdGame[] {
    return [{ round: input.round }];
  }
}
