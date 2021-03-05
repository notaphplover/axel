import { inject, injectable } from 'inversify';

import { Converter } from '../../../../../../common/domain';
import { Card } from '../../../../domain/model/card/Card';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { CardDb } from '../../model/card/CardDb';

@injectable()
export class CardDbToCardConverter implements Converter<CardDb, Card> {
  constructor(
    @inject(
      GAME_ADAPTER_TYPES.db.converter.card.CREATURE_DB_TO_CREATURE_CONVERTER,
    )
    private readonly creatureDbToCreatureConverter: Converter<CardDb, Card>,
  ) {}

  public transform(input: CardDb): Card {
    return this.creatureDbToCreatureConverter.transform(input);
  }
}
