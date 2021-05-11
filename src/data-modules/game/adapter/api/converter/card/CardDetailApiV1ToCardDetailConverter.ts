import { injectable } from 'inversify';

import { Converter } from '../../../../../../common/domain';
import { CardDetail } from '../../../../domain/model/card/CardDetail';
import { CardDetailApiV1 } from '../../model/card/CardDetailApiV1';

@injectable()
export class CardDetailApiV1ToCardDetailConverter
  implements Converter<CardDetailApiV1, CardDetail>
{
  public transform(input: CardDetailApiV1): CardDetail {
    return {
      description: input.description,
      image: input.image,
      title: input.title,
    };
  }
}
