import { inject, injectable } from 'inversify';
import { CardDeck } from '../../model/deck/CardDeck';
import { CardDeckFindQuery } from '../../query/deck/CardDeckFindQuery';
import { GAME_DOMAIN_TYPES } from '../../config/types';
import { Interactor } from '../../../../../common/domain';
import { SearchRepository } from '../../../../../layer-modules/db/domain';

@injectable()
export class FindCardDeckInteractor
  implements Interactor<CardDeckFindQuery, Promise<CardDeck | null>> {
  constructor(
    @inject(GAME_DOMAIN_TYPES.repository.deck.CARD_DECK_SEARCH_REPOSITORY)
    private readonly cardDeckSearchRepository: SearchRepository<
      CardDeck,
      CardDeckFindQuery
    >,
  ) {}

  public async interact(input: CardDeckFindQuery): Promise<CardDeck | null> {
    return this.cardDeckSearchRepository.findOne(input);
  }
}
