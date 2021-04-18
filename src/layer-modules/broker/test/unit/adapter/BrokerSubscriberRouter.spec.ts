import { BrokerSubscriberHandler } from '../../../adapter';
import { BrokerSubscriberRouter } from '../../../adapter/BrokerSubscriberRouter';
import { QueryBrokerApi } from '../../../adapter/query/QueryBrokerApi';

describe(BrokerSubscriberRouter.name, () => {
  let scopeFixture: string;
  let brokerSubscriberHandler: jest.Mocked<BrokerSubscriberHandler>;
  let brokerSubscriberRouter: BrokerSubscriberRouter;

  beforeAll(() => {
    scopeFixture = 'scope-fixture';

    brokerSubscriberHandler = {
      scopes: [scopeFixture],
      handle: jest.fn(),
    };

    brokerSubscriberRouter = new BrokerSubscriberRouter([
      brokerSubscriberHandler,
    ]);
  });

  describe('.handle()', () => {
    describe('having a query within the scopes handled by the router', () => {
      let queryBrokerApi: QueryBrokerApi;

      beforeAll(() => {
        queryBrokerApi = {
          type: scopeFixture,
        };
      });

      describe('when called', () => {
        beforeAll(async () => {
          await brokerSubscriberRouter.handle(queryBrokerApi);
        });

        afterAll(() => {
          brokerSubscriberHandler.handle.mockClear();
        });

        it('must not call brokerSubscriberHandler.handle()', () => {
          expect(brokerSubscriberHandler.handle).toHaveBeenCalledTimes(1);
          expect(brokerSubscriberHandler.handle).toHaveBeenCalledWith(
            queryBrokerApi,
          );
        });
      });
    });

    describe('having a query out of the scopes handled by the router', () => {
      let queryBrokerApi: QueryBrokerApi;

      beforeAll(() => {
        queryBrokerApi = {
          type: 'unhandled-scope',
        };
      });

      describe('when called', () => {
        beforeAll(async () => {
          await brokerSubscriberRouter.handle(queryBrokerApi);
        });

        afterAll(() => {
          brokerSubscriberHandler.handle.mockClear();
        });

        it('must not call brokerSubscriberHandler.handle()', () => {
          expect(brokerSubscriberHandler.handle).not.toHaveBeenCalled();
        });
      });
    });
  });
});
