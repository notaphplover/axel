import 'reflect-metadata';

import { Container } from 'inversify';
import IORedis from 'ioredis';

import { configAdapter } from '../../../../../layer-modules/config/adapter';
import { IOREDIS_ADAPTER_TYPES } from '../../../adapter/config/types';
import { IoredisClientSingleton } from '../../../adapter/IoredisClientSingleton';
import { IoredisSubscriber } from '../../../adapter/IoredisSubscriber';

class IoredisSubscriberMock extends IoredisSubscriber {
  constructor(
    redisClient: IORedis.Redis,
    private readonly messageFromChannelHandler: jest.Mock<
      Promise<void>,
      [string, string]
    >,
  ) {
    super(redisClient);
  }

  protected async handleMessageFromChannel(
    channel: string,
    message: string,
  ): Promise<void> {
    await this.messageFromChannelHandler(channel, message);
  }
}

describe(IoredisSubscriber.name, () => {
  let ioredisClient: IORedis.Redis;
  let ioredisSubscriberClient: IORedis.Redis;
  let messageFromChannelHandler: jest.Mock<Promise<void>, [string, string]>;

  let ioredisSubscriber: IoredisSubscriberMock;

  beforeAll(() => {
    const container: Container = configAdapter.container;

    const ioredisClientSingleton: IoredisClientSingleton = container.get(
      IOREDIS_ADAPTER_TYPES.IoredisClientSingleton,
    );

    const ioredisSubscriberClientSingleton: IoredisClientSingleton = container.get(
      IOREDIS_ADAPTER_TYPES.IoredisSubscriberClientSingleton,
    );

    ioredisClient = ioredisClientSingleton.get();

    ioredisSubscriberClient = ioredisSubscriberClientSingleton.get();

    messageFromChannelHandler = jest.fn<Promise<void>, [string, string]>();

    ioredisSubscriber = new IoredisSubscriberMock(
      ioredisSubscriberClient,
      messageFromChannelHandler,
    );
  });

  describe('.subscribe()', () => {
    let channel: string;

    beforeAll(() => {
      channel = 'sample-channel';
    });

    describe('when called', () => {
      beforeAll(async () => {
        await ioredisSubscriber.subscribe(channel);
      });

      describe('when a message is published to the channel', () => {
        let message: string;

        beforeAll(async () => {
          message = 'sample-message';

          await ioredisClient.publish(channel, message);

          await new Promise<void>((resolve: () => void) => {
            messageFromChannelHandler.mockImplementationOnce(async () => {
              resolve();
            });
          });
        });

        afterAll(() => {
          ioredisClient.disconnect();
          ioredisSubscriberClient.disconnect();
        });

        it('must call messageFromChannelHandler', () => {
          expect(messageFromChannelHandler).toHaveBeenCalledTimes(1);
          expect(messageFromChannelHandler).toHaveBeenCalledWith(
            channel,
            message,
          );
        });
      });
    });
  });
});
