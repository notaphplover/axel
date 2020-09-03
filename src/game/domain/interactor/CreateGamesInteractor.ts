import { Converter, Interactor } from '../../../common/domain';
import { inject, injectable } from 'inversify';
import { GAME_DOMAIN_TYPES } from '../config/types';
import { Game } from '../model/Game';
import { GameCreationQuery } from '../query/GameCreationQuery';
import { InsertRepository } from '../../../common/domain/db/InsertRepository';

@injectable()
export class CreateGamesInteractor
  implements Interactor<GameCreationQuery, Promise<Game[]>> {
  constructor(
    @inject(GAME_DOMAIN_TYPES.converter.GAME_CREATION_QUERY_TO_GAMES_CONVERTER)
    private readonly gameCreationqueryToGamesConverter: Converter<
      GameCreationQuery,
      Game[]
    >,
    @inject(GAME_DOMAIN_TYPES.repository.GAME_INSERT_REPOSITORY)
    private readonly gameInsertRepository: InsertRepository<Game>,
  ) {}

  public async interact(input: GameCreationQuery): Promise<Game[]> {
    const games: Game[] = this.gameCreationqueryToGamesConverter.transform(
      input,
    );

    const gamesCreated: Game[] = await this.gameInsertRepository.insert(games);

    return gamesCreated;
  }
}
