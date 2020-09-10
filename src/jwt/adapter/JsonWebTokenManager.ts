import { inject, injectable } from 'inversify';
import { EnvLoader } from '../../layer-modules/env/domain';
import { JWT_ADAPTER_TYPES } from './config/types';
import { JwtDotEnvVariables } from './env/JwtDotEnvVariables';
import { JwtManager } from '../domain';
import jwt from 'jsonwebtoken';

@injectable()
export class JsonWebTokenManager<TToken extends Record<string, unknown>>
  implements JwtManager<TToken> {
  private readonly privateKey: string;
  private readonly publicKey: string;

  private readonly signOptions: jwt.SignOptions;
  private readonly verifyOptions: jwt.VerifyOptions;

  constructor(
    @inject(JWT_ADAPTER_TYPES.env.JWT_ENV_LOADER)
    jwtEnvLoader: EnvLoader<JwtDotEnvVariables>,
  ) {
    this.privateKey = jwtEnvLoader.index.JWT_RSA_PRIVATE_KEY;
    this.publicKey = jwtEnvLoader.index.JWT_RSA_PUBLIC_KEY;

    this.signOptions = {
      algorithm: 'RS256',
      audience: jwtEnvLoader.index.JWT_AUDIENCE,
      expiresIn: jwtEnvLoader.index.JWT_EXPIRATION_MS.toString(),
      issuer: jwtEnvLoader.index.JWT_ISSUER,
    };

    this.verifyOptions = {
      algorithms: ['RS256'],
      audience: jwtEnvLoader.index.JWT_AUDIENCE,
      issuer: jwtEnvLoader.index.JWT_ISSUER,
    };
  }

  public create(payload: TToken): string {
    return jwt.sign(payload, this.privateKey, this.signOptions);
  }

  public parse(jwtToken: string): TToken {
    return (jwt.verify(jwtToken, this.publicKey, this.verifyOptions) as Record<
      string,
      unknown
    >) as TToken;
  }
}
