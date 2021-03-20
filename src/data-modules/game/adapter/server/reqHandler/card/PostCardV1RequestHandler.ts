import * as fastify from 'fastify';
import { inject, injectable } from 'inversify';

import {
  Converter,
  Interactor,
  ValueOrErrors,
} from '../../../../../../common/domain';
import { PostEntityRequestHandler } from '../../../../../../integration-modules/fastify/adapter';
import { GAME_DOMAIN_TYPES } from '../../../../domain/config/types';
import { Card } from '../../../../domain/model/card/Card';
import { CardCreationQuery } from '../../../../domain/query/card/CardCreationQuery';
import { CardApiV1 } from '../../../api/model/card/CardApiV1';
import { GAME_ADAPTER_TYPES } from '../../../config/types';

@injectable()
export class PostCardV1RequestHandler extends PostEntityRequestHandler<
  Card,
  CardApiV1,
  CardCreationQuery
> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @inject(GAME_ADAPTER_TYPES.api.converter.card.CARD_TO_CARD_API_V1_CONVERTER)
    cardToCardApiV1Converter: Converter<Card, CardApiV1>,
    @inject(GAME_DOMAIN_TYPES.interactor.card.CREATE_CARDS_INTERACTOR)
    createCardsInteractor: Interactor<CardCreationQuery, Promise<Card[]>>,
    @inject(
      GAME_ADAPTER_TYPES.server.converter.card
        .POST_CARD_V1_REQUEST_TO_CARD_CREATION_QUERY_CONVERTER,
    )
    postCardV1RequestToCardCreationQueryConverter: Converter<
      fastify.FastifyRequest,
      Promise<ValueOrErrors<CardCreationQuery>>
    >,
  ) {
    super(
      cardToCardApiV1Converter,
      createCardsInteractor,
      postCardV1RequestToCardCreationQueryConverter,
    );
  }
}
