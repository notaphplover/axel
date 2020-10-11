import { inject, injectable } from 'inversify';
import { Card } from '../../model/card/Card';
import { CardFindQuery } from '../../query/card/CardFindQuery';
import { GAME_DOMAIN_TYPES } from '../../config/types';
import { Interactor } from '../../../../../common/domain';
import { SearchRepository } from '../../../../../layer-modules/db/domain';

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
