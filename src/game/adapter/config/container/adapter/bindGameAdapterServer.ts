import { CardRouter } from '../../../server/router/card/CardRouter';
import { GAME_ADAPTER_TYPES } from '../../types';
import { GameRouter } from '../../../server/router/GameRouter';
import { GetCardsV1RequestHandler } from '../../../server/reqHandler/card/GetCardsV1RequestHandler';
import { GetGameByIdV1RequestHandler } from '../../../server/reqHandler/GetGameByIdV1RequestHandler';
import { PostCardV1RequestHandler } from '../../../server/reqHandler/card/PostCardV1RequestHandler';
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

  bind(GAME_ADAPTER_TYPES.server.router.GAME_ROUTER).to(GameRouter);
  bind(GAME_ADAPTER_TYPES.server.router.card.CARD_ROUTER).to(CardRouter);
}
