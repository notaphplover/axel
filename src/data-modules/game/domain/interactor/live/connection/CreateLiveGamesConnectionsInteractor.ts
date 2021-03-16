import { inject, injectable } from 'inversify';

import { Interactor } from '../../../../../../common/domain';
import { InsertRepository } from '../../../../../../layer-modules/db/domain';
import { GAME_DOMAIN_TYPES } from '../../../config/types';
import { LiveGameConnections } from '../../../model/live/connection/LiveGameConnections';
import { LiveGameConnectionsCreationQuery } from '../../../query/live/connection/LiveGameConnectionsCreationQuery';

@injectable()
export class CreateLiveGamesConnectionsInteractor
  implements
    Interactor<
      LiveGameConnectionsCreationQuery,
      Promise<LiveGameConnections[]>
    > {
  constructor(
    @inject(
      GAME_DOMAIN_TYPES.repository.live.connection
        .LIVE_GAME_CONNECTIONS_INSERT_REPOSITORY,
    )
    private readonly liveGameConnectionsInsertRepository: InsertRepository<
      LiveGameConnections,
      LiveGameConnectionsCreationQuery
    >,
  ) {}

  public async interact(
    liveGameConnectionsCreationQuery: LiveGameConnectionsCreationQuery,
  ): Promise<LiveGameConnections[]> {
    return this.liveGameConnectionsInsertRepository.insert(
      liveGameConnectionsCreationQuery,
    );
  }
}
