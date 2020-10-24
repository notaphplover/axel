import { Converter, Interactor } from '../../../../../../common/domain';
import { FastifyReply, FastifyRequest } from 'fastify';
import { inject, injectable } from 'inversify';
import { CardDeck } from '../../../../domain/model/deck/CardDeck';
import { CardDeckApiV1 } from '../../../api/model/deck/CardDeckApiV1';
import { CardDeckFindQuery } from '../../../../domain/query/deck/CardDeckFindQuery';
import { FastifyRequestHandler } from '../../../../../../layer-modules/server/adapter';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { GAME_DOMAIN_TYPES } from '../../../../domain/config/types';
import { StatusCodes } from 'http-status-codes';

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
  ) {}

  public async handle(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<void> {
    const findCardDeckQuery: CardDeckFindQuery = {
      id: (request.params as { cardDeckId: string }).cardDeckId,
    };

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
