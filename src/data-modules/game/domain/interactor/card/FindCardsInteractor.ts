import { inject, injectable } from 'inversify';

import { Interactor } from '../../../../../common/domain';
import { SearchRepository } from '../../../../../layer-modules/db/domain';
import { GAME_DOMAIN_TYPES } from '../../config/types';
import { Card } from '../../model/card/Card';
import { CardFindQuery } from '../../query/card/CardFindQuery';

@injectable()
export class FindCardsInteractor
  implements Interactor<CardFindQuery, Promise<Card[]>> {
  constructor(
    @inject(GAME_DOMAIN_TYPES.repository.card.CARD_SEARCH_REPOSITORY)
    private readonly cardSearchRepository: SearchRepository<
      Card,
      CardFindQuery
    >,
  ) {}

  public async interact(input: CardFindQuery): Promise<Card[]> {
    return this.cardSearchRepository.find(input);
  }
}
