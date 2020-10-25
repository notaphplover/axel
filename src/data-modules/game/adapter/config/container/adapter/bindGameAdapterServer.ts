import { CardRouter } from '../../../server/router/card/CardRouter';
import { DeckRouter } from '../../../server/router/deck/DeckRouter';
import { GAME_ADAPTER_TYPES } from '../../types';
import { GameRouter } from '../../../server/router/GameRouter';
import { GameSetupRouter } from '../../../server/router/setup/GameSetupRouter';
import { GetCardDeckByIdV1RequestHandler } from '../../../server/reqHandler/deck/GetCardDeckByIdV1RequestHandler';
import { GetCardsV1RequestHandler } from '../../../server/reqHandler/card/GetCardsV1RequestHandler';
import { GetGameByIdV1RequestHandler } from '../../../server/reqHandler/GetGameByIdV1RequestHandler';
import { GetGameSetupsV1RequestHandler } from '../../../server/reqHandler/setup/GetGameSetupsV1RequestHandler';
import { PostCardDeckV1RequestHandler } from '../../../server/reqHandler/deck/PostCardDeckV1RequestHandler';
import { PostCardV1RequestHandler } from '../../../server/reqHandler/card/PostCardV1RequestHandler';
import { PostGameSetupV1RequestHandler } from '../../../server/reqHandler/setup/PostGameSetupV1RequestHandler';
import { PostGameV1RequestHandler } from '../../../server/reqHandler/PostGameV1RequestHandler';
import { interfaces } from 'inversify';

export function bindGameAdapterServer(bind: interfaces.Bind): void {
  bind(
    GAME_ADAPTER_TYPES.server.reqHandler.GET_GAME_BY_ID_V1_REQUEST_HANDLER,
  ).to(GetGameByIdV1RequestHandler);
  bind(GAME_ADAPTER_TYPES.server.reqHandler.POST_GAME_V1_REQUEST_HANDLER).to(
    PostGameV1RequestHandler,
  );
  bind(
    GAME_ADAPTER_TYPES.server.reqHandler.card.GET_CARDS_V1_REQUEST_HANDLER,
  ).to(GetCardsV1RequestHandler);
  bind(
    GAME_ADAPTER_TYPES.server.reqHandler.card.POST_CARD_V1_REQUEST_HANDLER,
  ).to(PostCardV1RequestHandler);

  bind(
    GAME_ADAPTER_TYPES.server.reqHandler.deck
      .GET_CARD_DECK_BY_ID_V1_REQUEST_HANDLER,
  ).to(GetCardDeckByIdV1RequestHandler);
  bind(
    GAME_ADAPTER_TYPES.server.reqHandler.deck.POST_CARD_DECK_V1_REQUEST_HANDLER,
  ).to(PostCardDeckV1RequestHandler);

  bind(
    GAME_ADAPTER_TYPES.server.reqHandler.setup
      .GET_GAME_SETUPS_V1_REQUEST_HANDLER,
  ).to(GetGameSetupsV1RequestHandler);
  bind(
    GAME_ADAPTER_TYPES.server.reqHandler.setup
      .POST_GAME_SETUP_V1_REQUEST_HANDLER,
  ).to(PostGameSetupV1RequestHandler);

  bind(GAME_ADAPTER_TYPES.server.router.GAME_ROUTER).to(GameRouter);
  bind(GAME_ADAPTER_TYPES.server.router.card.CARD_ROUTER).to(CardRouter);
  bind(GAME_ADAPTER_TYPES.server.router.deck.DECK_ROUTER).to(DeckRouter);
  bind(GAME_ADAPTER_TYPES.server.router.setup.GAME_SETUP_ROUTER).to(
    GameSetupRouter,
  );
}
