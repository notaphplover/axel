import { inject, injectable } from 'inversify';
import { BasicGameSetup } from '../../model/setup/BasicGameSetup';
import { BasicGameSetupFindQuery } from '../../query/setup/BasicGameSetupFindQuery';
import { GAME_DOMAIN_TYPES } from '../../config/types';
import { Interactor } from '../../../../../common/domain';
import { SearchRepository } from '../../../../../layer-modules/db/domain';

@injectable()
export class FindBasicGameSetupsInteractor
  implements Interactor<BasicGameSetupFindQuery, Promise<BasicGameSetup[]>> {
  constructor(
    @inject(
      GAME_DOMAIN_TYPES.repository.setup.BASIC_GAME_SETUP_SEARCH_REPOSITORY,
    )
    private readonly basicGameSetupSearchRepository: SearchRepository<
      BasicGameSetup,
      BasicGameSetupFindQuery
    >,
  ) {}

  public async interact(
    input: BasicGameSetupFindQuery,
  ): Promise<BasicGameSetup[]> {
    return this.basicGameSetupSearchRepository.find(input);
  }
}
