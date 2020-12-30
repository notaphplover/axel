import { inject, injectable } from 'inversify';
import { GAME_DOMAIN_TYPES } from '../../config/types';
import { InsertRepository } from '../../../../../layer-modules/db/domain';
import { Interactor } from '../../../../../common/domain';
import { LiveGame } from '../../model/live/LiveGame';
import { LiveGameCreationQuery } from '../../query/live/LiveGameCreationQuery';

@injectable()
export class CreateLiveGamesInteractor
  implements Interactor<LiveGameCreationQuery, Promise<LiveGame[]>> {
  constructor(
    @inject(GAME_DOMAIN_TYPES.repository.live.LIVE_GAME_INSERT_REPOSITORY)
    private readonly liveGameInsertRepository: InsertRepository<
      LiveGame,
      LiveGameCreationQuery
    >,
  ) {}

  public async interact(input: LiveGameCreationQuery): Promise<LiveGame[]> {
    const gamesCreated: LiveGame[] = await this.liveGameInsertRepository.insert(
      input,
    );

    return gamesCreated;
  }
}
