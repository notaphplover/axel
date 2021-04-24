import { inject, injectable } from 'inversify';

import { FindEntityInteractor } from '../../../../../common/domain';
import { SearchRepository } from '../../../../../layer-modules/db/domain';
import { GAME_DOMAIN_TYPES } from '../../config/types';
import { LiveGame } from '../../model/live/LiveGame';
import { LiveGameFindQuery } from '../../query/live/LiveGameFindQuery';

@injectable()
export class FindLiveGameInteractor extends FindEntityInteractor<
  LiveGame,
  LiveGameFindQuery
> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @inject(GAME_DOMAIN_TYPES.repository.live.LIVE_GAME_SEARCH_REPOSITORY)
    liveGameSearchRepository: SearchRepository<LiveGame, LiveGameFindQuery>,
  ) {
    super(liveGameSearchRepository);
  }
}
