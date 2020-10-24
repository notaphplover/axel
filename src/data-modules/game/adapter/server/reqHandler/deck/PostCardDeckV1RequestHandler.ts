import {
  Converter,
  Interactor,
  ValidationResult,
  Validator,
} from '../../../../../../common/domain';
import { FastifyReply, FastifyRequest } from 'fastify';
import { inject, injectable } from 'inversify';
import { CardDeck } from '../../../../domain/model/deck/CardDeck';
import { CardDeckApiV1 } from '../../../api/model/deck/CardDeckApiV1';
import { CardDeckCreationQuery } from '../../../../domain/query/deck/CardDeckCreationQuery';
import { CardDeckCreationQueryApiV1 } from '../../../api/query/deck/CardDeckCreationQueryApiV1';
import { FastifyRequestHandler } from '../../../../../../layer-modules/server/adapter';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { GAME_DOMAIN_TYPES } from '../../../../domain/config/types';
import { StatusCodes } from 'http-status-codes';

@injectable()
export class PostCardDeckV1RequestHandler implements FastifyRequestHandler {
  constructor(
    @inject(
      GAME_ADAPTER_TYPES.api.converter.deck
        .CARD_DECK_CREATION_QUERY_API_V1_TO_CARD_DECK_CREATION_QUERY_CONVERTER,
    )
    private readonly cardDeckCreationQueryApiV1ToCardDeckCreationQueryConverter: Converter<
      CardDeckCreationQueryApiV1,
      CardDeckCreationQuery
    >,
    @inject(
      GAME_ADAPTER_TYPES.api.validator.deck
        .CARD_DECK_CREATION_QUERY_API_V1_VALIDATOR,
    )
    private readonly cardDeckCreationQueryApiV1Validator: Validator<
      CardDeckCreationQueryApiV1
    >,
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
  ) {}

  public async handle(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<void> {
    const validationResult: ValidationResult<CardDeckCreationQueryApiV1> = this.cardDeckCreationQueryApiV1Validator.validate(
      request.body,
    );
    if (validationResult.result) {
      const cardDeckCreationQuery: CardDeckCreationQuery = this.cardDeckCreationQueryApiV1ToCardDeckCreationQueryConverter.transform(
        validationResult.model,
      );

      const [
        cardDeckCreated,
      ]: CardDeck[] = await this.createCardDecksInteractor.interact(
        cardDeckCreationQuery,
      );

      const cardDeckApiV1Created: CardDeckApiV1 = this.cardDeckToCardDeckApiV1Converter.transform(
        cardDeckCreated,
      );

      await reply.send(cardDeckApiV1Created);
    } else {
      await reply
        .code(StatusCodes.BAD_REQUEST)
        .send({ message: validationResult.errorMessage });
    }
  }
}
