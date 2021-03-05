import { inject, injectable } from 'inversify';

import { Converter } from '../../../../../../common/domain';
import { Card } from '../../../../domain/model/card/Card';
import { CardType } from '../../../../domain/model/card/CardType';
import { Creature } from '../../../../domain/model/card/Creature';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { CardDb } from '../../model/card/CardDb';
import { CreatureDb } from '../../model/card/CreatureDb';

@injectable()
export class CardDbToCardConverter implements Converter<CardDb, Card> {
  constructor(
    @inject(
      GAME_ADAPTER_TYPES.db.converter.card.CREATURE_DB_TO_CREATURE_CONVERTER,
    )
    private readonly creatureDbToCreatureConverter: Converter<
      CreatureDb,
      Creature
    >,
  ) {}

  public transform(input: CardDb): Card {
    switch (input.type) {
      case CardType.Creature:
        return this.creatureDbToCreatureConverter.transform(
          input as CreatureDb,
        );
      default:
        throw new Error('Unexpected card type');
    }
  }
}
