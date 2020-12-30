import { CreateArtifactsInteractor } from '../../../../domain/interactor/card/CreateArtifactsInteractor';
import { CreateCardDecksInteractor } from '../../../../domain/interactor/deck/CreateCardDecksInteractor';
import { CreateCardsInteractor } from '../../../../domain/interactor/card/CreateCardsInteractor';
import { CreateCreaturesInteractor } from '../../../../domain/interactor/card/CreateCreaturesInteractor';
import { CreateEnchantmentsInteractor } from '../../../../domain/interactor/card/CreateEnchantmentsInteractor';
import { CreateGameSetupsInteractor } from '../../../../domain/interactor/setup/CreateGameSetupsInteractor';
import { CreateLandsInteractor } from '../../../../domain/interactor/card/CreateLandsInteractor';
import { CreateLiveGamesInteractor } from '../../../../domain/interactor/live/CreateLiveGamesInteractor';
import { FindCardDeckInteractor } from '../../../../domain/interactor/deck/FindCardDeckInteractor';
import { FindCardDecksInteractor } from '../../../../domain/interactor/deck/FindCardDecksInteractor';
import { FindCardsInteractor } from '../../../../domain/interactor/card/FindCardsInteractor';
import { FindGameSetupsInteractor } from '../../../../domain/interactor/setup/FindGameSetupsInteractor';
import { FindLiveGameInteractor } from '../../../../domain/interactor/live/FindLiveGameInteractor';
import { GAME_DOMAIN_TYPES } from '../../../../domain/config/types';
import { UpdateGameSetupInteractor } from '../../../../domain/interactor/setup/UpdateGameSetupInteractor';
import { interfaces } from 'inversify';

export function bindGameDomainInteractor(bind: interfaces.Bind): void {
  bind(GAME_DOMAIN_TYPES.interactor.live.CREATE_LIVE_GAMES_INTERACTOR).to(
    CreateLiveGamesInteractor,
  );
  bind(GAME_DOMAIN_TYPES.interactor.live.FIND_GAME_INTERACTOR).to(
    FindLiveGameInteractor,
  );
  bind(GAME_DOMAIN_TYPES.interactor.card.CREATE_ARTIFACTS_INTERACTOR).to(
    CreateArtifactsInteractor,
  );
  bind(GAME_DOMAIN_TYPES.interactor.card.CREATE_CARDS_INTERACTOR).to(
    CreateCardsInteractor,
  );
  bind(GAME_DOMAIN_TYPES.interactor.card.CREATE_CREATURES_INTERACTOR).to(
    CreateCreaturesInteractor,
  );
  bind(GAME_DOMAIN_TYPES.interactor.card.CREATE_ENCHANTMENTS_INTERACTOR).to(
    CreateEnchantmentsInteractor,
  );
  bind(GAME_DOMAIN_TYPES.interactor.card.CREATE_LANDS_INTERACTOR).to(
    CreateLandsInteractor,
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
  bind(GAME_DOMAIN_TYPES.interactor.setup.FIND_GAME_SETUPS_INTERACTOR).to(
    FindGameSetupsInteractor,
  );
  bind(GAME_DOMAIN_TYPES.interactor.setup.UPDATE_GAME_SETUP_INTERACTOR).to(
    UpdateGameSetupInteractor,
  );
}
