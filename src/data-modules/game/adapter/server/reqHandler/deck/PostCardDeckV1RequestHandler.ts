import * as fastify from 'fastify';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';

import {
  Converter,
  Interactor,
  ValueOrErrors,
} from '../../../../../../common/domain';
import { PostEntityRequestHandler } from '../../../../../../integration-modules/fastify/adapter';
import { GAME_DOMAIN_TYPES } from '../../../../domain/config/types';
import { CardDeck } from '../../../../domain/model/deck/CardDeck';
import { CardDeckCreationQuery } from '../../../../domain/query/deck/CardDeckCreationQuery';
import { CardDeckApiV1 } from '../../../api/model/deck/CardDeckApiV1';
import { GAME_ADAPTER_TYPES } from '../../../config/types';

@injectable()
export class PostCardDeckV1RequestHandler extends PostEntityRequestHandler<
  CardDeck,
  CardDeckApiV1,
  CardDeckCreationQuery
> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @inject(
      GAME_ADAPTER_TYPES.api.converter.deck
        .CARD_DECK_TO_CARD_DECK_API_V1_CONVERTER,
    )
    cardDeckToCardDeckApiV1Converter: Converter<CardDeck, CardDeckApiV1>,
    @inject(GAME_DOMAIN_TYPES.interactor.deck.CREATE_CARD_DECKS_INTERACTOR)
    createCardDecksInteractor: Interactor<
      CardDeckCreationQuery,
      Promise<CardDeck[]>
    >,
    @inject(
      GAME_ADAPTER_TYPES.server.converter.deck
        .POST_CARD_DECK_V1_REQUEST_TO_CARD_DECK_CREATION_QUERY_CONVERTER,
    )
    postCardDeckV1RequestToCardDeckCreationQueryConverter: Converter<
      fastify.FastifyRequest,
      Promise<ValueOrErrors<CardDeckCreationQuery>>
    >,
  ) {
    super(
      cardDeckToCardDeckApiV1Converter,
      createCardDecksInteractor,
      postCardDeckV1RequestToCardDeckCreationQueryConverter,
    );
  }
}
