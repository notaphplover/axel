import { inject, injectable } from 'inversify';

import { CreateEntitiesInteractor } from '../../../../../common/domain';
import { InsertRepository } from '../../../../../layer-modules/db/domain';
import { GAME_DOMAIN_TYPES } from '../../config/types';
import { CardDeck } from '../../model/deck/CardDeck';
import { CardDeckCreationQuery } from '../../query/deck/CardDeckCreationQuery';

@injectable()
export class CreateCardDecksInteractor extends CreateEntitiesInteractor<
  CardDeck,
  CardDeckCreationQuery
> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @inject(GAME_DOMAIN_TYPES.repository.deck.CARD_DECK_INSERT_REPOSITORY)
    cardDeckInserRepository: InsertRepository<CardDeck, CardDeckCreationQuery>,
  ) {
    super(cardDeckInserRepository);
  }
}
