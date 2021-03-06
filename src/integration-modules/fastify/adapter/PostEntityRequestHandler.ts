import * as fastify from 'fastify';
import { StatusCodes } from 'http-status-codes';
import { injectable, unmanaged } from 'inversify';

import {
  commonDomain,
  Converter,
  Interactor,
  ValueOrErrors,
} from '../../../common/domain';
import { EntitiesNotCreatedError } from '../../../layer-modules/db/domain';
import { FastifyRequestHandler } from './FastifyRequestHandler';

@injectable()
export abstract class PostEntityRequestHandler<
  TEntity,
  TEntityApi,
  TCreationQuery,
  TRequest extends fastify.FastifyRequest = fastify.FastifyRequest,
> implements FastifyRequestHandler<TRequest>
{
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
    const queryOrErrors: ValueOrErrors<TCreationQuery> =
      await this.postEntityRequestToEntityCreationQueryConverter.transform(
        request,
      );

    if (queryOrErrors.isEither) {
      await reply
        .code(StatusCodes.BAD_REQUEST)
        .send({ message: queryOrErrors.value.join('\n') });
    } else {
      try {
        const entityCreationQuery: TCreationQuery = queryOrErrors.value;

        const entitiesCreated: TEntity[] =
          await this.createEntitiesInteractor.interact(entityCreationQuery);

        if (commonDomain.utils.hasOneElement(entitiesCreated)) {
          const [entityCreated]: TEntity[] = entitiesCreated;

          await this.onEntityCreated(entityCreationQuery, entityCreated);

          const entityApiV1Created: TEntityApi =
            this.entityToEntityApiConverter.transform(entityCreated);

          await reply.code(StatusCodes.CREATED).send(entityApiV1Created);
        } else {
          await reply
            .code(StatusCodes.INTERNAL_SERVER_ERROR)
            .send({ message: 'Expected an entity to be created.' });
        }
      } catch (err: unknown) {
        if (err instanceof EntitiesNotCreatedError) {
          await reply
            .code(StatusCodes.BAD_REQUEST)
            .send({ message: err.message });
        } else {
          const stringifiedErrorMessage: string = JSON.stringify(
            err,
            Object.getOwnPropertyNames(err),
          );

          await reply.code(StatusCodes.INTERNAL_SERVER_ERROR).send({
            message: `Unexpected error when creating entity. Underlying error:\n\n ${stringifiedErrorMessage}`,
          });
        }
      }
    }
  }

  protected async onEntityCreated(
    _creationQuery: TCreationQuery,
    _entity: TEntity,
  ): Promise<void> {
    return undefined;
  }
}
