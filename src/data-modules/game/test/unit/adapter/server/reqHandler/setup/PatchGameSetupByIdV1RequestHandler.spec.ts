import 'reflect-metadata';
import * as fastify from 'fastify';
import { StatusCodes } from 'http-status-codes';

import {
  Converter,
  EitherEither,
  Interactor,
  ValueOrErrors,
} from '../../../../../../../../common/domain';
import { commonTest } from '../../../../../../../../common/test';
import { UserContainer } from '../../../../../../../user/domain';
import { userFixtureFactory } from '../../../../../../../user/test/fixtures/domain/model/fixtures';
import { BasicGameSetupApiV1 } from '../../../../../../adapter/api/model/setup/BasicGameSetupApiV1';
import { GameSetupUpdateQueryApiV1 } from '../../../../../../adapter/api/query/setup/GameSetupUpdateQueryApiV1';
import { PatchGameSetupByIdV1RequestHandler } from '../../../../../../adapter/server/reqHandler/setup/PatchGameSetupByIdV1RequestHandler';
import { GameSetup } from '../../../../../../domain/model/setup/GameSetup';
import { GameSetupUpdateQuery } from '../../../../../../domain/query/setup/GameSetupUpdateQuery';
import {
  basicGameSetupApiV1FixtureFactory,
  extendedGameSetupApiV1FixtureFactory,
} from '../../../../../fixtures/adapter/api/model/setup';
import { gameSetupUpdateQueryApiV1FixtureFactory } from '../../../../../fixtures/adapter/api/query/setup';
import { gameSetupFixtureFactory } from '../../../../../fixtures/domain/model/setup';
import { gameSetupUpdateQueryFixtureFactory } from '../../../../../fixtures/domain/query/setup';

describe(PatchGameSetupByIdV1RequestHandler.name, () => {
  let gameSetupToBasicGameSetupApiV1Converter: jest.Mocked<
    Converter<GameSetup, BasicGameSetupApiV1>
  >;
  let patchGameSetupByIdV1RequestToGameSetupUpdateQueryConverter: jest.Mocked<
    Converter<
      fastify.FastifyRequest & UserContainer,
      Promise<ValueOrErrors<GameSetupUpdateQuery>>
    >
  >;
  let updateGameSetupInteractor: jest.Mocked<
    Interactor<GameSetupUpdateQuery, Promise<GameSetup | null>>
  >;

  let patchGameSetupByIdV1RequestHandler: PatchGameSetupByIdV1RequestHandler;

  beforeAll(() => {
    gameSetupToBasicGameSetupApiV1Converter = {
      transform: jest.fn(),
    };
    patchGameSetupByIdV1RequestToGameSetupUpdateQueryConverter = {
      transform: jest.fn(),
    };
    updateGameSetupInteractor = {
      interact: jest.fn(),
    };

    patchGameSetupByIdV1RequestHandler = new PatchGameSetupByIdV1RequestHandler(
      gameSetupToBasicGameSetupApiV1Converter,
      patchGameSetupByIdV1RequestToGameSetupUpdateQueryConverter,
      updateGameSetupInteractor,
    );
  });

  describe('.handle()', () => {
    describe('when called, and the request is valid', () => {
      let requestFixture: fastify.FastifyRequest & UserContainer;
      let replyFixture: fastify.FastifyReply;

      let gameSetupUpdateQueryOrErrors: ValueOrErrors<GameSetupUpdateQuery>;

      beforeAll(async () => {
        const requestFixtureBody: Partial<GameSetupUpdateQueryApiV1> =
          gameSetupUpdateQueryApiV1FixtureFactory.get();

        delete requestFixtureBody.id;

        requestFixture = {
          body: requestFixtureBody,
          params: {
            gameSetupId: gameSetupUpdateQueryApiV1FixtureFactory.get().id,
          },
          user: userFixtureFactory.get(),
        } as Partial<
          fastify.FastifyRequest & UserContainer
        > as fastify.FastifyRequest & UserContainer;

        replyFixture =
          commonTest.fixtures.adapter.server.fastifyReplyFixtureFactory.get();

        gameSetupUpdateQueryOrErrors = {
          isEither: false,
          value: gameSetupUpdateQueryFixtureFactory.get(),
        };

        updateGameSetupInteractor.interact.mockResolvedValueOnce(
          gameSetupFixtureFactory.get(),
        );

        patchGameSetupByIdV1RequestToGameSetupUpdateQueryConverter.transform.mockResolvedValueOnce(
          gameSetupUpdateQueryOrErrors,
        );

        gameSetupToBasicGameSetupApiV1Converter.transform.mockReturnValueOnce(
          basicGameSetupApiV1FixtureFactory.get(),
        );

        await patchGameSetupByIdV1RequestHandler.handle(
          requestFixture,
          replyFixture,
        );
      });

      afterAll(() => {
        updateGameSetupInteractor.interact.mockClear();
        patchGameSetupByIdV1RequestToGameSetupUpdateQueryConverter.transform.mockClear();
        gameSetupToBasicGameSetupApiV1Converter.transform.mockClear();
      });

      it('must call updateGameSetupInteractor.interact with the domain query parsed', () => {
        expect(updateGameSetupInteractor.interact).toHaveBeenCalledTimes(1);
        expect(updateGameSetupInteractor.interact).toHaveBeenCalledWith(
          gameSetupUpdateQueryFixtureFactory.get(),
        );
      });

      it('must call basicGameSetupToBasicGameSetupApiV1Converter.transform with the domain model received', () => {
        expect(
          gameSetupToBasicGameSetupApiV1Converter.transform,
        ).toHaveBeenCalledTimes(1);
        expect(
          gameSetupToBasicGameSetupApiV1Converter.transform,
        ).toHaveBeenCalledWith(gameSetupFixtureFactory.get());
      });

      it('must call reply.send with the api model converted', () => {
        expect(replyFixture.send).toHaveBeenCalledTimes(1);
        expect(replyFixture.send).toHaveBeenCalledWith(
          extendedGameSetupApiV1FixtureFactory.get(),
        );
      });
    });

    describe('when called, and the request is valid, and no game setup is found', () => {
      let requestFixture: fastify.FastifyRequest & UserContainer;
      let replyFixture: fastify.FastifyReply;

      let gameSetupUpdateQueryOrErrors: ValueOrErrors<GameSetupUpdateQuery>;

      beforeAll(async () => {
        const requestFixtureBody: Partial<GameSetupUpdateQueryApiV1> =
          gameSetupUpdateQueryApiV1FixtureFactory.get();

        delete requestFixtureBody.id;

        requestFixture = {
          body: requestFixtureBody,
          params: {
            gameSetupId: gameSetupUpdateQueryApiV1FixtureFactory.get().id,
          },
          user: userFixtureFactory.get(),
        } as Partial<
          fastify.FastifyRequest & UserContainer
        > as fastify.FastifyRequest & UserContainer;

        replyFixture =
          commonTest.fixtures.adapter.server.fastifyReplyFixtureFactory.get();

        gameSetupUpdateQueryOrErrors = {
          isEither: false,
          value: gameSetupUpdateQueryFixtureFactory.get(),
        };

        patchGameSetupByIdV1RequestToGameSetupUpdateQueryConverter.transform.mockResolvedValueOnce(
          gameSetupUpdateQueryOrErrors,
        );

        updateGameSetupInteractor.interact.mockResolvedValueOnce(null);

        gameSetupToBasicGameSetupApiV1Converter.transform.mockReturnValueOnce(
          basicGameSetupApiV1FixtureFactory.get(),
        );

        await patchGameSetupByIdV1RequestHandler.handle(
          requestFixture,
          replyFixture,
        );
      });

      afterAll(() => {
        patchGameSetupByIdV1RequestToGameSetupUpdateQueryConverter.transform.mockClear();
        updateGameSetupInteractor.interact.mockClear();
        gameSetupToBasicGameSetupApiV1Converter.transform.mockClear();
      });

      it('must call reply.code with a NOT_FOUND code', () => {
        expect(replyFixture.code).toHaveBeenCalledTimes(1);
        expect(replyFixture.code).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
      });

      it('must call reply.send with a message error', () => {
        expect(replyFixture.send).toHaveBeenCalledTimes(1);
        expect(replyFixture.send).toHaveBeenCalledWith({
          message: expect.any(String) as string,
        });
      });
    });

    describe('when called, and the request is not valid', () => {
      let requestFixture: fastify.FastifyRequest & UserContainer;
      let replyFixture: fastify.FastifyReply;

      let gameSetupUpdateQueryOrErrors: EitherEither<string[]>;

      beforeAll(async () => {
        const requestFixtureBody: Partial<GameSetupUpdateQueryApiV1> =
          gameSetupUpdateQueryApiV1FixtureFactory.get();

        delete requestFixtureBody.id;

        requestFixture = {
          body: requestFixtureBody,
          params: {
            gameSetupId: gameSetupUpdateQueryApiV1FixtureFactory.get().id,
          },
          user: userFixtureFactory.get(),
        } as Partial<
          fastify.FastifyRequest & UserContainer
        > as fastify.FastifyRequest & UserContainer;
        replyFixture =
          commonTest.fixtures.adapter.server.fastifyReplyFixtureFactory.get();

        gameSetupUpdateQueryOrErrors = {
          value: ['sample-error-message'],
          isEither: true,
        };

        patchGameSetupByIdV1RequestToGameSetupUpdateQueryConverter.transform.mockResolvedValueOnce(
          gameSetupUpdateQueryOrErrors,
        );

        updateGameSetupInteractor.interact.mockResolvedValueOnce(null);

        gameSetupToBasicGameSetupApiV1Converter.transform.mockReturnValueOnce(
          basicGameSetupApiV1FixtureFactory.get(),
        );

        await patchGameSetupByIdV1RequestHandler.handle(
          requestFixture,
          replyFixture,
        );
      });

      afterAll(() => {
        patchGameSetupByIdV1RequestToGameSetupUpdateQueryConverter.transform.mockClear();
        updateGameSetupInteractor.interact.mockClear();
        gameSetupToBasicGameSetupApiV1Converter.transform.mockClear();
      });

      it('must call reply.code with a BAD_REQUEST code', () => {
        expect(replyFixture.code).toHaveBeenCalledTimes(1);
        expect(replyFixture.code).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
      });

      it('must call reply.send with a message error', () => {
        expect(replyFixture.send).toHaveBeenCalledTimes(1);
        expect(replyFixture.send).toHaveBeenCalledWith({
          message: gameSetupUpdateQueryOrErrors.value[0],
        });
      });
    });
  });
});
