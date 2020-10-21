import { inject, injectable } from 'inversify';
import { ExtendedGameSetup } from '../../model/setup/ExtendedGameSetup';
import { GAME_DOMAIN_TYPES } from '../../config/types';
import { GameSetupsCreationQuery } from '../../query/setup/GameSetupCreationQuery';
import { InsertRepository } from '../../../../../layer-modules/db/domain';
import { Interactor } from '../../../../../common/domain';

@injectable()
export class CreateExtendedGameSetupsInteractor
  implements Interactor<GameSetupsCreationQuery, Promise<ExtendedGameSetup[]>> {
  constructor(
    @inject(
      GAME_DOMAIN_TYPES.repository.setup.EXTENDED_GAME_SETUP_INSERT_REPOSITORY,
    )
    private readonly extendedGameSetupInserRepository: InsertRepository<
      ExtendedGameSetup,
      GameSetupsCreationQuery
    >,
  ) {}

  public async interact(
    input: GameSetupsCreationQuery,
  ): Promise<ExtendedGameSetup[]> {
    return this.extendedGameSetupInserRepository.insert(input);
  }
}
