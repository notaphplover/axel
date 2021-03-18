import http from 'http';

import WebSocket from 'ws';

import { AsyncValidator, ValidationResult } from '../../../../../common/domain';
import { WsMessageHandler } from '../../../adapter/msgHandler/WsMessageHandler';
import { WsServer } from '../../../adapter/WsServer';

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
  let wsMessageHandler: jest.Mocked<WsMessageHandler>;
  let webSocketConnectionRequestValidator: jest.Mocked<
    AsyncValidator<http.IncomingMessage, http.IncomingMessage>
  >;

  beforeAll(() => {
    wsMessageHandler = {
      handle: jest.fn().mockResolvedValue(undefined),
    };

    webSocketConnectionRequestValidator = {
      validate: jest.fn(),
    };
  });

  describe('.bootstrap()', () => {
    describe('having a valid incoming message', () => {
      let finishValidation: () => void;

      beforeAll(() => {
        webSocketConnectionRequestValidator.validate.mockImplementation(
          async (
            httpIncomingMessage: http.IncomingMessage,
          ): Promise<ValidationResult<http.IncomingMessage>> => {
            return new Promise(
              (
                resolve: (
                  validationResult: ValidationResult<http.IncomingMessage>,
                ) => void,
              ) => {
                finishValidation = () => {
                  resolve({
                    model: httpIncomingMessage,
                    result: true,
                  });
                };
              },
            );
          },
        );
      });

      describe('when called', () => {
        let wsServer: WsServer;
        let webSocket: WebSocket;
        let webSocketOnOpenHandlerMock: jest.Mock;
        let webSocketOnUpgradeHandlerMock: jest.Mock;

        beforeAll(async () => {
          const port: number = 25611;

          wsServer = new WsServer(
            port,
            webSocketConnectionRequestValidator,
            wsMessageHandler,
          );

          void wsServer.bootstrap();

          webSocket = new WebSocket(`ws://localhost:${port}`);

          return new Promise<void>((resolve: () => void) => {
            webSocketOnOpenHandlerMock = jest.fn();

            webSocketOnUpgradeHandlerMock = jest
              .fn()
              .mockImplementationOnce(() => {
                finishValidation();
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

        describe('when the client sends a message', () => {
          describe('when the message is handled successfully', () => {
            let message: string;

            beforeAll(async () => {
              message = '{ "text": "sample message" }';

              return new Promise<void>((resolve: () => void) => {
                wsMessageHandler.handle.mockImplementationOnce(async () => {
                  resolve();
                });
                webSocket.send(message);
              });
            });

            afterAll(() => {
              wsMessageHandler.handle.mockClear();
              webSocketConnectionRequestValidator.validate.mockClear();
            });

            it('must handle the message', () => {
              expect(wsMessageHandler.handle).toHaveBeenCalledTimes(1);
              expect(wsMessageHandler.handle).toHaveBeenCalledWith(
                expect.any(WebSocket),
                JSON.parse(message),
              );
            });
          });

          describe('when the message is not a valid JSON', () => {
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
              webSocketConnectionRequestValidator.validate.mockClear();
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

          describe('when the message is not handled successfully', () => {
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
              webSocketConnectionRequestValidator.validate.mockClear();
            });

            it('must handle the message', () => {
              expect(wsMessageHandler.handle).toHaveBeenCalledTimes(1);
              expect(wsMessageHandler.handle).toHaveBeenCalledWith(
                expect.any(WebSocket),
                JSON.parse(message),
              );
            });

            it('must receive an error message', () => {
              expect(webSocketOnMessageHandlerMock).toHaveBeenCalledTimes(1);
              expect(webSocketOnMessageHandlerMock).toHaveBeenCalledWith(
                expect.stringContaining('Unable to parse message'),
              );
            });
          });
        });
      });

      describe('when called, and a message is receive before the validator gets the validation result', () => {
        let messageFixture: string;
        let wsServer: WsServer;
        let webSocket: WebSocket;
        let webSocketOnOpenHandlerMock: jest.Mock;
        let webSocketOnUpgradeHandlerMock: jest.Mock;

        beforeAll(async () => {
          messageFixture = '{ "text": "sample message" }';

          const port: number = 25612;

          wsServer = new WsServer(
            port,
            webSocketConnectionRequestValidator,
            wsMessageHandler,
          );

          void wsServer.bootstrap();

          webSocket = new WebSocket(`ws://localhost:${port}`);

          return new Promise<void>((resolve: () => void) => {
            webSocketOnOpenHandlerMock = jest.fn();

            webSocketOnUpgradeHandlerMock = jest
              .fn()
              .mockImplementationOnce(() => {
                void (async () => {
                  await waitSocketConnected(webSocket);
                  webSocket.send(messageFixture, () => {
                    finishValidation();
                    resolve();
                  });
                })();
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

        it('must handle the message', () => {
          expect(wsMessageHandler.handle).not.toHaveBeenCalledTimes(1);
        });

        it('must not close the connection', () => {
          expect([WebSocket.CLOSING, WebSocket.CLOSED]).not.toContain(
            webSocket.readyState,
          );
        });
      });
    });

    describe('having an invalid incoming message', () => {
      let finishValidation: () => void;

      beforeAll(() => {
        webSocketConnectionRequestValidator.validate.mockImplementation(
          async (): Promise<ValidationResult<http.IncomingMessage>> => {
            return new Promise(
              (
                resolve: (
                  validationResult: ValidationResult<http.IncomingMessage>,
                ) => void,
              ) => {
                finishValidation = () => {
                  resolve({
                    errorMessage:
                      'Error when an invalid incoming message is sent',
                    result: false,
                  });
                };
              },
            );
          },
        );
      });

      describe('when called, and a message is receive before the validator gets the validation result', () => {
        let wsServer: WsServer;
        let webSocket: WebSocket;
        let webSocketOnOpenHandlerMock: jest.Mock;
        let webSocketOnUpgradeHandlerMock: jest.Mock;

        beforeAll(async () => {
          const port: number = 25613;

          wsServer = new WsServer(
            port,
            webSocketConnectionRequestValidator,
            wsMessageHandler,
          );

          void wsServer.bootstrap();

          webSocket = new WebSocket(`ws://localhost:${port}`);

          return new Promise<void>((resolve: () => void) => {
            webSocketOnOpenHandlerMock = jest.fn();

            webSocketOnUpgradeHandlerMock = jest
              .fn()
              .mockImplementationOnce(() => {
                void (async () => {
                  await waitSocketConnected(webSocket);
                  webSocket.send('{ "text": "sample message" }', () => {
                    finishValidation();
                  });

                  webSocket.once('close', () => {
                    resolve();
                  });
                })();
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

        it('must not handle the message', () => {
          expect(wsMessageHandler.handle).not.toHaveBeenCalled();
        });

        it('must close the connection', () => {
          expect([WebSocket.CLOSING, WebSocket.CLOSED]).toContain(
            webSocket.readyState,
          );
        });
      });
    });
  });
});
