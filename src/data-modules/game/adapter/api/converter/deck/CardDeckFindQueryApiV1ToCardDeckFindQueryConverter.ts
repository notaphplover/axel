import { CardDeckFindQuery } from '../../../../domain/query/deck/CardDeckFindQuery';
import { CardDeckFindQueryApiV1 } from '../../query/deck/CardDeckFindQueryApiV1';
import { Converter } from '../../../../../../common/domain';

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