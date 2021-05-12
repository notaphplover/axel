import { inject, injectable } from 'inversify';
import IORedis from 'ioredis';

import { RedisPublisher } from '../../../layer-modules/redis/domain';
import { IOREDIS_ADAPTER_TYPES } from './config/types';
import { IoredisClientSingleton } from './IoredisClientSingleton';

@injectable()
export class IoredisPublisher implements RedisPublisher {
  private readonly redisClient: IORedis.Redis;

  constructor(
    @inject(IOREDIS_ADAPTER_TYPES.IoredisClientSingleton)
    redisClientSingleton: IoredisClientSingleton,
  ) {
    this.redisClient = redisClientSingleton.get();
  }

  public async publish(
    key: string,
    body: Record<string, unknown>,
  ): Promise<void> {
    await this.redisClient.publish(key, JSON.stringify(body));
  }
}
