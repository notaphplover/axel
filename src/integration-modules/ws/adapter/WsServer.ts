import http from 'http';

import WebSocket from 'ws';

import { AsyncValidator, ValidationResult } from '../../../common/domain';
import { Server } from '../../../layer-modules/server/domain';
import { WsMessageHandler } from './msgHandler/WsMessageHandler';

export class WsServer implements Server {
  private webSocketServer: WebSocket.Server | undefined;

  constructor(
    private readonly port: number,
    private readonly webSocketConnectionRequestValidator: AsyncValidator<
      http.IncomingMessage,
      http.IncomingMessage
    >,
    private readonly wsMessageHandler: WsMessageHandler,
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
        (socket: WebSocket, request: http.IncomingMessage): void => {
          void this.webSocketServerOnConnectionHandler(socket, request);
        },
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

  private closeSocket(socket: WebSocket, code: number, reason: string): void {
    socket.close(code, reason);

    const socketTerminateTimeoutMillis: number = 1000;

    setTimeout(() => {
      socket.terminate();
    }, socketTerminateTimeoutMillis);
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

  private async webSocketOnMessageHandler(
    socket: WebSocket,
    data: WebSocket.Data,
  ): Promise<void> {
    try {
      const stringifiedData: string = data.toString();

      const parsedData: unknown = JSON.parse(stringifiedData);

      await this.wsMessageHandler.handle(socket, parsedData);
    } catch (err: unknown) {
      this.handleError(socket, err);
    }
  }

  private async webSocketServerOnConnectionHandler(
    socket: WebSocket,
    request: http.IncomingMessage,
  ): Promise<void> {
    const messagesQueue: WebSocket.Data[] = [];

    const preValidationWebSocketOnMessageHandler: (
      data: WebSocket.Data,
    ) => void = (data: WebSocket.Data): void => {
      messagesQueue.push(data);
    };

    socket.on('message', preValidationWebSocketOnMessageHandler);

    const validationResult: ValidationResult<http.IncomingMessage> = await this.webSocketConnectionRequestValidator.validate(
      request,
    );

    if (validationResult.result) {
      socket.off('message', preValidationWebSocketOnMessageHandler);

      for (const message of messagesQueue) {
        void this.webSocketOnMessageHandler(socket, message);
      }

      socket.on('message', (data: WebSocket.Data): void => {
        void this.webSocketOnMessageHandler(socket, data);
      });
    } else {
      const policyViolationCode: number = 1008;

      this.closeSocket(
        socket,
        policyViolationCode,
        'Invalid connection: ' + validationResult.errorMessage,
      );
    }
  }
}
