import 'reflect-metadata';
import {
  FastifyInstance,
  FastifyLoggerInstance,
  FastifyServerOptions,
} from 'fastify';

let fastifyInstance: FastifyInstance;

jest.mock('fastify', () =>
  jest.fn().mockImplementation(() => {
    const fastifyInstanceMock: FastifyInstance = ({
      close: jest.fn().mockResolvedValue(undefined),
      listen: jest.fn().mockResolvedValue(undefined),
      log: ({
        error: jest.fn(),
      } as Partial<FastifyLoggerInstance>) as FastifyLoggerInstance,
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

    fastifyInstance = fastifyInstanceMock;

    return fastifyInstanceMock;
  }),
);

import { FastifyPortListeningServer } from '../../../adapter/FastifyPortListeningServer';
import { FastifyRouter } from '../../../adapter/FastifyRouter';

function buildRouterMock(): FastifyRouter {
  return {
    injectRoutes: jest.fn(),
  };
}

describe(FastifyPortListeningServer.name, () => {
  let router: FastifyRouter;

  let fastifyServer: FastifyPortListeningServer;

  let routers: FastifyRouter[];

  afterAll(() => {
    jest.resetModules();
  });

  beforeAll(() => {
    router = buildRouterMock();

    routers = [router];

    const portToListen: number = 3000;

    fastifyServer = new FastifyPortListeningServer(routers, portToListen);
  });

  describe('.bootstrap()', () => {
    describe('when called', () => {
      beforeAll(async () => {
        await fastifyServer.bootstrap();
      });

      it('must call router.injectRoutes for each router', () => {
        routers.forEach((router: FastifyRouter) => {
          expect(router.injectRoutes).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('.close()', () => {
    describe('when called', () => {
      beforeAll(async () => {
        await fastifyServer.close();
      });

      it('must call fastifyInstance.close', () => {
        expect(fastifyInstance.close).toHaveBeenCalledTimes(1);
      });
    });
  });
});
