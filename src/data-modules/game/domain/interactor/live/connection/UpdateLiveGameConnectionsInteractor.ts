import { inject, injectable } from 'inversify';

import { UpdateEntityInteractor } from '../../../../../../common/domain';
import { UpdateRepository } from '../../../../../../layer-modules/db/domain';
import { GAME_DOMAIN_TYPES } from '../../../config/types';
import { LiveGameConnections } from '../../../model/live/connection/LiveGameConnections';
import { LiveGameConnectionsUpdateQuery } from '../../../query/live/connection/LiveGameConnectionsUpdateQuery';

@injectable()
export class UpdateLiveGameConnectionsInteractor extends UpdateEntityInteractor<
  LiveGameConnections,
  LiveGameConnectionsUpdateQuery
> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @inject(
      GAME_DOMAIN_TYPES.repository.live.connection
        .LIVE_GAME_CONNECTIONS_INSERT_REPOSITORY,
    )
    liveGameConnectionsUpdateRepository: UpdateRepository<
      LiveGameConnections,
      LiveGameConnectionsUpdateQuery
    >,
  ) {
    super(liveGameConnectionsUpdateRepository);
  }
}
