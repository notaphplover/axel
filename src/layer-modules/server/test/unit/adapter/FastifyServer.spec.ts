/* eslint-disable @typescript-eslint/unbound-method */
import 'reflect-metadata';
import {
  FastifyInstance,
  FastifyLoggerInstance,
  FastifyServerOptions,
} from 'fastify';
import { FastifyRouter } from '../../../adapter/FastifyRouter';
import { FastifyServer } from '../../../adapter/FastifyServer';
import { MongooseConector } from '../../../../db/adapter';

jest.mock('fastify', () =>
  jest.fn().mockImplementation(() => {
    const fastifyInstanceMock: FastifyInstance = ({
      listen: jest.fn().mockResolvedValue(undefined),
      log: ({ error: jest.fn() } as Partial<
        FastifyLoggerInstance
      >) as FastifyLoggerInstance,
      register: jest.fn(),
    } as Partial<FastifyInstance>) as FastifyInstance;

    (fastifyInstanceMock.register as jest.Mock).mockImplementation(
      async (
        plugin: (
          server: FastifyInstance,
          options: FastifyServerOptions,
        ) => Promise<void>,
      ) => {
        await plugin(fastifyInstanceMock, {});
      },
    );

    return fastifyInstanceMock;
  }),
);

function buildRouterMock(): FastifyRouter {
  return {
    injectRoutes: jest.fn(),
  };
}

describe(FastifyServer.name, () => {
  let gameRouter: FastifyRouter;
  let mongooseConnector: MongooseConector;
  let fastifyServer: FastifyServer;

  let routers: FastifyRouter[];

  afterAll(() => {
    jest.resetModules();
  });

  beforeAll(() => {
    gameRouter = buildRouterMock();
    mongooseConnector = {
      connect: jest.fn() as () => Promise<void>,
    } as MongooseConector;

    fastifyServer = new FastifyServer(gameRouter, mongooseConnector);

    routers = [gameRouter];
  });

  describe(`.${FastifyServer.prototype.bootstrap.name}`, () => {
    describe('when called', () => {
      beforeAll(async () => {
        await fastifyServer.bootstrap();
      });

      it(`must call mongooseConnector.${MongooseConector.prototype.connect.name}()`, () => {
        expect(mongooseConnector.connect).toBeCalledTimes(1);
      });

      it('must call router.injectRoutes for each router', () => {
        routers.forEach((router: FastifyRouter) => {
          expect(router.injectRoutes).toHaveBeenCalledTimes(1);
        });
      });
    });
  });
});
