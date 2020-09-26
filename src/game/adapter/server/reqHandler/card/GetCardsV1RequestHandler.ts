import {
  Converter,
  Interactor,
  ValidationResult,
  Validator,
} from '../../../../../common/domain';
import { FastifyReply, FastifyRequest } from 'fastify';
import { inject, injectable } from 'inversify';
import { Card } from '../../../../domain/model/card/Card';
import { CardApiV1 } from '../../../api/model/card/CardApiV1';
import { CardFindQuery } from '../../../../domain/query/card/CardFindQuery';
import { CardFindQueryApiV1 } from '../../../api/query/card/CardFindQueryApiV1';
import { FastifyRequestHandler } from '../../../../../layer-modules/server/adapter';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { GAME_DOMAIN_TYPES } from '../../../../domain/config/types';
import { StatusCodes } from 'http-status-codes';

@injectable()
export class GetCardsV1RequestHandler implements FastifyRequestHandler {
  constructor(
    @inject(
      GAME_ADAPTER_TYPES.api.converter.card
        .CARD_FIND_QUERY_API_V1_TO_CARD_FIND_QUERY_CONVERTER,
    )
    private readonly cardFindQueryApiV1ToCardFindQueryConverter: Converter<
      CardFindQueryApiV1,
      CardFindQuery
    >,
    @inject(
      GAME_ADAPTER_TYPES.api.validator.card.CARD_FIND_QUERY_API_V1_VALIDATOR,
    )
    private readonly cardFindQueryApiV1Validator: Validator<CardFindQueryApiV1>,
    @inject(GAME_ADAPTER_TYPES.api.converter.card.CARD_TO_CARD_API_V1_CONVERTER)
    private readonly cardToCardApiV1Converter: Converter<Card, CardApiV1>,
    @inject(GAME_DOMAIN_TYPES.interactor.card.FIND_CARDS_INTERACTOR)
    private readonly findCardsInteractor: Interactor<
      CardFindQuery,
      Promise<Card[]>
    >,
  ) {}

  public async handle(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<void> {
    const validationResult: ValidationResult<CardFindQueryApiV1> = this.cardFindQueryApiV1Validator.validate(
      request.params,
    );

    if (validationResult.result) {
      const cardsFindQuery: CardFindQuery = this.cardFindQueryApiV1ToCardFindQueryConverter.transform(
        validationResult.model,
      );
      const cardsFound: Card[] = await this.findCardsInteractor.interact(
        cardsFindQuery,
      );

      const cardsApiFound: CardApiV1[] = cardsFound.map((card: Card) =>
        this.cardToCardApiV1Converter.transform(card),
      );

      await reply.send(cardsApiFound);
    } else {
      await reply
        .code(StatusCodes.BAD_REQUEST)
        .send(validationResult.errorMessage);
    }
  }
}
