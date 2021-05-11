import WebSocket from 'ws';

import { AppWsRequestContext } from '..';
import { Converter, ValueOrErrors } from '../../../../common/domain';
import { WsRequestContext } from '../../../../integration-modules/ws/adapter/WsRequestContext';
import { JwtManager } from '../../../jwt/domain';
import { User } from '../../../user/domain';

export class WebSocketDataToAppWsRequestcontextConverter
  implements
    Converter<
      WebSocket.Data,
      Promise<ValueOrErrors<AppWsRequestContext>>,
      WsRequestContext
    >
{
  constructor(private readonly jwtManager: JwtManager<User>) {}

  public async transform(
    webSocketData: WebSocket.Data,
    context: WsRequestContext,
  ): Promise<ValueOrErrors<AppWsRequestContext>> {
    const stringifiedMessageData: string = webSocketData.toString();

    try {
      const user: User = await this.jwtManager.parse(stringifiedMessageData);

      const appWsRequestContextOrErrors: ValueOrErrors<AppWsRequestContext> = {
        isEither: false,
        value: {
          playerGateway: {
            send: async (data: unknown) => {
              return new Promise<void>(
                (resolve: () => void, reject: (cause: unknown) => void) => {
                  context.socket.send(data, (err: Error | undefined) => {
                    if (err === undefined) {
                      resolve();
                    } else {
                      reject(err);
                    }
                  });
                },
              );
            },
          },
          user: user,
        },
      };

      return appWsRequestContextOrErrors;
    } catch (err: unknown) {
      const stringifiedErrorMessage: string = JSON.stringify(
        err,
        Object.getOwnPropertyNames(err),
      );

      return {
        isEither: true,
        value: [
          `Unexpected error when parsing auth token. Underlying error:\n\n ${stringifiedErrorMessage}`,
        ],
      };
    }
  }
}
