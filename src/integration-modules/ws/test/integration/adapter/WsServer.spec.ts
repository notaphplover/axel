import WebSocket from 'ws';

import {
  Converter,
  EitherEither,
  ValueEither,
  ValueOrErrors,
} from '../../../../../common/domain';
import { WsMessageHandler } from '../../../adapter/msgHandler/WsMessageHandler';
import { WsRequestContext } from '../../../adapter/WsRequestContext';
import { WsServer } from '../../../adapter/WsServer';

interface RequestContextMock {
  context: unknown;
}

async function waitSocketConnected(socket: WebSocket): Promise<void> {
  return new Promise((resolve: () => void) => {
    const interval: NodeJS.Timeout = setInterval(() => {
      if (socket.readyState === WebSocket.OPEN) {
        clearInterval(interval);
        resolve();
      }
    }, 50);
  });
}

describe(WsServer.name, () => {
  let wsMessageHandler: jest.Mocked<
    WsMessageHandler<unknown, RequestContextMock>
  >;
  let webSocketMessageDataToRequestContextTransformer: jest.Mocked<
    Converter<
      WebSocket.Data,
      Promise<ValueOrErrors<RequestContextMock>>,
      WsRequestContext
    >
  >;

  beforeAll(() => {
    wsMessageHandler = {
      handle: jest.fn().mockResolvedValue(undefined),
    };

    webSocketMessageDataToRequestContextTransformer = {
      transform: jest.fn(),
    };
  });

  describe('.bootstrap()', () => {
    describe('having an incoming message', () => {
      let requestContextOrErrorsFixture: ValueEither<RequestContextMock>;

      beforeAll(() => {
        requestContextOrErrorsFixture = {
          isEither: false,
          value: {
            context: undefined,
          },
        };
      });

      describe('when called', () => {
        let wsServer: WsServer<RequestContextMock>;
        let webSocket: WebSocket;
        let webSocketOnOpenHandlerMock: jest.Mock;
        let webSocketOnUpgradeHandlerMock: jest.Mock;

        beforeAll(async () => {
          const port: number = 25611;

          wsServer = new WsServer(
            port,
            webSocketMessageDataToRequestContextTransformer,
            wsMessageHandler,
          );

          void wsServer.bootstrap();

          webSocket = new WebSocket(`ws://localhost:${port}`);

          return new Promise<void>((resolve: () => void) => {
            webSocketOnOpenHandlerMock = jest.fn();

            webSocketOnUpgradeHandlerMock = jest
              .fn()
              .mockImplementationOnce(() => {
                resolve();
              });

            webSocket.on('open', webSocketOnOpenHandlerMock);
            webSocket.on('upgrade', webSocketOnUpgradeHandlerMock);
          });
        });

        afterAll(async () => {
          await wsServer.close();
        });

        it('websocket open event must be raised', () => {
          expect(webSocketOnOpenHandlerMock).toHaveBeenCalledTimes(1);
        });

        it('websocket upgrade event must be raised', () => {
          expect(webSocketOnUpgradeHandlerMock).toHaveBeenCalledTimes(1);
        });

        describe('when the client sends a first message', () => {
          describe('when the message is handled successfully', () => {
            let message: string;

            beforeAll(async () => {
              message = '{ "text": "sample message" }';

              await waitSocketConnected(webSocket);

              return new Promise<void>((resolve: () => void) => {
                webSocketMessageDataToRequestContextTransformer.transform.mockImplementationOnce(
                  async (): Promise<ValueOrErrors<RequestContextMock>> => {
                    resolve();

                    return requestContextOrErrorsFixture;
                  },
                );

                webSocket.send(message);
              });
            });

            afterAll(() => {
              webSocketMessageDataToRequestContextTransformer.transform.mockClear();
            });

            it('must handle the message', () => {
              expect(
                webSocketMessageDataToRequestContextTransformer.transform,
              ).toHaveBeenCalledTimes(1);
              expect(
                webSocketMessageDataToRequestContextTransformer.transform,
              ).toHaveBeenCalledWith(message, {
                socket: expect.any(WebSocket) as WebSocket,
              });
            });

            describe('when a message which is not a valid JSON is sent', () => {
              let webSocketOnMessageHandlerMock: jest.Mock;

              beforeAll(async () => {
                return new Promise<void>((resolve: () => void) => {
                  webSocketOnMessageHandlerMock = jest
                    .fn()
                    .mockImplementation(() => {
                      resolve();
                    });

                  webSocket.on('message', webSocketOnMessageHandlerMock);

                  webSocket.send('sample message');
                });
              });

              afterAll(() => {
                wsMessageHandler.handle.mockClear();
              });

              it('must not handle the message', () => {
                expect(wsMessageHandler.handle).toHaveBeenCalledTimes(0);
              });

              it('must receive an error message', () => {
                expect(webSocketOnMessageHandlerMock).toHaveBeenCalledTimes(1);
                expect(webSocketOnMessageHandlerMock).toHaveBeenCalledWith(
                  expect.stringContaining('Unable to parse message'),
                );
              });
            });

            describe('when a message is sent and is not handled successfully', () => {
              let message: string;

              let webSocketOnMessageHandlerMock: jest.Mock;

              beforeAll(async () => {
                message = '{ "message": "sample message" }';

                wsMessageHandler.handle.mockRejectedValueOnce(
                  new Error('Test when handler fails'),
                );

                return new Promise<void>((resolve: () => void) => {
                  webSocketOnMessageHandlerMock = jest
                    .fn()
                    .mockImplementation(() => {
                      resolve();
                    });

                  webSocket.on('message', webSocketOnMessageHandlerMock);

                  webSocket.send(message);
                });
              });

              afterAll(() => {
                wsMessageHandler.handle.mockClear();
              });

              it('must handle the message', () => {
                expect(wsMessageHandler.handle).toHaveBeenCalledTimes(1);
                expect(wsMessageHandler.handle).toHaveBeenCalledWith(
                  expect.any(WebSocket),
                  JSON.parse(message),
                  requestContextOrErrorsFixture.value,
                );
              });

              it('must receive an error message', () => {
                expect(webSocketOnMessageHandlerMock).toHaveBeenCalledTimes(1);
                expect(webSocketOnMessageHandlerMock).toHaveBeenCalledWith(
                  expect.stringContaining('Unable to parse message'),
                );
              });
            });

            describe('when a message is sent and is handled successfully', () => {
              let message: string;

              beforeAll(async () => {
                message = '{ "message": "sample message" }';

                return new Promise<void>((resolve: () => void) => {
                  wsMessageHandler.handle.mockImplementationOnce(async () => {
                    resolve();
                  });

                  webSocket.send(message);
                });
              });

              afterAll(() => {
                wsMessageHandler.handle.mockClear();
              });

              it('must handle the message', () => {
                expect(wsMessageHandler.handle).toHaveBeenCalledTimes(1);
                expect(wsMessageHandler.handle).toHaveBeenCalledWith(
                  expect.any(WebSocket),
                  JSON.parse(message),
                  requestContextOrErrorsFixture.value,
                );
              });
            });
          });

          describe('when the message is not handled successfully', () => {
            let requestContextOrErrorsFixture: EitherEither<string[]>;

            let webSocketMessageDataToRequestContextTransformer: jest.Mocked<
              Converter<
                WebSocket.Data,
                Promise<ValueOrErrors<RequestContextMock>>,
                WsRequestContext
              >
            >;

            let wsServer: WsServer<RequestContextMock>;
            let webSocket: WebSocket;
            let webSocketOnOpenHandlerMock: jest.Mock;
            let webSocketOnUpgradeHandlerMock: jest.Mock;

            let message: string;

            beforeAll(async () => {
              requestContextOrErrorsFixture = {
                isEither: true,
                value: ['sample error message'],
              };

              const port: number = 25613;

              webSocketMessageDataToRequestContextTransformer = {
                transform: jest
                  .fn()
                  .mockResolvedValueOnce(requestContextOrErrorsFixture),
              };

              wsServer = new WsServer(
                port,
                webSocketMessageDataToRequestContextTransformer,
                wsMessageHandler,
              );

              void wsServer.bootstrap();

              webSocket = new WebSocket(`ws://localhost:${port}`);

              webSocketOnOpenHandlerMock = jest.fn();

              webSocketOnUpgradeHandlerMock = jest.fn();

              webSocket.on('open', webSocketOnOpenHandlerMock);
              webSocket.on('upgrade', webSocketOnUpgradeHandlerMock);

              message = '{ "text": "sample message" }';

              await waitSocketConnected(webSocket);

              return new Promise<void>((resolve: () => void) => {
                webSocket.send(message);

                webSocket.once('close', () => {
                  resolve();
                });
              });
            });

            afterAll(async () => {
              await wsServer.close();
            });

            it('must call webSocketMessageDataToRequestContextTransformer.transform', () => {
              expect(
                webSocketMessageDataToRequestContextTransformer.transform,
              ).toHaveBeenCalledTimes(1);
              expect(
                webSocketMessageDataToRequestContextTransformer.transform,
              ).toHaveBeenCalledWith(message, {
                socket: expect.any(WebSocket) as WebSocket,
              });
            });

            it('must close the connection', () => {
              expect([WebSocket.CLOSING, WebSocket.CLOSED]).toContain(
                webSocket.readyState,
              );
            });
          });
        });
      });

      describe('when called, and a message is receive before the validator gets the validation result', () => {
        let messageFixture: string;
        let wsServer: WsServer<RequestContextMock>;
        let webSocket: WebSocket;
        let webSocketOnOpenHandlerMock: jest.Mock;
        let webSocketOnUpgradeHandlerMock: jest.Mock;

        beforeAll(async () => {
          messageFixture = '{ "text": "sample message" }';

          const port: number = 25612;

          wsServer = new WsServer(
            port,
            webSocketMessageDataToRequestContextTransformer,
            wsMessageHandler,
          );

          void wsServer.bootstrap();

          webSocket = new WebSocket(`ws://localhost:${port}`);

          return new Promise<void>((resolve: () => void) => {
            wsMessageHandler.handle.mockImplementationOnce(async () => {
              resolve();
            });

            webSocketOnOpenHandlerMock = jest.fn();
            webSocketOnUpgradeHandlerMock = jest.fn();

            webSocket.on('open', webSocketOnOpenHandlerMock);
            webSocket.on('upgrade', webSocketOnUpgradeHandlerMock);

            void waitSocketConnected(webSocket).then(() => {
              webSocket.send(messageFixture, () => {
                webSocketMessageDataToRequestContextTransformer.transform.mockImplementationOnce(
                  async (): Promise<ValueOrErrors<RequestContextMock>> => {
                    return new Promise(
                      (
                        resolve: (
                          validationResult: ValueOrErrors<RequestContextMock>,
                        ) => void,
                      ) => {
                        webSocket.send(messageFixture, () => {
                          resolve(requestContextOrErrorsFixture);
                        });
                      },
                    );
                  },
                );
              });
            });
          });
        });

        afterAll(async () => {
          webSocketMessageDataToRequestContextTransformer.transform.mockClear();
          wsMessageHandler.handle.mockClear();

          await wsServer.close();
        });

        it('websocket open event must be raised', () => {
          expect(webSocketOnOpenHandlerMock).toHaveBeenCalledTimes(1);
        });

        it('websocket upgrade event must be raised', () => {
          expect(webSocketOnUpgradeHandlerMock).toHaveBeenCalledTimes(1);
        });

        it('must handle the message', () => {
          expect(wsMessageHandler.handle).toHaveBeenCalledTimes(1);
          expect(wsMessageHandler.handle).toHaveBeenCalledWith(
            expect.any(WebSocket),
            JSON.parse(messageFixture),
            requestContextOrErrorsFixture.value,
          );
        });

        it('must not close the connection', () => {
          expect([WebSocket.CLOSING, WebSocket.CLOSED]).not.toContain(
            webSocket.readyState,
          );
        });
      });
    });
  });
});
