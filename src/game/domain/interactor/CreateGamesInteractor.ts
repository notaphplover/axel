import { inject, injectable } from 'inversify';
import { GAME_DOMAIN_TYPES } from '../config/types';
import { Game } from '../model/Game';
import { GameCreationQuery } from '../query/GameCreationQuery';
import { InsertRepository } from '../../../layer-modules/db/domain';
import { Interactor } from '../../../common/domain';

@injectable()
export class CreateGamesInteractor
  implements Interactor<GameCreationQuery, Promise<Game[]>> {
  constructor(
    @inject(GAME_DOMAIN_TYPES.repository.GAME_INSERT_REPOSITORY)
    private readonly gameInsertRepository: InsertRepository<
      Game,
      GameCreationQuery
    >,
  ) {}

  public async interact(input: GameCreationQuery): Promise<Game[]> {
    const gamesCreated: Game[] = await this.gameInsertRepository.insert(input);

    return gamesCreated;
  }
}
