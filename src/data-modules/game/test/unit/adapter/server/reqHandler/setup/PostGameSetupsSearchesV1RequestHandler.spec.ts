/* eslint-disable @typescript-eslint/unbound-method */
import 'reflect-metadata';
import * as fastify from 'fastify';
import { StatusCodes } from 'http-status-codes';

import { Converter, Interactor } from '../../../../../../../../common/domain';
import {
  EitherEither,
  ValueEither,
} from '../../../../../../../../common/domain/either/Either';
import { ValueOrErrors } from '../../../../../../../../common/domain/either/ValueOrErrors';
import { commonTest } from '../../../../../../../../common/test';
import { BasicGameSetupApiV1 } from '../../../../../../adapter/api/model/setup/BasicGameSetupApiV1';
import { PostGameSetupsSearchesV1RequestHandler } from '../../../../../../adapter/server/reqHandler/setup/PostGameSetupsSearchesV1RequestHandler';
import { GameSetup } from '../../../../../../domain/model/setup/GameSetup';
import { GameSetupFindQuery } from '../../../../../../domain/query/setup/GameSetupFindQuery';
import { basicGameSetupApiV1FixtureFactory } from '../../../../../fixtures/adapter/api/model/setup';
import { gameSetupFindQueryApiV1FixtureFactory } from '../../../../../fixtures/adapter/api/query/setup';
import { gameSetupFixtureFactory } from '../../../../../fixtures/domain/model/setup';
import { gameSetupFindQueryFixtureFactory } from '../../../../../fixtures/domain/query/setup';

describe(PostGameSetupsSearchesV1RequestHandler.name, () => {
  let gameSetupToBasicGameSetupApiV1Converter: jest.Mocked<
    Converter<GameSetup, BasicGameSetupApiV1>
  >;
  let findGameSetupsInteractor: jest.Mocked<
    Interactor<GameSetupFindQuery, Promise<GameSetup[]>>
  >;
  let postGameSetupsSearchesV1RequestToGameSetupFindQueryConverter: jest.Mocked<
    Converter<
      fastify.FastifyRequest,
      Promise<ValueOrErrors<GameSetupFindQuery>>
    >
  >;

  let postGameSetupsSearchesV1RequestHandler: PostGameSetupsSearchesV1RequestHandler;

  beforeAll(() => {
    gameSetupToBasicGameSetupApiV1Converter = {
      transform: jest.fn(),
    };
    findGameSetupsInteractor = {
      interact: jest.fn(),
    };
    postGameSetupsSearchesV1RequestToGameSetupFindQueryConverter = {
      transform: jest.fn(),
    };

    postGameSetupsSearchesV1RequestHandler = new PostGameSetupsSearchesV1RequestHandler(
      gameSetupToBasicGameSetupApiV1Converter,
      findGameSetupsInteractor,
      postGameSetupsSearchesV1RequestToGameSetupFindQueryConverter,
    );
  });

  describe('.handle()', () => {
    describe('when called and some game setups are found', () => {
      let requestFixture: fastify.FastifyRequest;
      let replyFixture: fastify.FastifyReply;

      let gameSetupFindQueryOrErrors: ValueEither<GameSetupFindQuery>;

      beforeAll(async () => {
        requestFixture = ({
          body: gameSetupFindQueryApiV1FixtureFactory.get(),
        } as Partial<fastify.FastifyRequest>) as fastify.FastifyRequest;
        replyFixture = commonTest.fixtures.adapter.server.fastifyReplyFixtureFactory.get();

        gameSetupFindQueryOrErrors = {
          isEither: false,
          value: gameSetupFindQueryFixtureFactory.get(),
        };

        gameSetupToBasicGameSetupApiV1Converter.transform.mockReturnValueOnce(
          basicGameSetupApiV1FixtureFactory.get(),
        );

        findGameSetupsInteractor.interact.mockResolvedValueOnce([
          gameSetupFixtureFactory.get(),
        ]);

        postGameSetupsSearchesV1RequestToGameSetupFindQueryConverter.transform.mockResolvedValueOnce(
          gameSetupFindQueryOrErrors,
        );

        await postGameSetupsSearchesV1RequestHandler.handle(
          requestFixture,
          replyFixture,
        );
      });

      afterAll(() => {
        gameSetupToBasicGameSetupApiV1Converter.transform.mockClear();
        findGameSetupsInteractor.interact.mockClear();
        postGameSetupsSearchesV1RequestToGameSetupFindQueryConverter.transform.mockClear();
      });

      it('must call findGameSetupsInteractor.interact()', () => {
        expect(findGameSetupsInteractor.interact).toHaveBeenCalledTimes(1);
        expect(findGameSetupsInteractor.interact).toHaveBeenCalledWith(
          gameSetupFindQueryFixtureFactory.get(),
        );
      });

      it('must call basicGameSetupToBasicGameSetupApiV1Converter.transform()', () => {
        expect(
          gameSetupToBasicGameSetupApiV1Converter.transform,
        ).toHaveBeenCalledTimes(1);
        expect(
          gameSetupToBasicGameSetupApiV1Converter.transform,
        ).toHaveBeenCalledWith(gameSetupFixtureFactory.get());
      });

      it('must call reply.send()', () => {
        expect(replyFixture.send).toHaveBeenCalledTimes(1);
        expect(replyFixture.send).toHaveBeenCalledWith([
          basicGameSetupApiV1FixtureFactory.get(),
        ]);
      });
    });

    describe('when called and the params are not valid', () => {
      let requestFixture: fastify.FastifyRequest;
      let replyFixture: fastify.FastifyReply;

      let errorsFixture: EitherEither<string[]>;

      beforeAll(async () => {
        requestFixture = ({
          body: gameSetupFindQueryApiV1FixtureFactory.get(),
        } as Partial<fastify.FastifyRequest>) as fastify.FastifyRequest;
        replyFixture = commonTest.fixtures.adapter.server.fastifyReplyFixtureFactory.get();

        errorsFixture = {
          value: ['sample-error-message'],
          isEither: true,
        };

        postGameSetupsSearchesV1RequestToGameSetupFindQueryConverter.transform.mockResolvedValueOnce(
          errorsFixture,
        );

        await postGameSetupsSearchesV1RequestHandler.handle(
          requestFixture,
          replyFixture,
        );
      });

      afterAll(() => {
        postGameSetupsSearchesV1RequestToGameSetupFindQueryConverter.transform.mockClear();
      });

      it('must call reply.code() with BAD_REQUEST http code', () => {
        expect(replyFixture.code).toHaveBeenCalledTimes(1);
        expect(replyFixture.code).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
      });

      it('must call reply.send() with the validation error message', () => {
        expect(replyFixture.send).toHaveBeenCalledTimes(1);
        expect(replyFixture.send).toHaveBeenCalledWith({
          message: errorsFixture.value[0],
        });
      });
    });
  });
});
