import { inject, injectable } from 'inversify';
import { ExtendedGameSetup } from '../../model/setup/ExtendedGameSetup';
import { GAME_DOMAIN_TYPES } from '../../config/types';
import { GameSetupUpdateQuery } from '../../query/setup/GameSetupUpdateQuery';
import { Interactor } from '../../../../../common/domain';
import { UpdateRepository } from '../../../../../layer-modules/db/domain';

@injectable()
export class UpdateGameSetupInteractor
  implements
    Interactor<GameSetupUpdateQuery, Promise<ExtendedGameSetup | null>> {
  constructor(
    @inject(
      GAME_DOMAIN_TYPES.repository.setup.EXTENDED_GAME_SETUP_UPDATE_REPOSITORY,
    )
    private readonly extendedGameSetupDbUpdateRepository: UpdateRepository<
      ExtendedGameSetup,
      GameSetupUpdateQuery
    >,
  ) {}

  public async interact(
    input: GameSetupUpdateQuery,
  ): Promise<ExtendedGameSetup | null> {
    return this.extendedGameSetupDbUpdateRepository.updateOneAndSelect(input);
  }
}
