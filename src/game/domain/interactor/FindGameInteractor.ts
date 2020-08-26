import { Interactor, SearchRepository } from '../../../common/domain';
import { Game } from '../model/Game';
import { GameFindQuery } from '../query/GameFindQuery';
import { injectable } from 'inversify';

@injectable()
export class FindGameInteractor
  implements Interactor<GameFindQuery, Promise<Game | null>> {
  constructor(
    protected readonly gameSearchRepository: SearchRepository<
      Game,
      GameFindQuery
    >,
  ) {}

  public async interact(query: GameFindQuery): Promise<Game | null> {
    return this.gameSearchRepository.findOne(query);
  }
}
