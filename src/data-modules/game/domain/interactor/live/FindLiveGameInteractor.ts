import { inject, injectable } from 'inversify';
import { GAME_DOMAIN_TYPES } from '../../config/types';
import { Interactor } from '../../../../../common/domain';
import { LiveGame } from '../../model/live/LiveGame';
import { LiveGameFindQuery } from '../../query/live/LiveGameFindQuery';
import { SearchRepository } from '../../../../../layer-modules/db/domain';

@injectable()
export class FindLiveGameInteractor
  implements Interactor<LiveGameFindQuery, Promise<LiveGame | null>> {
  constructor(
    @inject(GAME_DOMAIN_TYPES.repository.live.LIVE_GAME_SEARCH_REPOSITORY)
    private readonly liveGameSearchRepository: SearchRepository<
      LiveGame,
      LiveGameFindQuery
    >,
  ) {}

  public async interact(query: LiveGameFindQuery): Promise<LiveGame | null> {
    return this.liveGameSearchRepository.findOne(query);
  }
}
