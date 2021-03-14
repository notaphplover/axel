import WebSocket from 'ws';

import { AppWsMessage } from '../../../../../adapter/ws/message/AppWsMessage';
import { AppWsMessageHandler } from '../../../../../adapter/ws/msgHandler/AppWsMessageHandler';
import { AppWsMessageRouter } from '../../../../../adapter/ws/msgHandler/AppWsMessageRouter';

describe(AppWsMessageRouter.name, () => {
  let appWsMessageHandlerMock: jest.Mocked<AppWsMessageHandler>;

  let appWsMessageRouter: AppWsMessageRouter;

  beforeAll(() => {
    appWsMessageHandlerMock = {
      handle: jest.fn(),
      messageTypes: ['sample-message-type'],
    };

    appWsMessageRouter = new AppWsMessageRouter([appWsMessageHandlerMock]);
  });

  describe('.handle()', () => {
    describe('having not an app message', () => {
      let appWsMessageFixture: unknown;

      beforeAll(() => {
        appWsMessageFixture = {};
      });

      describe('when called', () => {
        let error: unknown;

        beforeAll(async () => {
          try {
            const webSocketMock: jest.Mocked<WebSocket> = ({} as Partial<
              jest.Mocked<WebSocket>
            >) as jest.Mocked<WebSocket>;

            await appWsMessageRouter.handle(webSocketMock, appWsMessageFixture);
          } catch (err: unknown) {
            error = err;
          }
        });

        afterAll(() => {
          appWsMessageHandlerMock.handle.mockClear();
        });

        it('must not call appWsMessageHandlerMock.handle', () => {
          expect(appWsMessageHandlerMock.handle).not.toHaveBeenCalled();
        });

        it('must throw an error', () => {
          expect(error).toBeInstanceOf(Error);
        });
      });
    });

    describe('having a message of unregistered type', () => {
      let appWsMessageFixture: AppWsMessage;

      beforeAll(() => {
        appWsMessageFixture = {
          type: 'sample-unregistered-message-type',
        };
      });

      describe('when called', () => {
        let error: unknown;

        beforeAll(async () => {
          try {
            const webSocketMock: jest.Mocked<WebSocket> = ({} as Partial<
              jest.Mocked<WebSocket>
            >) as jest.Mocked<WebSocket>;

            await appWsMessageRouter.handle(webSocketMock, appWsMessageFixture);
          } catch (err: unknown) {
            error = err;
          }
        });

        afterAll(() => {
          appWsMessageHandlerMock.handle.mockClear();
        });

        it('must not call appWsMessageHandlerMock.handle', () => {
          expect(appWsMessageHandlerMock.handle).not.toHaveBeenCalled();
        });

        it('must throw an error', () => {
          expect(error).toBeInstanceOf(Error);
        });
      });
    });

    describe('having a message of registered type', () => {
      let appWsMessageFixture: AppWsMessage;

      beforeAll(() => {
        appWsMessageFixture = {
          type: appWsMessageHandlerMock.messageTypes[0],
        };
      });

      describe('when called', () => {
        let webSocketMock: jest.Mocked<WebSocket>;

        beforeAll(async () => {
          webSocketMock = ({} as Partial<
            jest.Mocked<WebSocket>
          >) as jest.Mocked<WebSocket>;

          await appWsMessageRouter.handle(webSocketMock, appWsMessageFixture);
        });

        afterAll(() => {
          appWsMessageHandlerMock.handle.mockClear();
        });

        it('must call appWsMessageHandlerMock.handle', () => {
          expect(appWsMessageHandlerMock.handle).toHaveBeenCalledTimes(1);
          expect(appWsMessageHandlerMock.handle).toHaveBeenCalledWith(
            webSocketMock,
            appWsMessageFixture,
          );
        });
      });
    });
  });
});
