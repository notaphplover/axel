import { inject, injectable } from 'inversify';
import { ExtendedGameSetup } from '../../model/setup/ExtendedGameSetup';
import { GAME_DOMAIN_TYPES } from '../../config/types';
import { GameSetupFindQuery } from '../../query/setup/GameSetupFindQuery';
import { Interactor } from '../../../../../common/domain';
import { SearchRepository } from '../../../../../layer-modules/db/domain';

@injectable()
export class FindExtendedGameSetupsInteractor
  implements Interactor<GameSetupFindQuery, Promise<ExtendedGameSetup[]>> {
  constructor(
    @inject(
      GAME_DOMAIN_TYPES.repository.setup.EXTENDED_GAME_SETUP_SEARCH_REPOSITORY,
    )
    private readonly extendedGameSetupSearchRepository: SearchRepository<
      ExtendedGameSetup,
      GameSetupFindQuery
    >,
  ) {}

  public async interact(
    input: GameSetupFindQuery,
  ): Promise<ExtendedGameSetup[]> {
    return this.extendedGameSetupSearchRepository.find(input);
  }
}
