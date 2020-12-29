import { inject, injectable } from 'inversify';
import { GAME_DOMAIN_TYPES } from '../config/types';
import { GameFindQuery } from '../query/GameFindQuery';
import { Interactor } from '../../../../common/domain';
import { LiveGame } from '../model/live/LiveGame';
import { SearchRepository } from '../../../../layer-modules/db/domain';

@injectable()
export class FindLiveGameInteractor
  implements Interactor<GameFindQuery, Promise<LiveGame | null>> {
  constructor(
    @inject(GAME_DOMAIN_TYPES.repository.GAME_SEARCH_REPOSITORY)
    private readonly gameSearchRepository: SearchRepository<
      LiveGame,
      GameFindQuery
    >,
  ) {}

  public async interact(query: GameFindQuery): Promise<LiveGame | null> {
    return this.gameSearchRepository.findOne(query);
  }
}
