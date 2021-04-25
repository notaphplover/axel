import { inject, injectable } from 'inversify';

import { FindEntityInteractor } from '../../../../../../common/domain';
import { SearchRepository } from '../../../../../../layer-modules/db/domain';
import { GAME_DOMAIN_TYPES } from '../../../config/types';
import { LiveGameConnections } from '../../../model/live/connection/LiveGameConnections';
import { LiveGameConnectionsFindQuery } from '../../../query/live/connection/LiveGameConnectionsFindQuery';

@injectable()
export class FindLiveGameConnectionsInteractor extends FindEntityInteractor<
  LiveGameConnections,
  LiveGameConnectionsFindQuery
> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @inject(
      GAME_DOMAIN_TYPES.repository.live.connection
        .LIVE_GAME_CONNECTIONS_SEARCH_REPOSITORY,
    )
    liveGameConnectionsDbSearchRepository: SearchRepository<
      LiveGameConnections,
      LiveGameConnectionsFindQuery
    >,
  ) {
    super(liveGameConnectionsDbSearchRepository);
  }
}
