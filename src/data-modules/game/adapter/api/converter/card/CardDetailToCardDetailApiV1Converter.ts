import { injectable } from 'inversify';

import { Converter } from '../../../../../../common/domain';
import { CardDetail } from '../../../../domain/model/card/CardDetail';
import { CardDetailApiV1 } from '../../model/card/CardDetailApiV1';

@injectable()
export class CardDetailToCardDetailV1Converter
  implements Converter<CardDetail, CardDetailApiV1> {
  public transform(input: CardDetail): CardDetailApiV1 {
    return {
      description: input.description,
      image: input.image,
      title: input.title,
    };
  }
}
