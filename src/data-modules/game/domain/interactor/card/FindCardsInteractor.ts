import { inject, injectable } from 'inversify';

import { FindEntitiesInteractor } from '../../../../../common/domain';
import { SearchRepository } from '../../../../../layer-modules/db/domain';
import { GAME_DOMAIN_TYPES } from '../../config/types';
import { Card } from '../../model/card/Card';
import { CardFindQuery } from '../../query/card/CardFindQuery';

@injectable()
export class FindCardsInteractor extends FindEntitiesInteractor<
  Card,
  CardFindQuery
> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @inject(GAME_DOMAIN_TYPES.repository.card.CARD_SEARCH_REPOSITORY)
    cardSearchRepository: SearchRepository<Card, CardFindQuery>,
  ) {
    super(cardSearchRepository);
  }
}
