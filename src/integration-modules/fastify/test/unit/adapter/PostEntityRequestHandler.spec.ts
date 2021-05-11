import 'reflect-metadata';
import * as fastify from 'fastify';
import { StatusCodes } from 'http-status-codes';

import {
  Converter,
  EitherEither,
  Interactor,
  ValueOrErrors,
} from '../../../../../common/domain';
import { EntitiesNotCreatedError } from '../../../../../layer-modules/db/domain';
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
    let requestFixture: fastify.FastifyRequest;
    let replyFixture: jest.Mocked<fastify.FastifyReply>;

    let entityCreationQueryFixtureApi: unknown;
    let entityCreationQueryFixture: EntityCreationQueryFixture;
    let entityFixture: EntityFixture;
    let entityFixtureApi: EntityFixtureApi;

    beforeAll(() => {
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

      requestFixture = {
        body: entityCreationQueryFixtureApi,
      } as Partial<fastify.FastifyRequest> as fastify.FastifyRequest;

      replyFixture = fastifyReplyFixtureFactory.get();
    });

    describe('when called with a valid request', () => {
      let entityCreationQueryOrErrorsFixture: ValueOrErrors<EntityCreationQueryFixture>;

      beforeAll(async () => {
        entityCreationQueryOrErrorsFixture = {
          isEither: false,
          value: entityCreationQueryFixture,
        };

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

      afterAll(() => {
        entityToEntityApiConverter.transform.mockClear();
        createEntitiesInteractor.interact.mockClear();
        postEntityRequestToEntityCreationQueryConverter.transform.mockClear();

        replyFixture.code.mockClear();
        replyFixture.send.mockClear();
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

      it('must call reply.code with created status code', () => {
        expect(replyFixture.code).toHaveBeenCalledTimes(1);
        expect(replyFixture.code).toHaveBeenCalledWith(StatusCodes.CREATED);
      });

      it('must call reply.send with the api cards obtained', () => {
        expect(replyFixture.send).toHaveBeenCalledTimes(1);
        expect(replyFixture.send).toHaveBeenCalledWith(entityFixtureApi);
      });
    });

    describe('when called with a valid request and a duplicated key error is thrown', () => {
      let duplicatedKeyError: EntitiesNotCreatedError;

      let entityCreationQueryOrErrorsFixture: ValueOrErrors<EntityCreationQueryFixture>;

      beforeAll(async () => {
        duplicatedKeyError = new EntitiesNotCreatedError(
          'Test when a duplicated error is thrown',
        );

        entityCreationQueryOrErrorsFixture = {
          isEither: false,
          value: entityCreationQueryFixture,
        };

        entityToEntityApiConverter.transform.mockReturnValueOnce(
          entityFixtureApi,
        );

        createEntitiesInteractor.interact.mockRejectedValueOnce(
          duplicatedKeyError,
        );

        postEntityRequestToEntityCreationQueryConverter.transform.mockResolvedValueOnce(
          entityCreationQueryOrErrorsFixture,
        );

        await postCardV1RequestHandler.handle(requestFixture, replyFixture);
      });

      afterAll(() => {
        entityToEntityApiConverter.transform.mockClear();
        createEntitiesInteractor.interact.mockClear();
        postEntityRequestToEntityCreationQueryConverter.transform.mockClear();

        replyFixture.code.mockClear();
        replyFixture.send.mockClear();
      });

      it('must call reply code with the HTTP BAD_REQUEST code', () => {
        expect(replyFixture.code).toHaveBeenCalledTimes(1);
        expect(replyFixture.code).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
      });

      it('must call reply.send with the error message generated', () => {
        expect(replyFixture.send).toHaveBeenCalledTimes(1);
        expect(replyFixture.send).toHaveBeenCalledWith({
          message: duplicatedKeyError.message,
        });
      });
    });

    describe('when called with a valid request and an unknown error is thrown', () => {
      let unknownError: Error;

      let entityCreationQueryOrErrorsFixture: ValueOrErrors<EntityCreationQueryFixture>;

      beforeAll(async () => {
        unknownError = new Error('Test when an unknown error is thrown');

        entityCreationQueryOrErrorsFixture = {
          isEither: false,
          value: entityCreationQueryFixture,
        };

        entityToEntityApiConverter.transform.mockReturnValueOnce(
          entityFixtureApi,
        );

        createEntitiesInteractor.interact.mockRejectedValueOnce(unknownError);

        postEntityRequestToEntityCreationQueryConverter.transform.mockResolvedValueOnce(
          entityCreationQueryOrErrorsFixture,
        );

        await postCardV1RequestHandler.handle(requestFixture, replyFixture);
      });

      afterAll(() => {
        entityToEntityApiConverter.transform.mockClear();
        createEntitiesInteractor.interact.mockClear();
        postEntityRequestToEntityCreationQueryConverter.transform.mockClear();

        replyFixture.code.mockClear();
        replyFixture.send.mockClear();
      });

      it('must call reply code with the HTTP INTERNAL_SERVER_ERROR code', () => {
        expect(replyFixture.code).toHaveBeenCalledTimes(1);
        expect(replyFixture.code).toHaveBeenCalledWith(
          StatusCodes.INTERNAL_SERVER_ERROR,
        );
      });

      it('must call reply.send with the error message generated', () => {
        expect(replyFixture.send).toHaveBeenCalledTimes(1);
        expect(replyFixture.send).toHaveBeenCalledWith({
          message: expect.stringContaining(unknownError.message) as string,
        });
      });
    });

    describe('when called and the request is not valid', () => {
      let entityCreationQueryOrErrorsFixture: EitherEither<string[]>;

      beforeAll(async () => {
        entityCreationQueryOrErrorsFixture = {
          isEither: true,
          value: ['Error when the request is not valid'],
        };

        postEntityRequestToEntityCreationQueryConverter.transform.mockResolvedValueOnce(
          entityCreationQueryOrErrorsFixture,
        );

        await postCardV1RequestHandler.handle(requestFixture, replyFixture);
      });

      afterAll(() => {
        entityToEntityApiConverter.transform.mockClear();
        createEntitiesInteractor.interact.mockClear();
        postEntityRequestToEntityCreationQueryConverter.transform.mockClear();

        replyFixture.code.mockClear();
        replyFixture.send.mockClear();
      });

      it('must call reply.code() with bad status HTTP code', () => {
        expect(replyFixture.code).toHaveBeenCalledTimes(1);
        expect(replyFixture.code).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
      });

      it('must call reply.send() with the validation errror message', () => {
        expect(replyFixture.send).toHaveBeenCalledTimes(1);
        expect(replyFixture.send).toHaveBeenCalledWith({
          message: entityCreationQueryOrErrorsFixture.value.join('\n'),
        });
      });
    });
  });
});
