import 'reflect-metadata';

import IORedis from 'ioredis';

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
  let redisClientMock: jest.Mocked<IORedis.Redis>;

  let messageFromChannelHandler: jest.Mock<
    Promise<void>,
    [string, string, ContextFixture]
  >;

  let ioredisSubscriber: IoredisSubscriberMock;

  beforeAll(() => {
    redisClientMock = {
      on: jest.fn(),
      subscribe: jest.fn(),
      unsubscribe: jest.fn(),
    } as Partial<jest.Mocked<IORedis.Redis>> as jest.Mocked<IORedis.Redis>;

    messageFromChannelHandler =
      jest.fn<Promise<void>, [string, string, ContextFixture]>();

    ioredisSubscriber = new IoredisSubscriberMock(
      redisClientMock,
      messageFromChannelHandler,
    );
  });

  afterAll(() => {
    redisClientMock.on.mockClear();
  });

  it('must call IORedis client .on()', () => {
    expect(redisClientMock.on).toHaveBeenCalledTimes(1);
    expect(redisClientMock.on).toHaveBeenCalledWith(
      'message',
      expect.any(Function),
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

      afterAll(() => {
        redisClientMock.subscribe.mockClear();
      });

      it('must call ioredis.subscribe', () => {
        expect(redisClientMock.subscribe).toHaveBeenCalledTimes(1);
        expect(redisClientMock.subscribe).toHaveBeenCalledWith(channel);
      });
    });
  });

  describe('.unsubscribe()', () => {
    let channel: string;

    beforeAll(() => {
      channel = 'sample-channel';
    });

    describe('when called', () => {
      beforeAll(async () => {
        await ioredisSubscriber.unsubscribe(channel);
      });

      afterAll(() => {
        redisClientMock.subscribe.mockClear();
      });

      it('must call ioredis.unsubscribe', () => {
        expect(redisClientMock.unsubscribe).toHaveBeenCalledTimes(1);
        expect(redisClientMock.unsubscribe).toHaveBeenCalledWith(channel);
      });
    });
  });
});
