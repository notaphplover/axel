import { injectable, unmanaged } from 'inversify';
import IORedis from 'ioredis';

import { RedisSubscriber } from '../../../layer-modules/redis/adapter';

@injectable()
export abstract class IoredisSubscriber implements RedisSubscriber {
  constructor(@unmanaged() private readonly redisClient: IORedis.Redis) {
    this.redisClient.on(
      'message',
      (channel: string, message: string): void =>
        void this.handleMessageFromChannel(channel, message),
    );
  }

  public async subscribe(channel: string): Promise<void> {
    await this.redisClient.subscribe(channel);
  }

  public async unsubscribe(channel: string): Promise<void> {
    await this.redisClient.unsubscribe(channel);
  }

  protected abstract handleMessageFromChannel(
    channel: string,
    message: string,
  ): Promise<void>;
}
