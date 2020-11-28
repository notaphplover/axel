import {
  Converter,
  Interactor,
  ValidationResult,
  Validator,
} from '../../../../../../common/domain';
import { FastifyReply, FastifyRequest } from 'fastify';
import { inject, injectable } from 'inversify';
import { Card } from '../../../../domain/model/card/Card';
import { CardApiV1 } from '../../../api/model/card/CardApiV1';
import { CardCreationQuery } from '../../../../domain/query/card/CardCreationQuery';
import { CardCreationQueryApiV1 } from '../../../api/query/card/CardCreationQueryApiV1';
import { FastifyRequestHandler } from '../../../../../../integration-modules/fastify/adapter';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { GAME_DOMAIN_TYPES } from '../../../../domain/config/types';
import { StatusCodes } from 'http-status-codes';

@injectable()
export class PostCardV1RequestHandler implements FastifyRequestHandler {
  constructor(
    @inject(
      GAME_ADAPTER_TYPES.api.converter.card
        .CARD_CREATION_QUERY_API_V1_TO_CARD_CREATION_QUERY_CONVERTER,
    )
    private readonly cardCreationQueryApiV1ToCardCreationQueryConverter: Converter<
      CardCreationQueryApiV1,
      CardCreationQuery
    >,
    @inject(
      GAME_ADAPTER_TYPES.api.validator.card
        .CARD_CREATION_QUERY_API_V1_VALIDATOR,
    )
    private readonly cardCreationQueryApiV1Validator: Validator<CardCreationQueryApiV1>,
    @inject(GAME_ADAPTER_TYPES.api.converter.card.CARD_TO_CARD_API_V1_CONVERTER)
    private readonly cardToCardApiV1Converter: Converter<Card, CardApiV1>,
    @inject(GAME_DOMAIN_TYPES.interactor.card.CREATE_CARDS_INTERACTOR)
    private readonly createCardsInteractor: Interactor<
      CardCreationQuery,
      Promise<Card[]>
    >,
  ) {}

  public async handle(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<void> {
    const validationResult: ValidationResult<CardCreationQueryApiV1> = this.cardCreationQueryApiV1Validator.validate(
      request.body,
    );
    if (validationResult.result) {
      const cardCreationQuery: CardCreationQuery = this.cardCreationQueryApiV1ToCardCreationQueryConverter.transform(
        validationResult.model,
      );

      const [cardCreated]: Card[] = await this.createCardsInteractor.interact(
        cardCreationQuery,
      );

      const cardApiV1Created: CardApiV1 = this.cardToCardApiV1Converter.transform(
        cardCreated,
      );

      await reply.send(cardApiV1Created);
    } else {
      await reply
        .code(StatusCodes.BAD_REQUEST)
        .send({ message: validationResult.errorMessage });
    }
  }
}
