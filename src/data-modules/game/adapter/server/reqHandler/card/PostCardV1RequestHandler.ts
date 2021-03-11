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
import { CardCreationQuery } from '../../../../domain/query/card/CardCreationQuery';
import { CardApiV1 } from '../../../api/model/card/CardApiV1';
import { GAME_ADAPTER_TYPES } from '../../../config/types';

@injectable()
export class PostCardV1RequestHandler implements FastifyRequestHandler {
  constructor(
    @inject(GAME_ADAPTER_TYPES.api.converter.card.CARD_TO_CARD_API_V1_CONVERTER)
    private readonly cardToCardApiV1Converter: Converter<Card, CardApiV1>,
    @inject(GAME_DOMAIN_TYPES.interactor.card.CREATE_CARDS_INTERACTOR)
    private readonly createCardsInteractor: Interactor<
      CardCreationQuery,
      Promise<Card[]>
    >,
    @inject(
      GAME_ADAPTER_TYPES.server.converter.card
        .POST_CARD_V1_REQUEST_TO_CARD_CREATION_QUERY_CONVERTER,
    )
    private readonly postCardV1RequestToCardCreationQueryConverter: Converter<
      fastify.FastifyRequest,
      Promise<ValueOrErrors<CardCreationQuery>>
    >,
  ) {}

  public async handle(
    request: fastify.FastifyRequest,
    reply: fastify.FastifyReply,
  ): Promise<void> {
    const queryOrErrors: ValueOrErrors<CardCreationQuery> = await this.postCardV1RequestToCardCreationQueryConverter.transform(
      request,
    );

    if (queryOrErrors.isEither) {
      await reply
        .code(StatusCodes.BAD_REQUEST)
        .send({ message: queryOrErrors.value.join('\n') });
    } else {
      const cardCreationQuery: CardCreationQuery = queryOrErrors.value;

      const [cardCreated]: Card[] = await this.createCardsInteractor.interact(
        cardCreationQuery,
      );

      const cardApiV1Created: CardApiV1 = this.cardToCardApiV1Converter.transform(
        cardCreated,
      );

      await reply.send(cardApiV1Created);
    }
  }
}
