import { inject, injectable } from 'inversify';

import { CreateEntitiesInteractor } from '../../../../../common/domain';
import { InsertRepository } from '../../../../../layer-modules/db/domain';
import { GAME_DOMAIN_TYPES } from '../../config/types';
import { GameSetup } from '../../model/setup/GameSetup';
import { GameSetupsCreationQuery } from '../../query/setup/GameSetupCreationQuery';

@injectable()
export class CreateGameSetupsInteractor extends CreateEntitiesInteractor<
  GameSetup,
  GameSetupsCreationQuery
> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @inject(GAME_DOMAIN_TYPES.repository.setup.GAME_SETUP_INSERT_REPOSITORY)
    gameSetupInserRepository: InsertRepository<
      GameSetup,
      GameSetupsCreationQuery
    >,
  ) {
    super(gameSetupInserRepository);
  }
}
