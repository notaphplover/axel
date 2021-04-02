import { inject, injectable } from 'inversify';
import IORedis from 'ioredis';

import { Builder } from '../../../common/domain';
import { IOREDIS_ADAPTER_TYPES } from './config/types';

@injectable()
export class IoredisClientSingleton {
  private ioredisClient: IORedis.Redis | undefined;

  constructor(
    @inject(IOREDIS_ADAPTER_TYPES.builder.IoredisClientBuilder)
    private readonly ioredisClientBuilder: Builder<IORedis.Redis>,
  ) {}

  public get(): IORedis.Redis {
    if (this.ioredisClient === undefined) {
      this.ioredisClient = this.ioredisClientBuilder.build();
    }

    return this.ioredisClient;
  }
}
