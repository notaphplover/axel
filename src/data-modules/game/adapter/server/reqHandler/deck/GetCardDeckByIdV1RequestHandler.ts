import * as fastify from 'fastify';
import { Converter, Interactor } from '../../../../../../common/domain';
import { inject, injectable } from 'inversify';
import { CardDeck } from '../../../../domain/model/deck/CardDeck';
import { CardDeckApiV1 } from '../../../api/model/deck/CardDeckApiV1';
import { CardDeckFindQuery } from '../../../../domain/query/deck/CardDeckFindQuery';
import { FastifyRequestHandler } from '../../../../../../integration-modules/fastify/adapter';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { GAME_DOMAIN_TYPES } from '../../../../domain/config/types';
import { StatusCodes } from 'http-status-codes';
import { ValueOrErrors } from '../../../../../../common/domain/either/ValueOrErrors';

@injectable()
export class GetCardDeckByIdV1RequestHandler implements FastifyRequestHandler {
  constructor(
    @inject(
      GAME_ADAPTER_TYPES.api.converter.deck
        .CARD_DECK_TO_CARD_DECK_API_V1_CONVERTER,
    )
    private readonly cardDeckToCardDeckApiV1Converter: Converter<
      CardDeck,
      CardDeckApiV1
    >,
    @inject(GAME_DOMAIN_TYPES.interactor.deck.FIND_CARD_DECK_INTERACTOR)
    private readonly findCardDeckInteractor: Interactor<
      CardDeckFindQuery,
      Promise<CardDeck | null>
    >,
    @inject(
      GAME_ADAPTER_TYPES.server.converter.deck
        .GET_CARD_DECK_V1_REQUEST_TO_CARD_DECK_FIND_QUERY_CONVERTER,
    )
    private readonly getCardDeckV1RequestToCardDeckFindQueryConverter: Converter<
      fastify.FastifyRequest,
      Promise<ValueOrErrors<CardDeckFindQuery>>
    >,
  ) {}

  public async handle(
    request: fastify.FastifyRequest,
    reply: fastify.FastifyReply,
  ): Promise<void> {
    const findCardDeckQueryOrErrors: ValueOrErrors<CardDeckFindQuery> = await this.getCardDeckV1RequestToCardDeckFindQueryConverter.transform(
      request,
    );

    if (findCardDeckQueryOrErrors.isEither) {
      await reply
        .code(StatusCodes.BAD_REQUEST)
        .send({ message: findCardDeckQueryOrErrors.value.join('\n') });
    } else {
      const findCardDeckQuery: CardDeckFindQuery =
        findCardDeckQueryOrErrors.value;

      const findResult: CardDeck | null = await this.findCardDeckInteractor.interact(
        findCardDeckQuery,
      );

      if (findResult === null) {
        await reply.code(StatusCodes.NOT_FOUND).send({
          message: `The card deck with id "${
            findCardDeckQuery.id as string
          }" was not found`,
        });
      } else {
        await reply.send(
          this.cardDeckToCardDeckApiV1Converter.transform(findResult),
        );
      }
    }
  }
}
