import { BaseCard } from '../../../../domain/model/card/BaseCard';
import { CardDb } from '../../model/card/CardDb';
import { Converter } from '../../../../../common/domain';
import { injectable } from 'inversify';

@injectable()
export abstract class BaseCardDbToCardConverter
  implements Converter<CardDb, BaseCard> {
  public transform(input: CardDb): BaseCard {
    return {
      cost: {
        black: input.cost.black,
        blue: input.cost.blue,
        green: input.cost.green,
        red: input.cost.red,
        uncolored: input.cost.uncolored,
        white: input.cost.white,
      },
      detail: {
        description: input.detail.description,
        image: input.detail.image,
        title: input.detail.title,
      },
      id: input._id.toHexString(),
      type: input.type,
    };
  }
}
