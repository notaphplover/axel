import { injectable } from 'inversify';

import { Converter } from '../../../../../../common/domain';
import { Card } from '../../../../domain/model/card/Card';
import { CardDb } from '../../model/card/CardDb';

@injectable()
export class CardDbToCardConverter implements Converter<CardDb, Card> {
  public transform(cardDb: CardDb): Card {
    return {
      cost: {
        black: cardDb.cost.black,
        blue: cardDb.cost.blue,
        green: cardDb.cost.green,
        red: cardDb.cost.red,
        uncolored: cardDb.cost.uncolored,
        white: cardDb.cost.white,
      },
      detail: {
        description: cardDb.detail.description,
        image: cardDb.detail.image,
        title: cardDb.detail.title,
      },
      id: cardDb._id.toHexString(),
      power: cardDb.power,
      subtypes: [...cardDb.subtypes],
      supertypes: [...cardDb.supertypes],
      toughness: cardDb.toughness,
      type: cardDb.type,
    };
  }
}
