import { injectable } from 'inversify';

import { Converter } from '../../../../../../common/domain';
import { CardDeckFindQuery } from '../../../../domain/query/deck/CardDeckFindQuery';
import { CardDeckFindQueryApiV1 } from '../../query/deck/CardDeckFindQueryApiV1';

@injectable()
export class CardDeckFindQueryApiV1ToCardDeckFindQueryConverter
  implements Converter<CardDeckFindQueryApiV1, Promise<CardDeckFindQuery>> {
  public async transform(
    input: CardDeckFindQueryApiV1,
  ): Promise<CardDeckFindQuery> {
    const cardDeckFindQuery: CardDeckFindQuery = {
      id: input.cardDeckId,
    };

    return cardDeckFindQuery;
  }
}
