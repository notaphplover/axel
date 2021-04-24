import { inject, injectable } from 'inversify';

import { CreateEntitiesInteractor } from '../../../../../common/domain';
import { InsertRepository } from '../../../../../layer-modules/db/domain';
import { GAME_DOMAIN_TYPES } from '../../config/types';
import { LiveGame } from '../../model/live/LiveGame';
import { LiveGameCreationQuery } from '../../query/live/LiveGameCreationQuery';

@injectable()
export class CreateLiveGamesInteractor extends CreateEntitiesInteractor<
  LiveGame,
  LiveGameCreationQuery
> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @inject(GAME_DOMAIN_TYPES.repository.live.LIVE_GAME_INSERT_REPOSITORY)
    liveGameInsertRepository: InsertRepository<LiveGame, LiveGameCreationQuery>,
  ) {
    super(liveGameInsertRepository);
  }
}
