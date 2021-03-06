import { interfaces } from 'inversify';

import { PostCardsSearchesV1RequestToCardFindQueryConverter } from '../../../server/converter/card/PostCardSearchesV1RequestToCardFindQueryConverter';
import { PostCardV1RequestToCardCreationQueryConverter } from '../../../server/converter/card/PostCardV1RequestToCardCreationQueryConverter';
import { GetCardDeckV1RequestToCardDeckFindQueryConverter } from '../../../server/converter/deck/GetCardDeckV1RequestToCardDeckFindQueryConverter';
import { PostCardDeckV1RequestToCardDeckCreationQueryConverter } from '../../../server/converter/deck/PostCardDeckV1RequestToCardDeckCreationQueryConverter';
import { GetLiveGameV1RequestToLiveGameFindQueryConverter } from '../../../server/converter/live/GetLiveGameV1RequestToLiveGameFindQueryConverter';
import { PostLiveGameV1RequestToLiveGameCreationQueryConverter } from '../../../server/converter/live/PostLiveGameV1RequestToLiveGameCreationQueryConverter';
import { PatchGameSetupByIdV1RequestToGameSetupUpdateQueryConverter } from '../../../server/converter/setup/PatchGameSetupByIdV1RequestToGameSetupUpdateQueryConverter';
import { PostGameSetupsSearchesV1RequestToGameSetupFindQueryConverter } from '../../../server/converter/setup/PostGameSetupsSearchesV1RequestToGameSetupFindQueryConverter';
import { PostGameSetupV1RequestToGameSetupsCreationQueryConverter } from '../../../server/converter/setup/PostGameSetupV1RequestToGameSetupCreationQueryConverter';
import { PostCardsSearchesV1RequestHandler } from '../../../server/reqHandler/card/PostCardsSearchesV1RequestHandler';
import { PostCardV1RequestHandler } from '../../../server/reqHandler/card/PostCardV1RequestHandler';
import { GetCardDeckByIdV1RequestHandler } from '../../../server/reqHandler/deck/GetCardDeckByIdV1RequestHandler';
import { PostCardDeckV1RequestHandler } from '../../../server/reqHandler/deck/PostCardDeckV1RequestHandler';
import { GetLiveGameByIdV1RequestHandler } from '../../../server/reqHandler/live/GetLiveGameByIdV1RequestHandler';
import { PostLiveGameV1RequestHandler } from '../../../server/reqHandler/live/PostLiveGameV1RequestHandler';
import { PatchGameSetupByIdV1RequestHandler } from '../../../server/reqHandler/setup/PatchGameSetupByIdV1RequestHandler';
import { PostGameSetupsSearchesV1RequestHandler } from '../../../server/reqHandler/setup/PostGameSetupsSearchesV1RequestHandler';
import { PostGameSetupV1RequestHandler } from '../../../server/reqHandler/setup/PostGameSetupV1RequestHandler';
import { CardRouter } from '../../../server/router/card/CardRouter';
import { DeckRouter } from '../../../server/router/deck/DeckRouter';
import { LiveGameRouter } from '../../../server/router/live/LiveGameRouter';
import { GameSetupRouter } from '../../../server/router/setup/GameSetupRouter';
import { GAME_ADAPTER_TYPES } from '../../types';

export function bindGameAdapterServer(bind: interfaces.Bind): void {
  bind(
    GAME_ADAPTER_TYPES.server.converter.card
      .POST_CARD_V1_REQUEST_TO_CARD_CREATION_QUERY_CONVERTER,
  ).to(PostCardV1RequestToCardCreationQueryConverter);
  bind(
    GAME_ADAPTER_TYPES.server.converter.card
      .POST_CARDS_SEARCHES_V1_REQUEST_TO_CARD_FIND_QUERY_CONVERTER,
  ).to(PostCardsSearchesV1RequestToCardFindQueryConverter);
  bind(
    GAME_ADAPTER_TYPES.server.converter.deck
      .GET_CARD_DECK_V1_REQUEST_TO_CARD_DECK_FIND_QUERY_CONVERTER,
  ).to(GetCardDeckV1RequestToCardDeckFindQueryConverter);
  bind(
    GAME_ADAPTER_TYPES.server.converter.deck
      .POST_CARD_DECK_V1_REQUEST_TO_CARD_DECK_CREATION_QUERY_CONVERTER,
  ).to(PostCardDeckV1RequestToCardDeckCreationQueryConverter);
  bind(
    GAME_ADAPTER_TYPES.server.converter.live
      .GET_LIVE_GAME_V1_REQUEST_TO_LIVE_GAME_FIND_QUERY_CONVERTER,
  ).to(GetLiveGameV1RequestToLiveGameFindQueryConverter);
  bind(
    GAME_ADAPTER_TYPES.server.converter.live
      .POST_LIVE_GAME_V1_REQUEST_TO_LIVE_GAME_CREATION_QUERY_CONVERTER,
  ).to(PostLiveGameV1RequestToLiveGameCreationQueryConverter);
  bind(
    GAME_ADAPTER_TYPES.server.converter.setup
      .PATCH_GAME_SETUP_BY_ID_V1_REQUEST_TO_GAME_SETUP_UPDATE_QUERY_CONVERTER,
  ).to(PatchGameSetupByIdV1RequestToGameSetupUpdateQueryConverter);
  bind(
    GAME_ADAPTER_TYPES.server.converter.setup
      .POST_GAME_SETUP_V1_REQUEST_TO_GAME_SETUPS_CREATION_QUERY_CONVERTER,
  ).to(PostGameSetupV1RequestToGameSetupsCreationQueryConverter);
  bind(
    GAME_ADAPTER_TYPES.server.converter.setup
      .POST_GAME_SETUPS_SEARCHES_V1_REQUEST_TO_GAME_SETUP_FIND_QUERY_CONVERTER,
  ).to(PostGameSetupsSearchesV1RequestToGameSetupFindQueryConverter);
  bind(
    GAME_ADAPTER_TYPES.server.reqHandler.live
      .GET_LIVE_GAME_BY_ID_V1_REQUEST_HANDLER,
  ).to(GetLiveGameByIdV1RequestHandler);
  bind(
    GAME_ADAPTER_TYPES.server.reqHandler.live.POST_LIVE_GAME_V1_REQUEST_HANDLER,
  ).to(PostLiveGameV1RequestHandler);
  bind(
    GAME_ADAPTER_TYPES.server.reqHandler.card.POST_CARD_V1_REQUEST_HANDLER,
  ).to(PostCardV1RequestHandler);
  bind(
    GAME_ADAPTER_TYPES.server.reqHandler.card
      .POST_CARDS_SEARCHES_V1_REQUEST_HANDLER,
  ).to(PostCardsSearchesV1RequestHandler);

  bind(
    GAME_ADAPTER_TYPES.server.reqHandler.deck
      .GET_CARD_DECK_BY_ID_V1_REQUEST_HANDLER,
  ).to(GetCardDeckByIdV1RequestHandler);
  bind(
    GAME_ADAPTER_TYPES.server.reqHandler.deck.POST_CARD_DECK_V1_REQUEST_HANDLER,
  ).to(PostCardDeckV1RequestHandler);

  bind(
    GAME_ADAPTER_TYPES.server.reqHandler.setup
      .PATCH_GAME_SETUP_BY_ID_V1_REQUEST_HANDLER,
  ).to(PatchGameSetupByIdV1RequestHandler);
  bind(
    GAME_ADAPTER_TYPES.server.reqHandler.setup
      .POST_GAME_SETUP_V1_REQUEST_HANDLER,
  ).to(PostGameSetupV1RequestHandler);
  bind(
    GAME_ADAPTER_TYPES.server.reqHandler.setup
      .POST_GAME_SETUPS_SEARCHES_V1_REQUEST_HANDLER,
  ).to(PostGameSetupsSearchesV1RequestHandler);

  bind(GAME_ADAPTER_TYPES.server.router.live.LIVE_GAME_ROUTER).to(
    LiveGameRouter,
  );
  bind(GAME_ADAPTER_TYPES.server.router.card.CARD_ROUTER).to(CardRouter);
  bind(GAME_ADAPTER_TYPES.server.router.deck.DECK_ROUTER).to(DeckRouter);
  bind(GAME_ADAPTER_TYPES.server.router.setup.GAME_SETUP_ROUTER).to(
    GameSetupRouter,
  );
}
