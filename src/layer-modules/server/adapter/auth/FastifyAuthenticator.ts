import { FastifyReply, FastifyRequest } from 'fastify';
import { inject, injectable } from 'inversify';
import { JwtManager } from '../../../../jwt/domain';
import { StatusCodes } from 'http-status-codes';
import { jwtDomain } from '../../../../jwt/domain';

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
      return reply.code(StatusCodes.FORBIDDEN).send(NO_AUTH_HEADER_ERR_MESSAGE);
    }

    const authorizationHeader: string = request.headers.authorization;

    if (!authorizationHeader.startsWith(AUTH_HEADER_PREFIX)) {
      await reply
        .code(StatusCodes.BAD_REQUEST)
        .send(NO_BEARER_TOKEN_ERR_MESSAGE);

      return null;
    }

    const jwtToken: string = authorizationHeader.substr(
      AUTH_HEADER_PREFIX.length,
    );

    try {
      return this.jwtManager.parse(jwtToken);
    } catch (err) {
      await reply
        .code(StatusCodes.BAD_REQUEST)
        .send(UNABLE_TO_PARSE_JWT_TOKEN_ERR_MESSAGE);

      return null;
    }
  }
}
