import http from 'http';

import WebSocket from 'ws';

import { Server } from '../../../layer-modules/server/domain';
import { WsMessageHandler } from './msgHandler/WsMessageHandler';

export class WsServer implements Server {
  private webSocketServer: WebSocket.Server | undefined;

  constructor(
    private readonly wsMessageHandler: WsMessageHandler,
    private readonly port: number,
  ) {}

  public async bootstrap(): Promise<void> {
    return new Promise((resolve: () => void) => {
      this.webSocketServer = new WebSocket.Server({
        port: this.port,
      });

      this.webSocketServer.on('listening', () => {
        resolve();
      });

      this.webSocketServer.on(
        'connection',
        this.webSocketServerOnConnectionHandler.bind(this),
      );
    });
  }

  public async close(): Promise<void> {
    return new Promise<void>((resolve: () => void) => {
      if (undefined === this.webSocketServer) {
        throw new Error('There is no web socket server up');
      }

      this.webSocketServer.close(() => {
        resolve();
      });
    });
  }

  private handleError(socket: WebSocket, error: unknown): void {
    const stringifiedErrorMessage: string = JSON.stringify(
      error,
      Object.getOwnPropertyNames(error),
    );

    const errorObject: Record<string, unknown> = {
      message: `Unable to parse message. Underlying error:\n\n ${stringifiedErrorMessage}`,
    };

    const stringifiedErrorObject: string = JSON.stringify(errorObject);

    socket.send(stringifiedErrorObject);
  }

  private webSocketOnMessageHandler(
    socket: WebSocket,
    data: WebSocket.Data,
  ): void {
    try {
      const stringifiedData: string = data.toString();

      const parsedData: unknown = JSON.parse(stringifiedData);

      void this.wsMessageHandler
        .handle(socket, parsedData)
        .catch((err: unknown) => {
          this.handleError(socket, err);
        });
    } catch (err: unknown) {
      this.handleError(socket, err);
    }
  }

  private webSocketServerOnConnectionHandler(
    socket: WebSocket,
    _request: http.IncomingMessage,
  ): void {
    socket.on('message', (data: WebSocket.Data): void => {
      this.webSocketOnMessageHandler(socket, data);
    });
  }
}
