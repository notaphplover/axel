import { inject, injectable } from 'inversify';

import { UpdateEntityInteractor } from '../../../../../common/domain';
import { UpdateRepository } from '../../../../../layer-modules/db/domain';
import { GAME_DOMAIN_TYPES } from '../../config/types';
import { GameSetup } from '../../model/setup/GameSetup';
import { GameSetupUpdateQuery } from '../../query/setup/GameSetupUpdateQuery';

@injectable()
export class UpdateGameSetupInteractor extends UpdateEntityInteractor<
  GameSetup,
  GameSetupUpdateQuery
> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @inject(GAME_DOMAIN_TYPES.repository.setup.GAME_SETUP_UPDATE_REPOSITORY)
    gameSetupDbUpdateRepository: UpdateRepository<
      GameSetup,
      GameSetupUpdateQuery
    >,
  ) {
    super(gameSetupDbUpdateRepository);
  }
}
