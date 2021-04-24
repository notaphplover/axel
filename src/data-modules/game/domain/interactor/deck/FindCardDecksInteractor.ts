import { inject, injectable } from 'inversify';

import { FindEntitiesInteractor } from '../../../../../common/domain';
import { SearchRepository } from '../../../../../layer-modules/db/domain';
import { GAME_DOMAIN_TYPES } from '../../config/types';
import { CardDeck } from '../../model/deck/CardDeck';
import { CardDeckFindQuery } from '../../query/deck/CardDeckFindQuery';

@injectable()
export class FindCardDecksInteractor extends FindEntitiesInteractor<
  CardDeck,
  CardDeckFindQuery
> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @inject(GAME_DOMAIN_TYPES.repository.deck.CARD_DECK_SEARCH_REPOSITORY)
    cardDeckSearchRepository: SearchRepository<CardDeck, CardDeckFindQuery>,
  ) {
    super(cardDeckSearchRepository);
  }
}
