import { inject, injectable } from 'inversify';
import { GAME_DOMAIN_TYPES } from '../config/types';
import { Game } from '../model/Game';
import { GameFindQuery } from '../query/GameFindQuery';
import { Interactor } from '../../../../common/domain';
import { SearchRepository } from '../../../../layer-modules/db/domain';

@injectable()
export class FindGameInteractor
  implements Interactor<GameFindQuery, Promise<Game | null>> {
  constructor(
    @inject(GAME_DOMAIN_TYPES.repository.GAME_SEARCH_REPOSITORY)
    private readonly gameSearchRepository: SearchRepository<
      Game,
      GameFindQuery
    >,
  ) {}

  public async interact(query: GameFindQuery): Promise<Game | null> {
    return this.gameSearchRepository.findOne(query);
  }
}
