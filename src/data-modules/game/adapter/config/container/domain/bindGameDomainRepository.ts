import { interfaces } from 'inversify';

import { GAME_DOMAIN_TYPES } from '../../../../domain/config/types';
import { ArtifactDbInsertRepository } from '../../../db/repository/card/ArtifactDbInsertRepository';
import { CardDbSearchRepository } from '../../../db/repository/card/CardDbSearchRepository';
import { CreatureDbInsertRepository } from '../../../db/repository/card/CreatureDbInsertRepository';
import { EnchantmentDbInsertRepository } from '../../../db/repository/card/EnchantmentDbInsertRepository';
import { LandDbInsertRepository } from '../../../db/repository/card/LandDbInsertRepository';
import { CardDeckDbInsertRepository } from '../../../db/repository/deck/CardDeckDbInsertRepository';
import { CardDeckDbSearchRepository } from '../../../db/repository/deck/CardDeckDbSearchRepository';
import { LiveGameDbInsertRepository } from '../../../db/repository/live/LiveGameDbInsertRepository';
import { LiveGameDbSearchRepository } from '../../../db/repository/live/LiveGameDbSearchRepository';
import { GameSetupDbInsertRepository } from '../../../db/repository/setup/GameSetupDbInsertRepository';
import { GameSetupDbSearchRepository } from '../../../db/repository/setup/GameSetupDbSearchRepository';
import { GameSetupDbUpdateRepository } from '../../../db/repository/setup/GameSetupDbUpdateRepository';


export function bindGameDomainRepository(bind: interfaces.Bind): void {
  bind(GAME_DOMAIN_TYPES.repository.live.LIVE_GAME_INSERT_REPOSITORY).to(
    LiveGameDbInsertRepository,
  );
  bind(GAME_DOMAIN_TYPES.repository.live.LIVE_GAME_SEARCH_REPOSITORY).to(
    LiveGameDbSearchRepository,
  );
  bind(GAME_DOMAIN_TYPES.repository.card.ARTIFACT_INSERT_REPOSITORY).to(
    ArtifactDbInsertRepository,
  );
  bind(GAME_DOMAIN_TYPES.repository.card.CARD_SEARCH_REPOSITORY).to(
    CardDbSearchRepository,
  );
  bind(GAME_DOMAIN_TYPES.repository.card.CREATURE_INSERT_REPOSITORY).to(
    CreatureDbInsertRepository,
  );
  bind(GAME_DOMAIN_TYPES.repository.card.ENCHANTMENT_INSERT_REPOSITORY).to(
    EnchantmentDbInsertRepository,
  );
  bind(GAME_DOMAIN_TYPES.repository.card.LAND_INSERT_REPOSITORY).to(
    LandDbInsertRepository,
  );

  bind(GAME_DOMAIN_TYPES.repository.deck.CARD_DECK_INSERT_REPOSITORY).to(
    CardDeckDbInsertRepository,
  );
  bind(GAME_DOMAIN_TYPES.repository.deck.CARD_DECK_SEARCH_REPOSITORY).to(
    CardDeckDbSearchRepository,
  );

  bind(GAME_DOMAIN_TYPES.repository.setup.GAME_SETUP_INSERT_REPOSITORY).to(
    GameSetupDbInsertRepository,
  );
  bind(GAME_DOMAIN_TYPES.repository.setup.GAME_SETUP_SEARCH_REPOSITORY).to(
    GameSetupDbSearchRepository,
  );
  bind(GAME_DOMAIN_TYPES.repository.setup.GAME_SETUP_UPDATE_REPOSITORY).to(
    GameSetupDbUpdateRepository,
  );
}
