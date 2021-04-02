import 'reflect-metadata';

import IORedis from 'ioredis';

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
  let redisClientMock: jest.Mocked<IORedis.Redis>;

  let messageFromChannelHandler: jest.Mock<Promise<void>, [string, string]>;

  let ioredisSubscriber: IoredisSubscriberMock;

  beforeAll(() => {
    redisClientMock = ({
      on: jest.fn(),
      subscribe: jest.fn(),
      unsubscribe: jest.fn(),
    } as Partial<jest.Mocked<IORedis.Redis>>) as jest.Mocked<IORedis.Redis>;

    messageFromChannelHandler = jest.fn<Promise<void>, [string, string]>();

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
      beforeAll(async () => {
        await ioredisSubscriber.subscribe(channel);
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
