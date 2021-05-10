import 'reflect-metadata';

import IORedis from 'ioredis';

import { IoredisPublisher } from '../../../adapter/IoredisPublisher';

describe(IoredisPublisher.name, () => {
  let redisClientMock: jest.Mocked<IORedis.Redis>;

  let ioredisPublisher: IoredisPublisher;

  beforeAll(() => {
    redisClientMock = ({
      publish: jest.fn(),
    } as Partial<jest.Mocked<IORedis.Redis>>) as jest.Mocked<IORedis.Redis>;

    ioredisPublisher = new IoredisPublisher(redisClientMock);
  });

  describe('.publish', () => {
    describe('when called', () => {
      let keyFixture: string;
      let stringifiedMessageFixture: string;

      beforeAll(async () => {
        keyFixture = 'sample-key';
        const messageFixture: Record<string, unknown> = { foo: 'bar' };
        stringifiedMessageFixture = JSON.stringify(messageFixture);

        await ioredisPublisher.publish(keyFixture, messageFixture);
      });

      afterAll(() => {
        redisClientMock.publish.mockClear();
      });

      it('must call redisClient.publish', () => {
        expect(redisClientMock.publish).toHaveBeenCalledTimes(1);
        expect(redisClientMock.publish).toHaveBeenCalledWith(
          keyFixture,
          stringifiedMessageFixture,
        );
      });
    });
  });
});
