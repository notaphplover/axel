import { inject, injectable } from 'inversify';

import { Interactor } from '../../../../../common/domain';
import { InsertRepository } from '../../../../../layer-modules/db/domain';
import { GAME_DOMAIN_TYPES } from '../../config/types';
import { Card } from '../../model/card/Card';
import { CardCreationQuery } from '../../query/card/CardCreationQuery';

@injectable()
export class CreateCardsInteractor
  implements Interactor<CardCreationQuery, Promise<Card[]>> {
  constructor(
    @inject(GAME_DOMAIN_TYPES.repository.card.CARD_INSERT_REPOSITORY)
    private readonly cardInsertRepository: InsertRepository<
      Card,
      CardCreationQuery
    >,
  ) {}

  public async interact(query: CardCreationQuery): Promise<Card[]> {
    return this.cardInsertRepository.insert(query);
  }
}
