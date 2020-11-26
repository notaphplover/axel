/* eslint-disable @typescript-eslint/unbound-method */
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

import { DbConnector } from '../../../../../layer-modules/db/domain';
import { FastifyPortListeningServer } from '../../../adapter/FastifyPortListeningServer';
import { FastifyRouter } from '../../../adapter/FastifyRouter';

function buildRouterMock(): FastifyRouter {
  return {
    injectRoutes: jest.fn(),
  };
}

describe(FastifyPortListeningServer.name, () => {
  let mongoDbConnector: DbConnector;
  let mongooseConnector: DbConnector;
  let router: FastifyRouter;

  let fastifyServer: FastifyPortListeningServer;

  let routers: FastifyRouter[];

  afterAll(() => {
    jest.resetModules();
  });

  beforeAll(() => {
    mongoDbConnector = {
      close: jest.fn() as () => Promise<void>,
      connect: jest.fn() as () => Promise<void>,
    } as DbConnector;
    mongooseConnector = {
      close: jest.fn() as () => Promise<void>,
      connect: jest.fn() as () => Promise<void>,
    } as DbConnector;
    router = buildRouterMock();

    routers = [router];

    const portToListen: number = 3000;

    fastifyServer = new FastifyPortListeningServer(
      mongoDbConnector,
      mongooseConnector,
      routers,
      portToListen,
    );
  });

  describe('.bootstrap()', () => {
    describe('when called', () => {
      beforeAll(async () => {
        await fastifyServer.bootstrap();
      });

      afterAll(async () => {
        (mongoDbConnector.connect as jest.Mock).mockClear();
        (mongooseConnector.connect as jest.Mock).mockClear();
        (router.injectRoutes as jest.Mock).mockClear();
      });

      it(`must call mongodbConnector.connect()`, () => {
        expect(mongoDbConnector.connect).toBeCalledTimes(1);
      });

      it(`must call mongooseConnector.connect()`, () => {
        expect(mongooseConnector.connect).toBeCalledTimes(1);
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

      afterAll(async () => {
        (fastifyInstance.close as jest.Mock).mockClear();
        (mongoDbConnector.close as jest.Mock).mockClear();
        (mongooseConnector.close as jest.Mock).mockClear();
      });

      it(`must call mongodbConnector.close()`, () => {
        expect(mongoDbConnector.close).toBeCalledTimes(1);
      });

      it(`must call mongooseConnector.close()`, () => {
        expect(mongooseConnector.close).toBeCalledTimes(1);
      });

      it('must call fastifyInstance.close', () => {
        expect(fastifyInstance.close).toHaveBeenCalledTimes(1);
      });
    });
  });
});
