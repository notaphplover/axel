import { inject, injectable } from 'inversify';
import { ExtendedGameSetup } from '../../model/setup/ExtendedGameSetup';
import { ExtendedGameSetupFindQuery } from '../../query/setup/ExtendedGameSetupFindQuery';
import { GAME_DOMAIN_TYPES } from '../../config/types';
import { Interactor } from '../../../../../common/domain';
import { SearchRepository } from '../../../../../layer-modules/db/domain';

@injectable()
export class FindExtendedGameSetupsInteractor
  implements
    Interactor<ExtendedGameSetupFindQuery, Promise<ExtendedGameSetup[]>> {
  constructor(
    @inject(
      GAME_DOMAIN_TYPES.repository.setup.EXTENDED_GAME_SETUP_SEARCH_REPOSITORY,
    )
    private readonly extendedGameSetupSearchRepository: SearchRepository<
      ExtendedGameSetup,
      ExtendedGameSetupFindQuery
    >,
  ) {}

  public async interact(
    input: ExtendedGameSetupFindQuery,
  ): Promise<ExtendedGameSetup[]> {
    return this.extendedGameSetupSearchRepository.find(input);
  }
}
