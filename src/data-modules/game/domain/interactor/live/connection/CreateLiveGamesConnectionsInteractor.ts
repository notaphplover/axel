import { inject, injectable } from 'inversify';

import { CreateEntitiesInteractor } from '../../../../../../common/domain';
import { InsertRepository } from '../../../../../../layer-modules/db/domain';
import { GAME_DOMAIN_TYPES } from '../../../config/types';
import { LiveGameConnections } from '../../../model/live/connection/LiveGameConnections';
import { LiveGameConnectionsCreationQuery } from '../../../query/live/connection/LiveGameConnectionsCreationQuery';

@injectable()
export class CreateLiveGamesConnectionsInteractor extends CreateEntitiesInteractor<
  LiveGameConnections,
  LiveGameConnectionsCreationQuery
> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @inject(
      GAME_DOMAIN_TYPES.repository.live.connection
        .LIVE_GAME_CONNECTIONS_INSERT_REPOSITORY,
    )
    liveGameConnectionsInsertRepository: InsertRepository<
      LiveGameConnections,
      LiveGameConnectionsCreationQuery
    >,
  ) {
    super(liveGameConnectionsInsertRepository);
  }
}
