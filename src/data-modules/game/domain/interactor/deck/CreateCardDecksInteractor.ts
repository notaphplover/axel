import { inject, injectable } from 'inversify';

import { Interactor } from '../../../../../common/domain';
import { InsertRepository } from '../../../../../layer-modules/db/domain';
import { GAME_DOMAIN_TYPES } from '../../config/types';
import { CardDeck } from '../../model/deck/CardDeck';
import { CardDeckCreationQuery } from '../../query/deck/CardDeckCreationQuery';

@injectable()
export class CreateCardDecksInteractor
  implements Interactor<CardDeckCreationQuery, Promise<CardDeck[]>> {
  constructor(
    @inject(GAME_DOMAIN_TYPES.repository.deck.CARD_DECK_INSERT_REPOSITORY)
    private readonly cardDeckInserRepository: InsertRepository<
      CardDeck,
      CardDeckCreationQuery
    >,
  ) {}

  public async interact(input: CardDeckCreationQuery): Promise<CardDeck[]> {
    return this.cardDeckInserRepository.insert(input);
  }
}
