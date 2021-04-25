import { interfaces } from 'inversify';

import { GAME_DOMAIN_TYPES } from '../../../../domain/config/types';
import { CreateCardsInteractor } from '../../../../domain/interactor/card/CreateCardsInteractor';
import { FindCardsInteractor } from '../../../../domain/interactor/card/FindCardsInteractor';
import { CreateCardDecksInteractor } from '../../../../domain/interactor/deck/CreateCardDecksInteractor';
import { FindCardDeckInteractor } from '../../../../domain/interactor/deck/FindCardDeckInteractor';
import { FindCardDecksInteractor } from '../../../../domain/interactor/deck/FindCardDecksInteractor';
import { CreateLiveGamesConnectionsInteractor } from '../../../../domain/interactor/live/connection/CreateLiveGamesConnectionsInteractor';
import { FindLiveGameConnectionsInteractor } from '../../../../domain/interactor/live/connection/FindLiveGameConnectionsInteractor';
import { UpdateLiveGameConnectionsInteractor } from '../../../../domain/interactor/live/connection/UpdateLiveGameConnectionsInteractor';
import { CreateLiveGamesInteractor } from '../../../../domain/interactor/live/CreateLiveGamesInteractor';
import { FindLiveGameInteractor } from '../../../../domain/interactor/live/FindLiveGameInteractor';
import { UpsertLiveGameRoomInteractor } from '../../../../domain/interactor/live/room/UpsertLiveGameRoomInteractor';
import { CreateGameSetupsInteractor } from '../../../../domain/interactor/setup/CreateGameSetupsInteractor';
import { DeleteGameSetupsInteractor } from '../../../../domain/interactor/setup/DeleteGameSetupsInteractor';
import { FindGameSetupsInteractor } from '../../../../domain/interactor/setup/FindGameSetupsInteractor';
import { UpdateGameSetupInteractor } from '../../../../domain/interactor/setup/UpdateGameSetupInteractor';

export function bindGameDomainInteractor(bind: interfaces.Bind): void {
  bind(
    GAME_DOMAIN_TYPES.interactor.live.connection
      .CREATE_LIVE_GAMES_CONNECTIONS_INTERACTOR,
  ).to(CreateLiveGamesConnectionsInteractor);
  bind(
    GAME_DOMAIN_TYPES.interactor.live.connection
      .FIND_LIVE_GAME_CONNECTIONS_INTERACTOR,
  ).to(FindLiveGameConnectionsInteractor);
  bind(
    GAME_DOMAIN_TYPES.interactor.live.connection
      .UPDATE_LIVE_GAME_CONNECTIONS_INTERACTOR,
  ).to(UpdateLiveGameConnectionsInteractor);
  bind(
    GAME_DOMAIN_TYPES.interactor.live.room.UPSERT_LIVE_GAME_ROOM_INTERACTOR,
  ).to(UpsertLiveGameRoomInteractor);
  bind(GAME_DOMAIN_TYPES.interactor.live.CREATE_LIVE_GAMES_INTERACTOR).to(
    CreateLiveGamesInteractor,
  );
  bind(GAME_DOMAIN_TYPES.interactor.live.FIND_GAME_INTERACTOR).to(
    FindLiveGameInteractor,
  );
  bind(GAME_DOMAIN_TYPES.interactor.card.CREATE_CARDS_INTERACTOR).to(
    CreateCardsInteractor,
  );
  bind(GAME_DOMAIN_TYPES.interactor.card.FIND_CARDS_INTERACTOR).to(
    FindCardsInteractor,
  );

  bind(GAME_DOMAIN_TYPES.interactor.deck.CREATE_CARD_DECKS_INTERACTOR).to(
    CreateCardDecksInteractor,
  );
  bind(GAME_DOMAIN_TYPES.interactor.deck.FIND_CARD_DECK_INTERACTOR).to(
    FindCardDeckInteractor,
  );
  bind(GAME_DOMAIN_TYPES.interactor.deck.FIND_CARD_DECKS_INTERACTOR).to(
    FindCardDecksInteractor,
  );

  bind(GAME_DOMAIN_TYPES.interactor.setup.CREATE_GAME_SETUPS_INTERACTOR).to(
    CreateGameSetupsInteractor,
  );
  bind(GAME_DOMAIN_TYPES.interactor.setup.DELETE_GAME_SETUPS_INTERACTOR).to(
    DeleteGameSetupsInteractor,
  );
  bind(GAME_DOMAIN_TYPES.interactor.setup.FIND_GAME_SETUPS_INTERACTOR).to(
    FindGameSetupsInteractor,
  );
  bind(GAME_DOMAIN_TYPES.interactor.setup.UPDATE_GAME_SETUP_INTERACTOR).to(
    UpdateGameSetupInteractor,
  );
}
