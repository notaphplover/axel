import { BaseCard } from '../../../../domain/model/card/BaseCard';
import { CardDb } from '../../model/card/CardDb';
import { Converter } from '../../../../../../common/domain';
import { injectable } from 'inversify';

@injectable()
export abstract class BaseCardDbToCardConverter<TCardDb, TCard extends BaseCard>
  implements Converter<TCardDb, TCard> {
  public transform(input: TCardDb): TCard {
    return this.innerTransform((input as unknown) as CardDb) as TCard;
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
      type: cardDb.type,
    };
  }
}
