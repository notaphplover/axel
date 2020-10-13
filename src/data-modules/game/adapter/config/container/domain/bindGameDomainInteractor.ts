import { CreateArtifactsInteractor } from '../../../../domain/interactor/card/CreateArtifactsInteractor';
import { CreateCardDecksInteractor } from '../../../../domain/interactor/deck/CreateCardDecksInteractor';
import { CreateCardsInteractor } from '../../../../domain/interactor/card/CreateCardsInteractor';
import { CreateCreaturesInteractor } from '../../../../domain/interactor/card/CreateCreaturesInteractor';
import { CreateEnchantmentsInteractor } from '../../../../domain/interactor/card/CreateEnchantmentsInteractor';
import { CreateGamesInteractor } from '../../../../domain/interactor/CreateGamesInteractor';
import { CreateLandsInteractor } from '../../../../domain/interactor/card/CreateLandsInteractor';
import { FindCardDeckInteractor } from '../../../../domain/interactor/deck/FindCardDeckInteractor';
import { FindCardDecksInteractor } from '../../../../domain/interactor/deck/FindCardDecksInteractor';
import { FindCardsInteractor } from '../../../../domain/interactor/card/FindCardsInteractor';
import { FindGameInteractor } from '../../../../domain/interactor/FindGameInteractor';
import { GAME_DOMAIN_TYPES } from '../../../../domain/config/types';
import { interfaces } from 'inversify';

export function bindGameDomainInteractor(bind: interfaces.Bind): void {
  bind(GAME_DOMAIN_TYPES.interactor.CREATE_GAMES_INTERACTOR).to(
    CreateGamesInteractor,
  );
  bind(GAME_DOMAIN_TYPES.interactor.FIND_GAME_INTERACTOR).to(
    FindGameInteractor,
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
}
