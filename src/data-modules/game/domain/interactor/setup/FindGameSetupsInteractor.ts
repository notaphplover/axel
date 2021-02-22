import { inject, injectable } from 'inversify';

import { Interactor } from '../../../../../common/domain';
import { SearchRepository } from '../../../../../layer-modules/db/domain';
import { GAME_DOMAIN_TYPES } from '../../config/types';
import { GameSetup } from '../../model/setup/GameSetup';
import { GameSetupFindQuery } from '../../query/setup/GameSetupFindQuery';

@injectable()
export class FindGameSetupsInteractor
  implements Interactor<GameSetupFindQuery, Promise<GameSetup[]>> {
  constructor(
    @inject(GAME_DOMAIN_TYPES.repository.setup.GAME_SETUP_SEARCH_REPOSITORY)
    private readonly gameSetupSearchRepository: SearchRepository<
      GameSetup,
      GameSetupFindQuery
    >,
  ) {}

  public async interact(input: GameSetupFindQuery): Promise<GameSetup[]> {
    return this.gameSetupSearchRepository.find(input);
  }
}
