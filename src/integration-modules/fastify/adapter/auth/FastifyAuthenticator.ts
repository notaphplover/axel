import { FastifyReply, FastifyRequest } from 'fastify';
import { inject, injectable } from 'inversify';
import { JwtManager } from '../../../../data-modules/jwt/domain';
import { StatusCodes } from 'http-status-codes';
import { jwtDomain } from '../../../../data-modules/jwt/domain';

const AUTH_HEADER_PREFIX: string = 'Bearer ';
const NO_AUTH_HEADER_ERR_MESSAGE: string = 'Expected an authorization header';
const NO_BEARER_TOKEN_ERR_MESSAGE: string =
  'Expected a bearer token as authorization header';
const UNABLE_TO_PARSE_JWT_TOKEN_ERR_MESSAGE: string =
  'Unable to parse jwt token';

@injectable()
export class FastifyAuthenticator<TToken> {
  constructor(
    @inject(jwtDomain.types.JWT_MANAGER)
    private readonly jwtManager: JwtManager<TToken>,
  ) {}

  public async authenticate(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<TToken | null> {
    if (request.headers.authorization === undefined) {
      await reply.code(StatusCodes.FORBIDDEN).send(NO_AUTH_HEADER_ERR_MESSAGE);

      return null;
    }

    const authorizationHeader: string = request.headers.authorization;

    if (!authorizationHeader.startsWith(AUTH_HEADER_PREFIX)) {
      await reply
        .code(StatusCodes.BAD_REQUEST)
        .send({ message: NO_BEARER_TOKEN_ERR_MESSAGE });

      return null;
    }

    const jwtToken: string = authorizationHeader.substr(
      AUTH_HEADER_PREFIX.length,
    );

    try {
      const parsedObject: TToken = await this.jwtManager.parse(jwtToken);
      return parsedObject;
    } catch (err) {
      await reply
        .code(StatusCodes.BAD_REQUEST)
        .send({ message: UNABLE_TO_PARSE_JWT_TOKEN_ERR_MESSAGE });

      return null;
    }
  }
}
