import { Interactor, SearchRepository } from '../../../common/domain';
import { inject, injectable } from 'inversify';
import { GAME_ADAPTER_TYPES } from '../../adapter/config/types';
import { Game } from '../model/Game';
import { GameFindQuery } from '../query/GameFindQuery';

@injectable()
export class FindGameInteractor
  implements Interactor<GameFindQuery, Promise<Game | null>> {
  constructor(
    @inject(GAME_ADAPTER_TYPES.db.repository.GAME_DB_SEARCH_REPOSITORY)
    private readonly gameSearchRepository: SearchRepository<
      Game,
      GameFindQuery
    >,
  ) {}

  public async interact(query: GameFindQuery): Promise<Game | null> {
    return this.gameSearchRepository.findOne(query);
  }
}
