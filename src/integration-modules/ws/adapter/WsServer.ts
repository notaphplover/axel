import http from 'http';

import WebSocket from 'ws';

import { Converter, ValueOrErrors } from '../../../common/domain';
import { Server } from '../../../layer-modules/server/domain';
import { WsMessageHandler } from './msgHandler/WsMessageHandler';
import { WsRequestContext } from './WsRequestContext';

export class WsServer<TRequestContext> implements Server {
  private webSocketServer: WebSocket.Server | undefined;

  constructor(
    private readonly port: number,
    private readonly webSocketDataToRequestContextTransformer: Converter<
      WebSocket.Data,
      Promise<ValueOrErrors<TRequestContext>>,
      WsRequestContext
    >,
    private readonly wsMessageHandler: WsMessageHandler<
      unknown,
      TRequestContext
    >,
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
        (socket: WebSocket, _request: http.IncomingMessage): void => {
          void this.webSocketServerOnConnectionHandler(socket);
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
    requestContext: TRequestContext,
  ): Promise<void> {
    try {
      const stringifiedData: string = data.toString();

      const parsedData: unknown = JSON.parse(stringifiedData);

      await this.wsMessageHandler.handle(socket, parsedData, requestContext);
    } catch (err: unknown) {
      this.handleError(socket, err);
    }
  }

  private async webSocketServerOnConnectionHandler(
    socket: WebSocket,
  ): Promise<void> {
    const messagesQueue: WebSocket.Data[] = [];

    const preValidationWebSocketOnMessageHandler: (
      data: WebSocket.Data,
    ) => void = (data: WebSocket.Data): void => {
      messagesQueue.push(data);
    };

    const validationResult: ValueOrErrors<TRequestContext> = await new Promise<
      ValueOrErrors<TRequestContext>
    >(
      (
        resolve: (
          requestContextOrErrors: ValueOrErrors<TRequestContext>,
        ) => void,
      ) => {
        const firstWebSocketMessageHandler: (data: WebSocket.Data) => void = (
          data: WebSocket.Data,
        ): void => {
          socket.on('message', preValidationWebSocketOnMessageHandler);

          void this.webSocketDataToRequestContextTransformer
            .transform(data, {
              socket,
            })
            .then(resolve);
        };

        socket.once('message', firstWebSocketMessageHandler);
      },
    );

    if (validationResult.isEither) {
      const policyViolationCode: number = 1008;

      this.closeSocket(
        socket,
        policyViolationCode,
        'Invalid connection: ' + validationResult.value.join('\n'),
      );
    } else {
      const requestContext: TRequestContext = validationResult.value;

      socket.off('message', preValidationWebSocketOnMessageHandler);

      for (const message of messagesQueue) {
        void this.webSocketOnMessageHandler(socket, message, requestContext);
      }

      socket.on('message', (data: WebSocket.Data): void => {
        void this.webSocketOnMessageHandler(socket, data, requestContext);
      });
    }
  }
}
