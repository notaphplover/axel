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
import { CardDeck } from '../../../../domain/model/deck/CardDeck';
import { CardDeckCreationQuery } from '../../../../domain/query/deck/CardDeckCreationQuery';
import { CardDeckApiV1 } from '../../../api/model/deck/CardDeckApiV1';
import { GAME_ADAPTER_TYPES } from '../../../config/types';

@injectable()
export class PostCardDeckV1RequestHandler implements FastifyRequestHandler {
  constructor(
    @inject(
      GAME_ADAPTER_TYPES.api.converter.deck
        .CARD_DECK_TO_CARD_DECK_API_V1_CONVERTER,
    )
    private readonly cardDeckToCardDeckApiV1Converter: Converter<
      CardDeck,
      CardDeckApiV1
    >,
    @inject(GAME_DOMAIN_TYPES.interactor.deck.CREATE_CARD_DECKS_INTERACTOR)
    private readonly createCardDecksInteractor: Interactor<
      CardDeckCreationQuery,
      Promise<CardDeck[]>
    >,
    @inject(
      GAME_ADAPTER_TYPES.server.converter.deck
        .POST_CARD_DECK_V1_REQUEST_TO_CARD_DECK_CREATION_QUERY_CONVERTER,
    )
    private readonly postCardDeckV1RequestToCardDeckCreationQueryConverter: Converter<
      fastify.FastifyRequest,
      Promise<ValueOrErrors<CardDeckCreationQuery>>
    >,
  ) {}

  public async handle(
    request: fastify.FastifyRequest,
    reply: fastify.FastifyReply,
  ): Promise<void> {
    const cardDeckCreatioqueryOrErrors: ValueOrErrors<CardDeckCreationQuery> = await this.postCardDeckV1RequestToCardDeckCreationQueryConverter.transform(
      request,
    );
    if (cardDeckCreatioqueryOrErrors.isEither) {
      await reply
        .code(StatusCodes.BAD_REQUEST)
        .send({ message: cardDeckCreatioqueryOrErrors.value.join('/n') });
    } else {
      const cardDeckCreationQuery: CardDeckCreationQuery =
        cardDeckCreatioqueryOrErrors.value;

      const [
        cardDeckCreated,
      ]: CardDeck[] = await this.createCardDecksInteractor.interact(
        cardDeckCreationQuery,
      );

      const cardDeckApiV1Created: CardDeckApiV1 = this.cardDeckToCardDeckApiV1Converter.transform(
        cardDeckCreated,
      );

      await reply.send(cardDeckApiV1Created);
    }
  }
}
