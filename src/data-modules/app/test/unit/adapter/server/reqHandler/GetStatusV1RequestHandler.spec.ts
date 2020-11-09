/* eslint-disable @typescript-eslint/unbound-method */
import 'reflect-metadata';
import { FastifyReply, FastifyRequest } from 'fastify';
import { GetStatusV1RequestHandler } from '../../../../../adapter/server/reqHandler/GetStatusV1RequestHandler';
import { commonTest } from '../../../../../../../common/test';

describe(GetStatusV1RequestHandler.name, () => {
  let getStatusV1RequestHandler: GetStatusV1RequestHandler;

  beforeAll(() => {
    getStatusV1RequestHandler = new GetStatusV1RequestHandler();
  });

  describe('.handle', () => {
    describe('when called', () => {
      let requestFixture: FastifyRequest;
      let replyFixture: FastifyReply;

      beforeAll(async () => {
        requestFixture = ({} as Partial<FastifyRequest>) as FastifyRequest;
        replyFixture = commonTest.fixtures.adapter.server.fastifyReplyFixtureFactory.get();

        await getStatusV1RequestHandler.handle(requestFixture, replyFixture);
      });

      it('must call reply.send()', () => {
        expect(replyFixture.send).toHaveBeenCalledTimes(1);
        expect(replyFixture.send).toHaveBeenCalledWith({
          status: 'OK',
        });
      });
    });
  });
});
