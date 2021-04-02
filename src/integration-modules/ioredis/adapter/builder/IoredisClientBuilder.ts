import { inject, injectable } from 'inversify';
import IORedis from 'ioredis';

import { Builder } from '../../../../common/domain';
import { EnvLoader } from '../../../../layer-modules/env/domain';
import { redisAdapter } from '../../../../layer-modules/redis/adapter';
import { RedisDotEnvVariables } from '../../../../layer-modules/redis/adapter/env/RedisDotEnvVariables';

@injectable()
export class IoredisClientBuilder implements Builder<IORedis.Redis> {
  constructor(
    @inject(redisAdapter.config.types.env.RedisEnvLoader)
    private readonly redisEnvLoader: EnvLoader<RedisDotEnvVariables>,
  ) {}

  public build(): IORedis.Redis {
    return new IORedis({
      host: this.redisEnvLoader.index.REDIS_CONNECTION_HOST,
      port: this.redisEnvLoader.index.REDIS_CONNECTION_PORT,
      db: this.redisEnvLoader.index.REDIS_CONNECTION_DB,
    });
  }
}
