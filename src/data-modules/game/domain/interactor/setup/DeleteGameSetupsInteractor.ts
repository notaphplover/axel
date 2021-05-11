import { inject, injectable } from 'inversify';

import { Interactor } from '../../../../../common/domain';
import { DeleteRepository } from '../../../../../layer-modules/db/domain';
import { GAME_DOMAIN_TYPES } from '../../config/types';
import { GameSetupDeletionQuery } from '../../query/setup/GameSetupDeletionQuery';

@injectable()
export class DeleteGameSetupsInteractor
  implements Interactor<GameSetupDeletionQuery, Promise<void>>
{
  constructor(
    @inject(GAME_DOMAIN_TYPES.repository.setup.GAME_SETUP_DELETE_REPOSITORY)
    private readonly gameSetupDbDeleteRepository: DeleteRepository<GameSetupDeletionQuery>,
  ) {}

  public async interact(
    gameSetupDeletionQuery: GameSetupDeletionQuery,
  ): Promise<void> {
    await this.gameSetupDbDeleteRepository.delete(gameSetupDeletionQuery);
  }
}
