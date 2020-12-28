import { inject, injectable } from 'inversify';
import { GAME_DOMAIN_TYPES } from '../../config/types';
import { GameSetup } from '../../model/setup/GameSetup';
import { GameSetupUpdateQuery } from '../../query/setup/GameSetupUpdateQuery';
import { Interactor } from '../../../../../common/domain';
import { UpdateRepository } from '../../../../../layer-modules/db/domain';

@injectable()
export class UpdateGameSetupInteractor
  implements Interactor<GameSetupUpdateQuery, Promise<GameSetup | null>> {
  constructor(
    @inject(GAME_DOMAIN_TYPES.repository.setup.GAME_SETUP_UPDATE_REPOSITORY)
    private readonly gameSetupDbUpdateRepository: UpdateRepository<
      GameSetup,
      GameSetupUpdateQuery
    >,
  ) {}

  public async interact(
    input: GameSetupUpdateQuery,
  ): Promise<GameSetup | null> {
    return this.gameSetupDbUpdateRepository.updateOneAndSelect(input);
  }
}
