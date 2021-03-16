import { interfaces } from 'inversify';

import { CardCreationQueryToCardDbsConverter } from '../../../db/converter/card/CardCreationQueryToCardDbsConverter';
import { CardDbToCardConverter } from '../../../db/converter/card/CardDbToCardConverter';
import { CardFindQueryToCardDbFilterQueryConverter } from '../../../db/converter/card/CardFindQueryToCardDbFilterQueryConverter';
import { CardDeckCreationQueryToCardDeckDbsConverter } from '../../../db/converter/deck/CardDeckCreationQueryToCardDeckDbsConverter';
import { CardDeckDbToCardDeckConverter } from '../../../db/converter/deck/CardDeckDbToCardDeckConverter';
import { CardDeckFindQueryToCardDeckDbFilterQueryConverter } from '../../../db/converter/deck/CardDeckFindQueryToCardDeckDbFilterQueryConverter';
import { LiveGameConnectionsCreationQueryToLiveGameConnectionsConverter } from '../../../db/converter/live/connection/LiveGameConnectionsCreationQueryToLiveGameConnectionsConverter';
import { LiveGameConnectionsDbToLiveGameConnectionsConverter } from '../../../db/converter/live/connection/LiveGameConnectionsDbToLiveGameConnectionsConverter';
import { LiveGameDbToLiveGameConverter } from '../../../db/converter/live/GameDbToLiveGameConverter';
import { LiveGameCreationQueryToLiveGameDbsConverter } from '../../../db/converter/live/LiveGameCreationQueryToLiveGameDbsConverter';
import { LiveGameFindQueryToLiveGameDbFilterQueryConverter } from '../../../db/converter/live/LiveGameFindQueryToLiveGameDbFilterQueryConverter';
import { GameSetupCreationQueryToGameSetupDbsConverter } from '../../../db/converter/setup/GameSetupCreationQueryToGameSetupDbsConverter';
import { GameSetupDbToGameSetupConverter } from '../../../db/converter/setup/GameSetupDbToGameSetupConverter';
import { GameSetupDeletionQueryToGameSetupDbFilterConverter } from '../../../db/converter/setup/GameSetupDeletionQueryToGameSetupDbFilterConverter';
import { GameSetupFindQueryToGameSetupDbFilterQueryConverter } from '../../../db/converter/setup/GameSetupFindQueryToGameSetupDbFilterQueryConverter';
import { GameSetupUpdateQueryToGameSetupDbFilterQueryConverter } from '../../../db/converter/setup/GameSetupUpdateQueryToGameSetupDbFilterQueryConverter';
import { GameSetupUpdateQueryToGameSetupDbUpdateQueryConverter } from '../../../db/converter/setup/GameSetupUpdateQueryToGameSetupDbUpdateQueryConverter';
import { GameDbCollectionName } from '../../../db/GameDbCollection';
import { CardDbCollectionInitializer } from '../../../db/initializer/card/CardDbCollectionInitializer';
import { GameDbInitializer } from '../../../db/initializer/GameDbInitializer';
import { LiveGameDbCollectionInitializer } from '../../../db/initializer/live/LiveGameDbCollectionInitializer';
import { GameSetupDbCollectionInitializer } from '../../../db/initializer/setup/GameSetupDbCollectionInitializer';
import { GAME_ADAPTER_TYPES } from '../../types';

export function bindGameAdapterDb(bind: interfaces.Bind): void {
  bind(
    GAME_ADAPTER_TYPES.db.collection.card.CARD_COLLECTION_NAME,
  ).toConstantValue(GameDbCollectionName.Card);
  bind(
    GAME_ADAPTER_TYPES.db.collection.deck.DECK_COLLECTION_NAME,
  ).toConstantValue(GameDbCollectionName.CardDeck);
  bind(
    GAME_ADAPTER_TYPES.db.collection.live.LIVE_GAME_COLLECTION_NAME,
  ).toConstantValue(GameDbCollectionName.LiveGame);
  bind(
    GAME_ADAPTER_TYPES.db.collection.live.LIVE_GAME_CONNECTIONS_COLLECTION_NAME,
  ).toConstantValue(GameDbCollectionName.LiveGameConnection);
  bind(
    GAME_ADAPTER_TYPES.db.collection.setup.GAME_SETUP_COLLECTION_NAME,
  ).toConstantValue(GameDbCollectionName.GameSetup);

  bind(
    GAME_ADAPTER_TYPES.db.converter.live.connection
      .LIVE_GAME_CONNECTIONS_CREATION_QUERY_TO_LIVE_GAME_CONNECTIONS_CONVERTER,
  ).to(LiveGameConnectionsCreationQueryToLiveGameConnectionsConverter);
  bind(
    GAME_ADAPTER_TYPES.db.converter.live.connection
      .LIVE_GAME_CONNECTIONS_DB_TO_LIVE_GAME_CONNECTIONS_CONVERTER,
  ).to(LiveGameConnectionsDbToLiveGameConnectionsConverter);
  bind(
    GAME_ADAPTER_TYPES.db.converter.live.LIVE_GAME_DB_TO_LIVE_GAME_CONVERTER,
  ).to(LiveGameDbToLiveGameConverter);
  bind(
    GAME_ADAPTER_TYPES.db.converter.live
      .LIVE_GAME_FIND_QUERY_TO_LIVE_GAME_DB_FILTER_QUERY_CONVERTER,
  ).to(LiveGameFindQueryToLiveGameDbFilterQueryConverter);
  bind(
    GAME_ADAPTER_TYPES.db.converter.live
      .LIVE_GAME_CREATION_QUERY_TO_LIVE_GAME_DBS_CONVERTER,
  ).to(LiveGameCreationQueryToLiveGameDbsConverter);
  bind(GAME_ADAPTER_TYPES.db.converter.card.CARD_DB_TO_CARD_CONVERTER).to(
    CardDbToCardConverter,
  );
  bind(
    GAME_ADAPTER_TYPES.db.converter.card
      .CARD_FIND_QUERY_TO_CARD_DB_FILTER_QUERY_CONVERTER,
  ).to(CardFindQueryToCardDbFilterQueryConverter);
  bind(
    GAME_ADAPTER_TYPES.db.converter.card
      .CARD_CREATION_QUERY_TO_CARD_DBS_CONVERTER,
  ).to(CardCreationQueryToCardDbsConverter);

  bind(
    GAME_ADAPTER_TYPES.db.converter.deck
      .CARD_DECK_CREATION_QUERY_TO_CARD_DBS_CONVERTER,
  ).to(CardDeckCreationQueryToCardDeckDbsConverter);
  bind(
    GAME_ADAPTER_TYPES.db.converter.deck.CARD_DECK_DB_TO_CARD_DECK_CONVERTER,
  ).to(CardDeckDbToCardDeckConverter);
  bind(
    GAME_ADAPTER_TYPES.db.converter.deck
      .CARD_DECK_FIND_QUERY_TO_CARD_DECK_DB_FILTER_QUERY_CONVERTER,
  ).to(CardDeckFindQueryToCardDeckDbFilterQueryConverter);

  bind(
    GAME_ADAPTER_TYPES.db.converter.setup
      .GAME_SETUP_CREATION_QUERY_TO_GAME_SETUP_DBS_CONVERTER,
  ).to(GameSetupCreationQueryToGameSetupDbsConverter);
  bind(
    GAME_ADAPTER_TYPES.db.converter.setup.GAME_SETUP_DB_TO_GAME_SETUP_CONVERTER,
  ).to(GameSetupDbToGameSetupConverter);
  bind(
    GAME_ADAPTER_TYPES.db.converter.setup
      .GAME_SETUP_DELETION_QUERY_TO_GAME_SETUP_DB_FILTER_CONVERTER,
  ).to(GameSetupDeletionQueryToGameSetupDbFilterConverter);
  bind(
    GAME_ADAPTER_TYPES.db.converter.setup
      .GAME_SETUP_FIND_QUERY_TO_GAME_SETUP_DB_FILTER_QUERY_CONVERTER,
  ).to(GameSetupFindQueryToGameSetupDbFilterQueryConverter);
  bind(
    GAME_ADAPTER_TYPES.db.converter.setup
      .GAME_SETUP_UPDATE_QUERY_TO_GAME_SETUP_DB_FILTER_QUERY_CONVERTER,
  ).to(GameSetupUpdateQueryToGameSetupDbFilterQueryConverter);
  bind(
    GAME_ADAPTER_TYPES.db.converter.setup
      .GAME_SETUP_UPDATE_QUERY_TO_GAME_SETUP_DB_UPDATE_QUERY_CONVERTER,
  ).to(GameSetupUpdateQueryToGameSetupDbUpdateQueryConverter);

  bind(GAME_ADAPTER_TYPES.db.initializer.GAME_DB_INITIALIZER).to(
    GameDbInitializer,
  );
  bind(
    GAME_ADAPTER_TYPES.db.initializer.card.CARD_DB_COLLECTION_INITIALIZER,
  ).to(CardDbCollectionInitializer);
  bind(
    GAME_ADAPTER_TYPES.db.initializer.live.LIVE_GAME_DB_COLLECTION_INITIALIZER,
  ).to(LiveGameDbCollectionInitializer);
  bind(
    GAME_ADAPTER_TYPES.db.initializer.setup
      .GAME_SETUP_DB_COLLECTION_INITIALIZER,
  ).to(GameSetupDbCollectionInitializer);
}
