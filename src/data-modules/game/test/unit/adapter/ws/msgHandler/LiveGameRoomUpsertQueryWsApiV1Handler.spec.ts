import 'reflect-metadata';
import WebSocket from 'ws';

import {
  Converter,
  EitherEither,
  Interactor,
  ValueEither,
  ValueOrErrors,
} from '../../../../../../../common/domain';
import {
  AppWsRequestContext,
  QueryWsApi,
} from '../../../../../../app-ws/adapter';
import { userFixtureFactory } from '../../../../../../user/test/fixtures/domain/model/fixtures';
import { LiveGameRoomUpsertQueryWsApiV1Handler } from '../../../../../adapter/ws/msgHandler/LiveGameRoomUpsertQueryWsApiV1Handler';
import { LiveGameRoom } from '../../../../../domain/model/live/room/LiveGameRoom';
import { LiveGameRoomUpsertQuery } from '../../../../../domain/query/live/room/LiveGameRoomUpsertQuery';
import { LiveGameRoomUpsertQueryWsApiV1Fixtures } from '../../../../fixtures/adapter/ws/query/live/room/LiveGameRoomUpsertQueryWsApiV1Fixtures';
import { LiveGameRoomFixtures } from '../../../../fixtures/domain/model/live/room/LiveGameRoomFixtures';
import { LiveGameRoomUpsertQueryFixtures } from '../../../../fixtures/domain/query/live/room/LiveGameRoomUpsertQueryFixtures';

describe(LiveGameRoomUpsertQueryWsApiV1Handler.name, () => {
  let upsertLiveGameRoomInteractor: jest.Mocked<
    Interactor<LiveGameRoomUpsertQuery, Promise<LiveGameRoom>>
  >;

  let queryWsApiToLiveGameRoomUpsertQueryConverter: jest.Mocked<
    Converter<
      QueryWsApi,
      Promise<ValueOrErrors<LiveGameRoomUpsertQuery>>,
      AppWsRequestContext
    >
  >;

  let liveGameRoomUpsertQueryWsApiV1Handler: LiveGameRoomUpsertQueryWsApiV1Handler;

  beforeAll(() => {
    upsertLiveGameRoomInteractor = {
      interact: jest.fn(),
    };

    queryWsApiToLiveGameRoomUpsertQueryConverter = {
      transform: jest.fn(),
    };

    liveGameRoomUpsertQueryWsApiV1Handler = new LiveGameRoomUpsertQueryWsApiV1Handler(
      upsertLiveGameRoomInteractor,
      queryWsApiToLiveGameRoomUpsertQueryConverter,
    );
  });

  describe('.handle()', () => {
    let socketMock: jest.Mocked<WebSocket>;
    let appWsRequestContextFixture: AppWsRequestContext;

    beforeAll(() => {
      socketMock = ({
        send: jest.fn(),
      } as Partial<jest.Mocked<WebSocket>>) as jest.Mocked<WebSocket>;

      appWsRequestContextFixture = {
        playerGateway: {
          send: jest.fn(),
        },
        user: userFixtureFactory.get(),
      };
    });

    describe('when called, and queryWsApiToLiveGameRoomUpsertQueryConverter returns no errors', () => {
      let liveGameRoomUpsertQueryValue: ValueEither<LiveGameRoomUpsertQuery>;

      beforeAll(async () => {
        liveGameRoomUpsertQueryValue = {
          isEither: false,
          value: LiveGameRoomUpsertQueryFixtures.any(),
        };

        queryWsApiToLiveGameRoomUpsertQueryConverter.transform.mockResolvedValueOnce(
          liveGameRoomUpsertQueryValue,
        );

        upsertLiveGameRoomInteractor.interact.mockResolvedValueOnce(
          LiveGameRoomFixtures.any(),
        );

        await liveGameRoomUpsertQueryWsApiV1Handler.handle(
          socketMock,
          LiveGameRoomUpsertQueryWsApiV1Fixtures.any(),
          appWsRequestContextFixture,
        );
      });

      afterAll(() => {
        queryWsApiToLiveGameRoomUpsertQueryConverter.transform.mockClear();
        upsertLiveGameRoomInteractor.interact.mockClear();

        socketMock.send.mockClear();
        (appWsRequestContextFixture.playerGateway
          .send as jest.Mock).mockClear();
      });

      it('should call queryWsApiToLiveGameRoomUpsertQueryConverter.transform()', () => {
        expect(
          queryWsApiToLiveGameRoomUpsertQueryConverter.transform,
        ).toHaveBeenCalledTimes(1);
        expect(
          queryWsApiToLiveGameRoomUpsertQueryConverter.transform,
        ).toHaveBeenCalledWith(
          LiveGameRoomUpsertQueryWsApiV1Fixtures.any(),
          appWsRequestContextFixture,
        );
      });

      it('should call upsertLiveGameRoomInteractor.interact() with the liveGameRoomUpsertQuery converted', () => {
        expect(upsertLiveGameRoomInteractor.interact).toHaveBeenCalledTimes(1);
        expect(upsertLiveGameRoomInteractor.interact).toHaveBeenCalledWith(
          liveGameRoomUpsertQueryValue.value,
        );
      });

      it('should call socket.send', () => {
        expect(socketMock.send).toHaveBeenCalledTimes(1);
        expect(socketMock.send).toHaveBeenCalledWith({
          data: undefined,
          messageId: LiveGameRoomUpsertQueryWsApiV1Fixtures.any().id,
        });
      });
    });

    describe('when called, and queryWsApiToLiveGameRoomUpsertQueryConverter returns any errors', () => {
      let liveGameRoomUpsertQueryErrors: EitherEither<string[]>;

      beforeAll(async () => {
        liveGameRoomUpsertQueryErrors = {
          isEither: true,
          value: ['sample-error-message'],
        };

        queryWsApiToLiveGameRoomUpsertQueryConverter.transform.mockResolvedValueOnce(
          liveGameRoomUpsertQueryErrors,
        );

        await liveGameRoomUpsertQueryWsApiV1Handler.handle(
          socketMock,
          LiveGameRoomUpsertQueryWsApiV1Fixtures.any(),
          appWsRequestContextFixture,
        );
      });

      afterAll(() => {
        queryWsApiToLiveGameRoomUpsertQueryConverter.transform.mockClear();
        upsertLiveGameRoomInteractor.interact.mockClear();

        socketMock.send.mockClear();
        (appWsRequestContextFixture.playerGateway
          .send as jest.Mock).mockClear();
      });

      it('should call queryWsApiToLiveGameRoomUpsertQueryConverter.transform()', () => {
        expect(
          queryWsApiToLiveGameRoomUpsertQueryConverter.transform,
        ).toHaveBeenCalledTimes(1);
      });

      it('should not call upsertLiveGameRoomInteractor.interact()', () => {
        expect(upsertLiveGameRoomInteractor.interact).not.toHaveBeenCalled();
      });

      it('should call socket.send with the errors found', () => {
        expect(socketMock.send).toHaveBeenCalledTimes(1);
        expect(socketMock.send).toHaveBeenCalledWith({
          error: liveGameRoomUpsertQueryErrors.value.join('\n'),
          messageId: LiveGameRoomUpsertQueryWsApiV1Fixtures.any().id,
        });
      });
    });
  });
});
