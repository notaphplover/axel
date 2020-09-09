import { Converter, Interactor } from '../../../common/domain';
import { Game, NoIdGame } from '../model/Game';
import { inject, injectable } from 'inversify';
import { GAME_DOMAIN_TYPES } from '../config/types';
import { GameCreationQuery } from '../query/GameCreationQuery';
import { InsertRepository } from '../../../layer-modules/db/domain';

@injectable()
export class CreateGamesInteractor
  implements Interactor<GameCreationQuery, Promise<Game[]>> {
  constructor(
    @inject(
      GAME_DOMAIN_TYPES.converter.GAME_CREATION_QUERY_TO_NO_ID_GAMES_CONVERTER,
    )
    private readonly gameCreationqueryToNoIdGamesConverter: Converter<
      GameCreationQuery,
      NoIdGame[]
    >,
    @inject(GAME_DOMAIN_TYPES.repository.GAME_INSERT_REPOSITORY)
    private readonly gameInsertRepository: InsertRepository<NoIdGame, Game>,
  ) {}

  public async interact(input: GameCreationQuery): Promise<Game[]> {
    const games: NoIdGame[] = this.gameCreationqueryToNoIdGamesConverter.transform(
      input,
    );

    const gamesCreated: Game[] = await this.gameInsertRepository.insert(games);

    return gamesCreated;
  }
}
