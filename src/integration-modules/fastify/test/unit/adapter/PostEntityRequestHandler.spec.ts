import 'reflect-metadata';
import * as fastify from 'fastify';

import {
  Converter,
  Interactor,
  ValueOrErrors,
} from '../../../../../common/domain';
import { PostEntityRequestHandler } from '../../../adapter/PostEntityRequestHandler';
import { fastifyReplyFixtureFactory } from '../../fixtures/fastify.fixture';

interface EntityFixture {
  bar: number;
  foo: string;
}

interface EntityFixtureApi {
  barApi: number;
  fooApi: string;
}

interface EntityCreationQueryFixture {
  foo: string;
}

class PostEntityRequestHandlerMock extends PostEntityRequestHandler<
  EntityFixture,
  EntityFixtureApi,
  EntityCreationQueryFixture
> {}

describe(PostEntityRequestHandler.name, () => {
  let entityToEntityApiConverter: jest.Mocked<
    Converter<EntityFixture, EntityFixtureApi>
  >;
  let createEntitiesInteractor: jest.Mocked<
    Interactor<EntityCreationQueryFixture, Promise<EntityFixture[]>>
  >;
  let postEntityRequestToEntityCreationQueryConverter: jest.Mocked<
    Converter<
      fastify.FastifyRequest,
      Promise<ValueOrErrors<EntityCreationQueryFixture>>
    >
  >;

  let postCardV1RequestHandler: PostEntityRequestHandlerMock;

  beforeAll(() => {
    entityToEntityApiConverter = {
      transform: jest.fn(),
    };
    createEntitiesInteractor = {
      interact: jest.fn(),
    };
    postEntityRequestToEntityCreationQueryConverter = {
      transform: jest.fn(),
    };

    postCardV1RequestHandler = new PostEntityRequestHandlerMock(
      entityToEntityApiConverter,
      createEntitiesInteractor,
      postEntityRequestToEntityCreationQueryConverter,
    );
  });

  describe('.handle()', () => {
    describe('when called with a valid request', () => {
      let requestFixture: fastify.FastifyRequest;
      let replyFixture: fastify.FastifyReply;

      let entityCreationQueryFixtureApi: unknown;
      let entityCreationQueryFixture: EntityCreationQueryFixture;
      let entityFixture: EntityFixture;
      let entityFixtureApi: EntityFixtureApi;
      let entityCreationQueryOrErrorsFixture: ValueOrErrors<EntityCreationQueryFixture>;

      beforeAll(async () => {
        entityCreationQueryFixture = {
          foo: 'fooValue',
        };
        entityCreationQueryFixtureApi = {
          fooApi: 'fooValue',
        };
        entityFixture = {
          bar: 3,
          foo: 'fooValue',
        };
        entityFixtureApi = {
          barApi: 3,
          fooApi: 'fooValue',
        };
        entityCreationQueryOrErrorsFixture = {
          isEither: false,
          value: entityCreationQueryFixture,
        };

        requestFixture = ({
          body: entityCreationQueryFixtureApi,
        } as Partial<fastify.FastifyRequest>) as fastify.FastifyRequest;

        replyFixture = fastifyReplyFixtureFactory.get();

        entityToEntityApiConverter.transform.mockReturnValueOnce(
          entityFixtureApi,
        );

        createEntitiesInteractor.interact.mockResolvedValueOnce([
          entityFixture,
        ]);

        postEntityRequestToEntityCreationQueryConverter.transform.mockResolvedValueOnce(
          entityCreationQueryOrErrorsFixture,
        );

        await postCardV1RequestHandler.handle(requestFixture, replyFixture);
      });

      it('must call postEntityRequestToEntityCreationQueryConverter.transform with the request provided', () => {
        expect(
          postEntityRequestToEntityCreationQueryConverter.transform,
        ).toHaveBeenCalledTimes(1);
        expect(
          postEntityRequestToEntityCreationQueryConverter.transform,
        ).toHaveBeenCalledWith(requestFixture);
      });

      it('must call createEntitiesInteractor.interact with the query obtained', () => {
        expect(createEntitiesInteractor.interact).toHaveBeenCalledTimes(1);
        expect(createEntitiesInteractor.interact).toHaveBeenCalledWith(
          entityCreationQueryFixture,
        );
      });

      it('must call entityToEntityApiConverter.transform with the cards obtained', () => {
        expect(entityToEntityApiConverter.transform).toHaveBeenCalledTimes(1);
        expect(entityToEntityApiConverter.transform).toHaveBeenCalledWith(
          entityFixture,
        );
      });

      it('must call reply.send with the api cards obtained', () => {
        expect(replyFixture.send).toHaveBeenCalledTimes(1);
        expect(replyFixture.send).toHaveBeenCalledWith(entityFixtureApi);
      });
    });
  });
});
