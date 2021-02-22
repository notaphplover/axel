import { inject, injectable } from 'inversify';

import { Interactor } from '../../../../../common/domain';
import { InsertRepository } from '../../../../../layer-modules/db/domain';
import { GAME_DOMAIN_TYPES } from '../../config/types';
import { GameSetup } from '../../model/setup/GameSetup';
import { GameSetupsCreationQuery } from '../../query/setup/GameSetupCreationQuery';

@injectable()
export class CreateGameSetupsInteractor
  implements Interactor<GameSetupsCreationQuery, Promise<GameSetup[]>> {
  constructor(
    @inject(GAME_DOMAIN_TYPES.repository.setup.GAME_SETUP_INSERT_REPOSITORY)
    private readonly gameSetupInserRepository: InsertRepository<
      GameSetup,
      GameSetupsCreationQuery
    >,
  ) {}

  public async interact(input: GameSetupsCreationQuery): Promise<GameSetup[]> {
    return this.gameSetupInserRepository.insert(input);
  }
}
