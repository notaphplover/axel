import { inject, injectable } from 'inversify';

import { FindEntitiesInteractor } from '../../../../../common/domain';
import { SearchRepository } from '../../../../../layer-modules/db/domain';
import { GAME_DOMAIN_TYPES } from '../../config/types';
import { GameSetup } from '../../model/setup/GameSetup';
import { GameSetupFindQuery } from '../../query/setup/GameSetupFindQuery';

@injectable()
export class FindGameSetupsInteractor extends FindEntitiesInteractor<
  GameSetup,
  GameSetupFindQuery
> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @inject(GAME_DOMAIN_TYPES.repository.setup.GAME_SETUP_SEARCH_REPOSITORY)
    gameSetupSearchRepository: SearchRepository<GameSetup, GameSetupFindQuery>,
  ) {
    super(gameSetupSearchRepository);
  }
}
