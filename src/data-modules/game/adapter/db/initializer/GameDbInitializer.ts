import { inject, injectable } from 'inversify';
import { GAME_ADAPTER_TYPES } from '../../config/types';
import { MongoClient } from 'mongodb';
import { MongoDbInitializer } from '../../../../../integration-modules/mongodb/adapter';

@injectable()
export class GameDbInitializer implements MongoDbInitializer {
  constructor(
    @inject(
      GAME_ADAPTER_TYPES.db.initializer.card.CARD_DB_COLLECTION_INITIALIZER,
    )
    private readonly cardDbCollectionInitializer: MongoDbInitializer,
    @inject(
      GAME_ADAPTER_TYPES.db.initializer.setup
        .EXTENDED_GAME_SETUP_DB_COLLECTION_INITIALIZER,
    )
    private readonly extendedGameSetupDbCollectionInitializer: MongoDbInitializer,
  ) {}

  public async initialize(mongoClient: MongoClient): Promise<void> {
    await Promise.all([
      this.cardDbCollectionInitializer.initialize(mongoClient),
      this.extendedGameSetupDbCollectionInitializer.initialize(mongoClient),
    ]);
  }
}
