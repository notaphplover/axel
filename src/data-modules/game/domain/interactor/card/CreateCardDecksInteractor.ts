import { inject, injectable } from 'inversify';
import { CardDeck } from '../../model/card/CardDeck';
import { CardDeckCreationQuery } from '../../query/card/CardDeckCreationQuery';
import { GAME_DOMAIN_TYPES } from '../../config/types';
import { InsertRepository } from '../../../../../layer-modules/db/domain';
import { Interactor } from '../../../../../common/domain';

@injectable()
export class CreateCardDecksInteractor
  implements Interactor<CardDeckCreationQuery, Promise<CardDeck[]>> {
  constructor(
    @inject(GAME_DOMAIN_TYPES.repository.card.CARD_DECK_INSERT_REPOSITORY)
    private readonly cardDeckInserRepository: InsertRepository<
      CardDeck,
      CardDeckCreationQuery
    >,
  ) {}

  public async interact(input: CardDeckCreationQuery): Promise<CardDeck[]> {
    return this.cardDeckInserRepository.insert(input);
  }
}
