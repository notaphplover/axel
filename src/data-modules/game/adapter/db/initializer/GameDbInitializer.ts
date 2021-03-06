import { inject, injectable } from 'inversify';
import { MongoClient } from 'mongodb';

import { MongoDbInitializer } from '../../../../../integration-modules/mongodb/adapter';
import { GAME_ADAPTER_TYPES } from '../../config/types';

@injectable()
export class GameDbInitializer implements MongoDbInitializer {
  constructor(
    @inject(
      GAME_ADAPTER_TYPES.db.initializer.card.CARD_DB_COLLECTION_INITIALIZER,
    )
    private readonly cardDbCollectionInitializer: MongoDbInitializer,
    @inject(
      GAME_ADAPTER_TYPES.db.initializer.setup
        .GAME_SETUP_DB_COLLECTION_INITIALIZER,
    )
    private readonly gameSetupDbCollectionInitializer: MongoDbInitializer,
    @inject(
      GAME_ADAPTER_TYPES.db.initializer.live.connection
        .LIVE_GAME_DB_CONNECTIONS_COLLECTION_INITIALIZER,
    )
    private readonly liveGameConnectionsDbCollectionInitializer: MongoDbInitializer,
    @inject(
      GAME_ADAPTER_TYPES.db.initializer.live
        .LIVE_GAME_DB_COLLECTION_INITIALIZER,
    )
    private readonly liveGameDbCollectionInitializer: MongoDbInitializer,
  ) {}

  public async initialize(mongoClient: MongoClient): Promise<void> {
    await Promise.all([
      this.cardDbCollectionInitializer.initialize(mongoClient),
      this.gameSetupDbCollectionInitializer.initialize(mongoClient),
      this.liveGameConnectionsDbCollectionInitializer.initialize(mongoClient),
      this.liveGameDbCollectionInitializer.initialize(mongoClient),
    ]);
  }
}
