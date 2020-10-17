import { inject, injectable } from 'inversify';
import { ExtendedGameSetup } from '../../model/setup/ExtendedGameSetup';
import { ExtendedGameSetupsCreationQuery } from '../../query/setup/ExtendedGameSetupCreationQuery';
import { GAME_DOMAIN_TYPES } from '../../config/types';
import { InsertRepository } from '../../../../../layer-modules/db/domain';
import { Interactor } from '../../../../../common/domain';

@injectable()
export class CreateExtendedGameSetupsInteractor
  implements
    Interactor<ExtendedGameSetupsCreationQuery, Promise<ExtendedGameSetup[]>> {
  constructor(
    @inject(
      GAME_DOMAIN_TYPES.repository.setup.EXTENDED_GAME_SETUP_INSERT_REPOSITORY,
    )
    private readonly extendedGameSetupInserRepository: InsertRepository<
      ExtendedGameSetup,
      ExtendedGameSetupsCreationQuery
    >,
  ) {}

  public async interact(
    input: ExtendedGameSetupsCreationQuery,
  ): Promise<ExtendedGameSetup[]> {
    return this.extendedGameSetupInserRepository.insert(input);
  }
}
