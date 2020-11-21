/* eslint-disable @typescript-eslint/unbound-method */
import 'reflect-metadata';
import {
  Converter,
  Interactor,
  ValidationFail,
  ValidationSuccess,
  Validator,
} from '../../../../../../../../common/domain';
import { FastifyReply, FastifyRequest } from 'fastify';
import { BasicGameSetup } from '../../../../../../domain/model/setup/BasicGameSetup';
import { BasicGameSetupApiV1 } from '../../../../../../adapter/api/model/setup/BasicGameSetupApiV1';
import { GameSetupFindQuery } from '../../../../../../domain/query/setup/GameSetupFindQuery';
import { GameSetupFindQueryApiV1 } from '../../../../../../adapter/api/query/setup/GameSetupFindQueryApiV1';
import { PostGameSetupsSearchesV1RequestHandler } from '../../../../../../adapter/server/reqHandler/setup/PostGameSetupsSearchesV1RequestHandler';
import { StatusCodes } from 'http-status-codes';
import { basicGameSetupApiV1FixtureFactory } from '../../../../../fixtures/adapter/api/model/setup';
import { basicGameSetupFindQueryFixtureFactory } from '../../../../../fixtures/domain/query/setup';
import { basicGameSetupFixtureFactory } from '../../../../../fixtures/domain/model/setup';
import { commonTest } from '../../../../../../../../common/test';
import { gameSetupFindQueryApiV1FixtureFactory } from '../../../../../fixtures/adapter/api/query/setup';

describe(PostGameSetupsSearchesV1RequestHandler.name, () => {
  let basicGameSetupToBasicGameSetupApiV1Converter: Converter<
    BasicGameSetup,
    BasicGameSetupApiV1
  >;
  let findBasicGameSetupsInteractor: Interactor<
    GameSetupFindQuery,
    Promise<BasicGameSetup[]>
  >;
  let gameSetupFindQueryApiV1ToGameSetupFindQueryConverter: Converter<
    GameSetupFindQueryApiV1,
    GameSetupFindQuery
  >;
  let gameSetupFindQueryApiV1Validator: Validator<GameSetupFindQueryApiV1>;

  let postGameSetupsSearchesV1RequestHandler: PostGameSetupsSearchesV1RequestHandler;

  beforeAll(() => {
    basicGameSetupToBasicGameSetupApiV1Converter = {
      transform: jest.fn(),
    };
    findBasicGameSetupsInteractor = {
      interact: jest.fn(),
    };
    gameSetupFindQueryApiV1ToGameSetupFindQueryConverter = {
      transform: jest.fn(),
    };
    gameSetupFindQueryApiV1Validator = {
      validate: jest.fn(),
    };

    postGameSetupsSearchesV1RequestHandler = new PostGameSetupsSearchesV1RequestHandler(
      basicGameSetupToBasicGameSetupApiV1Converter,
      findBasicGameSetupsInteractor,
      gameSetupFindQueryApiV1ToGameSetupFindQueryConverter,
      gameSetupFindQueryApiV1Validator,
    );
  });

  describe('.handle()', () => {
    describe('when called and some game setups are found', () => {
      let requestFixture: FastifyRequest;
      let replyFixture: FastifyReply;

      let validationResultFixture: ValidationSuccess<GameSetupFindQueryApiV1>;

      beforeAll(async () => {
        requestFixture = ({
          body: gameSetupFindQueryApiV1FixtureFactory.get(),
        } as Partial<FastifyRequest>) as FastifyRequest;
        replyFixture = commonTest.fixtures.adapter.server.fastifyReplyFixtureFactory.get();

        validationResultFixture = {
          model: gameSetupFindQueryApiV1FixtureFactory.get(),
          result: true,
        };

        (basicGameSetupToBasicGameSetupApiV1Converter.transform as jest.Mock).mockReturnValueOnce(
          basicGameSetupApiV1FixtureFactory.get(),
        );

        (findBasicGameSetupsInteractor.interact as jest.Mock).mockResolvedValueOnce(
          [basicGameSetupFixtureFactory.get()],
        );

        (gameSetupFindQueryApiV1ToGameSetupFindQueryConverter.transform as jest.Mock).mockReturnValueOnce(
          basicGameSetupFindQueryFixtureFactory.get(),
        );

        (gameSetupFindQueryApiV1Validator.validate as jest.Mock).mockReturnValueOnce(
          validationResultFixture,
        );

        await postGameSetupsSearchesV1RequestHandler.handle(
          requestFixture,
          replyFixture,
        );
      });

      afterAll(() => {
        (basicGameSetupToBasicGameSetupApiV1Converter.transform as jest.Mock).mockClear();
        (findBasicGameSetupsInteractor.interact as jest.Mock).mockClear();
        (gameSetupFindQueryApiV1ToGameSetupFindQueryConverter.transform as jest.Mock).mockClear();
        (gameSetupFindQueryApiV1Validator.validate as jest.Mock).mockClear();
      });

      it('must call gameSetupFindQueryApiV1Validator.validate with the request params', () => {
        expect(gameSetupFindQueryApiV1Validator.validate).toHaveBeenCalledTimes(
          1,
        );
        expect(gameSetupFindQueryApiV1Validator.validate).toHaveBeenCalledWith(
          requestFixture.body,
        );
      });

      it('must call gameSetupFindQueryApiV1ToGameSetupFindQueryConverter.transform with the validation model', () => {
        expect(
          gameSetupFindQueryApiV1ToGameSetupFindQueryConverter.transform,
        ).toHaveBeenCalledTimes(1);
        expect(
          gameSetupFindQueryApiV1ToGameSetupFindQueryConverter.transform,
        ).toHaveBeenCalledWith(validationResultFixture.model);
      });

      it('must call findGameSetupsInteractor.interact()', () => {
        expect(findBasicGameSetupsInteractor.interact).toHaveBeenCalledTimes(1);
        expect(findBasicGameSetupsInteractor.interact).toHaveBeenCalledWith(
          basicGameSetupFindQueryFixtureFactory.get(),
        );
      });

      it('must call basicGameSetupToBasicGameSetupApiV1Converter.transform()', () => {
        expect(
          basicGameSetupToBasicGameSetupApiV1Converter.transform,
        ).toHaveBeenCalledTimes(1);
        expect(
          basicGameSetupToBasicGameSetupApiV1Converter.transform,
        ).toHaveBeenCalledWith(basicGameSetupFixtureFactory.get());
      });

      it('must call reply.send()', () => {
        expect(replyFixture.send).toHaveBeenCalledTimes(1);
        expect(replyFixture.send).toHaveBeenCalledWith([
          basicGameSetupApiV1FixtureFactory.get(),
        ]);
      });
    });

    describe('when called and the params are not valid', () => {
      let requestFixture: FastifyRequest;
      let replyFixture: FastifyReply;

      let validationResultFixture: ValidationFail;

      beforeAll(async () => {
        requestFixture = ({
          body: gameSetupFindQueryApiV1FixtureFactory.get(),
        } as Partial<FastifyRequest>) as FastifyRequest;
        replyFixture = commonTest.fixtures.adapter.server.fastifyReplyFixtureFactory.get();

        validationResultFixture = {
          errorMessage: 'sample-error-message',
          result: false,
        };

        (gameSetupFindQueryApiV1Validator.validate as jest.Mock).mockReturnValueOnce(
          validationResultFixture,
        );

        await postGameSetupsSearchesV1RequestHandler.handle(
          requestFixture,
          replyFixture,
        );
      });

      afterAll(() => {
        (gameSetupFindQueryApiV1Validator.validate as jest.Mock).mockClear();
      });

      it('must call reply.code() with BAD_REQUEST http code', () => {
        expect(replyFixture.code).toHaveBeenCalledTimes(1);
        expect(replyFixture.code).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
      });

      it('must call reply.send() with the validation error message', () => {
        expect(replyFixture.send).toHaveBeenCalledTimes(1);
        expect(replyFixture.send).toHaveBeenCalledWith({
          message: validationResultFixture.errorMessage,
        });
      });
    });
  });
});
