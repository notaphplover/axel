import 'reflect-metadata';

import { Container } from 'inversify';
import IORedis from 'ioredis';

import { configAdapter } from '../../../../../layer-modules/config/adapter';
import { IOREDIS_ADAPTER_TYPES } from '../../../adapter/config/types';
import { IoredisClientSingleton } from '../../../adapter/IoredisClientSingleton';
import { IoredisSubscriber } from '../../../adapter/IoredisSubscriber';

interface ContextFixture {
  foo: string;
}

class IoredisSubscriberMock extends IoredisSubscriber<ContextFixture> {
  constructor(
    redisClient: IORedis.Redis,
    private readonly messageFromChannelHandler: jest.Mock<
      Promise<void>,
      [string, string, ContextFixture]
    >,
  ) {
    super(redisClient);
  }

  protected async handleMessageFromChannel(
    channel: string,
    message: string,
    context: ContextFixture,
  ): Promise<void> {
    await this.messageFromChannelHandler(channel, message, context);
  }
}

describe(IoredisSubscriber.name, () => {
  let ioredisClient: IORedis.Redis;
  let ioredisSubscriberClient: IORedis.Redis;
  let messageFromChannelHandler: jest.Mock<
    Promise<void>,
    [string, string, ContextFixture]
  >;

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

    messageFromChannelHandler = jest.fn<
      Promise<void>,
      [string, string, ContextFixture]
    >();

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
      let contextFixture: ContextFixture;

      beforeAll(async () => {
        contextFixture = { foo: 'bar' };

        await ioredisSubscriber.subscribe(channel, contextFixture);
      });

      describe('when a message is published to the channel', () => {
        let message: string;

        beforeAll(async () => {
          message = 'sample-message';

          await new Promise<void>((resolve: () => void) => {
            messageFromChannelHandler.mockImplementationOnce(async () => {
              resolve();
            });

            void ioredisClient.publish(channel, message);
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
            contextFixture,
          );
        });
      });
    });
  });
});
