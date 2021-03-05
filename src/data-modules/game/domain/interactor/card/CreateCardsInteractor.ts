import { inject, injectable } from 'inversify';

import { Interactor } from '../../../../../common/domain';
import { GAME_DOMAIN_TYPES } from '../../config/types';
import { Card } from '../../model/card/Card';
import { CardType } from '../../model/card/CardType';
import { Creature } from '../../model/card/Creature';
import { BaseCardCreationQuery } from '../../query/card/BaseCardCreationQuery';
import { CardCreationQuery } from '../../query/card/CardCreationQuery';
import { CreatureCreationQuery } from '../../query/card/CreatureCreationQuery';

@injectable()
export class CreateCardsInteractor
  implements Interactor<BaseCardCreationQuery, Promise<Card[]>> {
  constructor(
    @inject(GAME_DOMAIN_TYPES.interactor.card.CREATE_CREATURES_INTERACTOR)
    private readonly createCreaturesInteractor: Interactor<
      CreatureCreationQuery,
      Promise<Creature[]>
    >,
  ) {}

  public async interact(query: CardCreationQuery): Promise<Card[]> {
    switch (query.type) {
      case CardType.Creature:
        return this.createCreaturesInteractor.interact(query);
      default:
        throw new Error('Unexpected card type');
    }
  }
}
