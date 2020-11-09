import { JwtDotEnvVariables, jwtAdapter } from '../../../jwt/adapter';
import { inject, injectable } from 'inversify';
import jwt, { VerifyErrors } from 'jsonwebtoken';
import { EnvLoader } from '../../../layer-modules/env/domain';
import { JwtManager } from '../../../jwt/domain';

@injectable()
export class JsonWebTokenManager<TToken extends Record<string, unknown>>
  implements JwtManager<TToken> {
  private readonly privateKey: string;
  private readonly publicKey: string;

  private readonly signOptions: jwt.SignOptions;
  private readonly verifyOptions: jwt.VerifyOptions;

  constructor(
    @inject(jwtAdapter.config.types.env.JWT_ENV_LOADER)
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

  public async create(payload: TToken): Promise<string> {
    return this.promisifyJwtSign(payload);
  }

  public async parse(jwtToken: string): Promise<TToken> {
    return this.promisifyJwtVerify(jwtToken);
  }

  private async promisifyJwtSign(payload: TToken): Promise<string> {
    return new Promise(
      (
        resolve: (value: string) => void,
        reject: (reason?: unknown) => void,
      ) => {
        jwt.sign(
          payload,
          this.privateKey,
          this.signOptions,
          (err: Error | null, encoded: string | undefined) => {
            if (err === null) {
              resolve(encoded as string);
            } else {
              reject(err);
            }
          },
        );
      },
    );
  }

  private async promisifyJwtVerify(jwtToken: string): Promise<TToken> {
    return new Promise(
      (
        resolve: (value: TToken) => void,
        reject: (reason?: unknown) => void,
      ) => {
        jwt.verify(
          jwtToken,
          this.publicKey,
          this.verifyOptions,
          // eslint-disable-next-line @typescript-eslint/ban-types
          (err: VerifyErrors | null, decoded: object | undefined) => {
            if (err === null) {
              resolve(decoded as TToken);
            } else {
              reject(err);
            }
          },
        );
      },
    );
  }
}
