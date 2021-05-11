import * as fastify from 'fastify';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';

import {
  Converter,
  Interactor,
  ValueOrErrors,
} from '../../../../../../common/domain';
import { FastifyRequestHandler } from '../../../../../../integration-modules/fastify/adapter';
import { GAME_DOMAIN_TYPES } from '../../../../domain/config/types';
import { Card } from '../../../../domain/model/card/Card';
import { CardFindQuery } from '../../../../domain/query/card/CardFindQuery';
import { CardApiV1 } from '../../../api/model/card/CardApiV1';
import { GAME_ADAPTER_TYPES } from '../../../config/types';

@injectable()
export class PostCardsSearchesV1RequestHandler
  implements FastifyRequestHandler
{
  constructor(
    @inject(GAME_ADAPTER_TYPES.api.converter.card.CARD_TO_CARD_API_V1_CONVERTER)
    private readonly cardToCardApiV1Converter: Converter<Card, CardApiV1>,
    @inject(GAME_DOMAIN_TYPES.interactor.card.FIND_CARDS_INTERACTOR)
    private readonly findCardsInteractor: Interactor<
      CardFindQuery,
      Promise<Card[]>
    >,
    @inject(
      GAME_ADAPTER_TYPES.server.converter.card
        .POST_CARDS_SEARCHES_V1_REQUEST_TO_CARD_FIND_QUERY_CONVERTER,
    )
    private readonly postCardsSearchesV1RequestToCardFindQueryConverter: Converter<
      fastify.FastifyRequest,
      Promise<ValueOrErrors<CardFindQuery>>
    >,
  ) {}

  public async handle(
    request: fastify.FastifyRequest,
    reply: fastify.FastifyReply,
  ): Promise<void> {
    const queryOrErrors: ValueOrErrors<CardFindQuery> =
      await this.postCardsSearchesV1RequestToCardFindQueryConverter.transform(
        request,
      );

    if (queryOrErrors.isEither) {
      await reply
        .code(StatusCodes.BAD_REQUEST)
        .send({ message: queryOrErrors.value.join('\n') });
    } else {
      const cardsFindQuery: CardFindQuery = queryOrErrors.value;

      const cardsFound: Card[] = await this.findCardsInteractor.interact(
        cardsFindQuery,
      );

      const cardsApiFound: CardApiV1[] = cardsFound.map((card: Card) =>
        this.cardToCardApiV1Converter.transform(card),
      );

      await reply.send(cardsApiFound);
    }
  }
}
