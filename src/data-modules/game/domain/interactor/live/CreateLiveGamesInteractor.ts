import { inject, injectable } from 'inversify';
import { GAME_DOMAIN_TYPES } from '../../config/types';
import { GameCreationQuery } from '../../query/GameCreationQuery';
import { InsertRepository } from '../../../../../layer-modules/db/domain';
import { Interactor } from '../../../../../common/domain';
import { LiveGame } from '../../model/live/LiveGame';

@injectable()
export class CreateLiveGamesInteractor
  implements Interactor<GameCreationQuery, Promise<LiveGame[]>> {
  constructor(
    @inject(GAME_DOMAIN_TYPES.repository.GAME_INSERT_REPOSITORY)
    private readonly gameInsertRepository: InsertRepository<
      LiveGame,
      GameCreationQuery
    >,
  ) {}

  public async interact(input: GameCreationQuery): Promise<LiveGame[]> {
    const gamesCreated: LiveGame[] = await this.gameInsertRepository.insert(
      input,
    );

    return gamesCreated;
  }
}
