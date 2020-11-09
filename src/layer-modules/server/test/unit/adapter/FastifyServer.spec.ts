/* eslint-disable @typescript-eslint/unbound-method */
import 'reflect-metadata';
import {
  FastifyInstance,
  FastifyLoggerInstance,
  FastifyServerOptions,
} from 'fastify';
import { FastifyPortListeningServer } from '../../../adapter/FastifyPortListeningServer';
import { FastifyRouter } from '../../../adapter/FastifyRouter';
import { MongooseConector } from '../../../../../integration-modules/mongoose/adapter';

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

describe(FastifyPortListeningServer.name, () => {
  let mongooseConnector: MongooseConector;
  let router: FastifyRouter;

  let fastifyServer: FastifyPortListeningServer;

  let routers: FastifyRouter[];

  afterAll(() => {
    jest.resetModules();
  });

  beforeAll(() => {
    mongooseConnector = {
      connect: jest.fn() as () => Promise<void>,
    } as MongooseConector;
    router = buildRouterMock();

    routers = [router];

    const portToListen: number = 3000;

    fastifyServer = new FastifyPortListeningServer(
      mongooseConnector,
      routers,
      portToListen,
    );
  });

  describe(`.${FastifyPortListeningServer.prototype.bootstrap.name}`, () => {
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
