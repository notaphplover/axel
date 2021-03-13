import WebSocket from 'ws';

import { WsMessageHandler } from '../../../adapter/WsMessageHandler';
import { WsServer } from '../../../adapter/WsServer';

describe(WsServer.name, () => {
  let wsMessageHandler: jest.Mocked<WsMessageHandler>;

  beforeAll(() => {
    wsMessageHandler = {
      handle: jest.fn().mockResolvedValue(undefined),
    };
  });

  describe('.bootstrap()', () => {
    describe('when called', () => {
      let wsServer: WsServer;
      let webSocket: WebSocket;
      let webSocketOnOpenHandlerMock: jest.Mock;
      let webSocketOnUpgradeHandlerMock: jest.Mock;

      beforeAll(async () => {
        const port: number = 25613;

        wsServer = new WsServer(wsMessageHandler, port);

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
  });
});
