import { interfaces } from 'inversify';

import { GAME_DOMAIN_TYPES } from '../../../../domain/config/types';
import { CardDbInsertRepository } from '../../../db/repository/card/CardDbInsertRepository';
import { CardDbSearchRepository } from '../../../db/repository/card/CardDbSearchRepository';
import { CardDeckDbInsertRepository } from '../../../db/repository/deck/CardDeckDbInsertRepository';
import { CardDeckDbSearchRepository } from '../../../db/repository/deck/CardDeckDbSearchRepository';
import { LiveGameConnectionsDbInsertRepository } from '../../../db/repository/live/connection/LiveGameConnectionsDbInsertRepository';
import { LiveGameDbInsertRepository } from '../../../db/repository/live/LiveGameDbInsertRepository';
import { LiveGameDbSearchRepository } from '../../../db/repository/live/LiveGameDbSearchRepository';
import { GameSetupDbDeleteRepository } from '../../../db/repository/setup/GameSetupDbDeleteRepository';
import { GameSetupDbInsertRepository } from '../../../db/repository/setup/GameSetupDbInsertRepository';
import { GameSetupDbSearchRepository } from '../../../db/repository/setup/GameSetupDbSearchRepository';
import { GameSetupDbUpdateRepository } from '../../../db/repository/setup/GameSetupDbUpdateRepository';

export function bindGameDomainRepository(bind: interfaces.Bind): void {
  bind(
    GAME_DOMAIN_TYPES.repository.live.connection
      .LIVE_GAME_CONNECTIONS_INSERT_REPOSITORY,
  ).to(LiveGameConnectionsDbInsertRepository);
  bind(GAME_DOMAIN_TYPES.repository.live.LIVE_GAME_INSERT_REPOSITORY).to(
    LiveGameDbInsertRepository,
  );
  bind(GAME_DOMAIN_TYPES.repository.live.LIVE_GAME_SEARCH_REPOSITORY).to(
    LiveGameDbSearchRepository,
  );
  bind(GAME_DOMAIN_TYPES.repository.card.CARD_SEARCH_REPOSITORY).to(
    CardDbSearchRepository,
  );
  bind(GAME_DOMAIN_TYPES.repository.card.CARD_INSERT_REPOSITORY).to(
    CardDbInsertRepository,
  );

  bind(GAME_DOMAIN_TYPES.repository.deck.CARD_DECK_INSERT_REPOSITORY).to(
    CardDeckDbInsertRepository,
  );
  bind(GAME_DOMAIN_TYPES.repository.deck.CARD_DECK_SEARCH_REPOSITORY).to(
    CardDeckDbSearchRepository,
  );

  bind(GAME_DOMAIN_TYPES.repository.setup.GAME_SETUP_DELETE_REPOSITORY).to(
    GameSetupDbDeleteRepository,
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
