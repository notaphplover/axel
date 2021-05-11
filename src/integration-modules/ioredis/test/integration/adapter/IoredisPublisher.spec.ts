import 'reflect-metadata';

import { Container } from 'inversify';
import IORedis from 'ioredis';

import { configAdapter } from '../../../../../layer-modules/config/adapter';
import { IOREDIS_ADAPTER_TYPES } from '../../../adapter/config/types';
import { IoredisClientSingleton } from '../../../adapter/IoredisClientSingleton';
import { IoredisPublisher } from '../../../adapter/IoredisPublisher';

describe(IoredisPublisher.name, () => {
  let container: Container;

  let ioredisClient: IORedis.Redis;

  let ioredisPublisher: IoredisPublisher;

  beforeAll(() => {
    container = configAdapter.container;

    const ioredisClientSingleton: IoredisClientSingleton = container.get(
      IOREDIS_ADAPTER_TYPES.IoredisClientSingleton,
    );

    ioredisClient = ioredisClientSingleton.get();

    ioredisPublisher = new IoredisPublisher(ioredisClientSingleton);
  });

  describe('.publish', () => {
    let channel: string;
    let messageFixture: Record<string, unknown>;
    let stringifiedMessageFixture: string;

    let ioredisSubscriberClientMessageHandler: jest.Mock<
      void,
      [string, string]
    >;
    let ioredisSubscriberClient: IORedis.Redis;

    beforeAll(async () => {
      channel = 'ioredis-publisher-publish-integration-tests-sample-channel';

      messageFixture = { foo: 'bar' };
      stringifiedMessageFixture = JSON.stringify(messageFixture);

      ioredisSubscriberClientMessageHandler = jest.fn<void, [string, string]>();

      const ioredisSubscriberClientSingleton: IoredisClientSingleton =
        container.get(IOREDIS_ADAPTER_TYPES.IoredisSubscriberClientSingleton);

      ioredisSubscriberClient = ioredisSubscriberClientSingleton.get();

      ioredisSubscriberClient.on(
        'message',
        ioredisSubscriberClientMessageHandler,
      );

      await ioredisSubscriberClient.subscribe(channel);
    });

    afterAll(() => {
      ioredisSubscriberClient.disconnect();
    });

    describe('when called', () => {
      beforeAll(async () => {
        return new Promise<void>((resolve: () => void) => {
          ioredisSubscriberClientMessageHandler.mockImplementationOnce(() => {
            resolve();
          });

          void ioredisPublisher.publish(channel, messageFixture);
        });
      });

      it('should call ioredisSubscriberClientMessageHandler with the channel and the stringified channel', () => {
        expect(ioredisSubscriberClientMessageHandler).toHaveBeenCalledTimes(1);
        expect(ioredisSubscriberClientMessageHandler).toHaveBeenCalledWith(
          channel,
          stringifiedMessageFixture,
        );
      });

      afterAll(() => {
        ioredisClient.disconnect();
        ioredisSubscriberClientMessageHandler.mockClear();
      });
    });
  });
});
