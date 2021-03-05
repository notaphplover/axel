import { injectable } from 'inversify';

import { Converter } from '../../../../../../common/domain';
import { BaseCard } from '../../../../domain/model/card/BaseCard';
import { CardDb } from '../../model/card/CardDb';

@injectable()
export abstract class BaseCardDbToCardConverter<TCard extends BaseCard>
  implements Converter<CardDb, TCard> {
  public transform(input: CardDb): TCard {
    return this.innerTransform(input) as TCard;
  }

  protected innerTransform(cardDb: CardDb): BaseCard {
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
      subtypes: [...cardDb.subtypes],
      supertypes: [...cardDb.supertypes],
      type: cardDb.type,
    };
  }
}
