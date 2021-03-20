import * as fastify from 'fastify';
import { StatusCodes } from 'http-status-codes';
import { injectable, unmanaged } from 'inversify';

import {
  commonDomain,
  Converter,
  Interactor,
  ValueOrErrors,
} from '../../../common/domain';
import { FastifyRequestHandler } from './FastifyRequestHandler';

@injectable()
export abstract class PostEntityRequestHandler<
  TEntity,
  TEntityApi,
  TCreationQuery,
  TRequest extends fastify.FastifyRequest = fastify.FastifyRequest
> implements FastifyRequestHandler<TRequest> {
  constructor(
    @unmanaged()
    private readonly entityToEntityApiConverter: Converter<TEntity, TEntityApi>,
    @unmanaged()
    private readonly createEntitiesInteractor: Interactor<
      TCreationQuery,
      Promise<TEntity[]>
    >,
    @unmanaged()
    private readonly postEntityRequestToEntityCreationQueryConverter: Converter<
      TRequest,
      Promise<ValueOrErrors<TCreationQuery>>
    >,
  ) {}

  public async handle(
    request: TRequest,
    reply: fastify.FastifyReply,
  ): Promise<void> {
    const queryOrErrors: ValueOrErrors<TCreationQuery> = await this.postEntityRequestToEntityCreationQueryConverter.transform(
      request,
    );

    if (queryOrErrors.isEither) {
      await reply
        .code(StatusCodes.BAD_REQUEST)
        .send({ message: queryOrErrors.value.join('\n') });
    } else {
      const cardCreationQuery: TCreationQuery = queryOrErrors.value;

      const cardsCreated: TEntity[] = await this.createEntitiesInteractor.interact(
        cardCreationQuery,
      );

      if (commonDomain.utils.hasOneElement(cardsCreated)) {
        const [cardCreated]: TEntity[] = cardsCreated;

        await this.onEntityCreated(cardCreated);

        const cardApiV1Created: TEntityApi = this.entityToEntityApiConverter.transform(
          cardCreated,
        );

        await reply.send(cardApiV1Created);
      } else {
        await reply
          .code(StatusCodes.INTERNAL_SERVER_ERROR)
          .send({ message: 'Expected an entity to be created.' });
      }
    }
  }

  protected async onEntityCreated(_entity: TEntity): Promise<void> {
    return undefined;
  }
}
