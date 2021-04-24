import { inject, injectable } from 'inversify';

import { CreateEntitiesInteractor } from '../../../../../common/domain';
import { InsertRepository } from '../../../../../layer-modules/db/domain';
import { GAME_DOMAIN_TYPES } from '../../config/types';
import { Card } from '../../model/card/Card';
import { CardCreationQuery } from '../../query/card/CardCreationQuery';

@injectable()
export class CreateCardsInteractor extends CreateEntitiesInteractor<
  Card,
  CardCreationQuery
> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @inject(GAME_DOMAIN_TYPES.repository.card.CARD_INSERT_REPOSITORY)
    cardInsertRepository: InsertRepository<Card, CardCreationQuery>,
  ) {
    super(cardInsertRepository);
  }
}
