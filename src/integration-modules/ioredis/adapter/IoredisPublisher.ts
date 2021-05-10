import { injectable, unmanaged } from 'inversify';
import IORedis from 'ioredis';

import { RedisPublisher } from '../../../layer-modules/redis/adapter';

@injectable()
export class IoredisPublisher implements RedisPublisher {
  constructor(@unmanaged() private readonly redisClient: IORedis.Redis) {}

  public async publish(
    key: string,
    body: Record<string, unknown>,
  ): Promise<void> {
    await this.redisClient.publish(key, JSON.stringify(body));
  }
}
