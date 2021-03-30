import 'reflect-metadata';

import {
  InsertRepository,
  SearchRepository,
  UpdateRepository,
} from '../../../../../../../../layer-modules/db/domain';
import { UpsertLiveGameRoomInteractor } from '../../../../../../domain/interactor/live/room/UpsertLiveGameRoomInteractor';
import { LiveGamePlayerArea } from '../../../../../../domain/model/live/LiveGamePlayerArea';
import { LiveGameRoom } from '../../../../../../domain/model/live/room/LiveGameRoom';
import { AddPlayerToLiveGameRoomQuery } from '../../../../../../domain/query/live/room/AddPlayerToLiveGameRoomQuery';
import { LiveGameRoomCreationQuery } from '../../../../../../domain/query/live/room/LiveGameRoomCreationQuery';
import { LiveGameRoomFindQuery } from '../../../../../../domain/query/live/room/LiveGameRoomFindQuery';
import { LiveGameRoomUpdateQuery } from '../../../../../../domain/query/live/room/LiveGameRoomUpdateQuery';
import { LiveGameRoomUpdateQueryType } from '../../../../../../domain/query/live/room/LiveGameRoomUpdateQueryType';
import { UpsertLiveGameRoomQuery } from '../../../../../../domain/query/live/room/UpsertLiveGameRoomQuery';
import { liveGameFixtureFactory } from '../../../../../fixtures/domain/model/live';
import { LiveGameRoomFixtures } from '../../../../../fixtures/domain/model/live/room/LiveGameRoomFixtures';

type LiveGameRoomRepository = InsertRepository<
  LiveGameRoom,
  LiveGameRoomCreationQuery
> &
  SearchRepository<LiveGameRoom, LiveGameRoomFindQuery> &
  UpdateRepository<LiveGameRoom, LiveGameRoomUpdateQuery>;

describe(UpsertLiveGameRoomInteractor.name, () => {
  describe('.interact', () => {
    let liveGameRoomRepository: jest.Mocked<LiveGameRoomRepository>;

    let upsertLiveGameRoomInteractor: UpsertLiveGameRoomInteractor;

    beforeAll(() => {
      liveGameRoomRepository = ({
        findOne: jest.fn(),
        insert: jest.fn(),
        updateOneAndSelect: jest.fn(),
      } as Partial<
        jest.Mocked<LiveGameRoomRepository>
      >) as jest.Mocked<LiveGameRoomRepository>;

      upsertLiveGameRoomInteractor = new UpsertLiveGameRoomInteractor(
        liveGameRoomRepository,
      );
    });

    describe('when no live game room with the liveGameId provided exists', () => {
      let upsertLiveGameRoomQueryFixture: UpsertLiveGameRoomQuery;

      let liveGameRoomUpdated: LiveGameRoom;

      beforeAll(() => {
        upsertLiveGameRoomQueryFixture = {
          liveGame: liveGameFixtureFactory.get(),
          playerGateway: { send: jest.fn() },
          playerId: (liveGameFixtureFactory.get()
            .playerAreas as LiveGamePlayerArea[] & [LiveGamePlayerArea])[0]
            .player.userId,
        };

        liveGameRoomRepository.findOne.mockResolvedValueOnce(null);
        liveGameRoomRepository.insert.mockResolvedValueOnce([
          LiveGameRoomFixtures.withEmptyPlayerIdToPlayerGategayMap(
            upsertLiveGameRoomQueryFixture.liveGame.id,
          ),
        ]);

        liveGameRoomUpdated = LiveGameRoomFixtures.withEmptyPlayerIdToPlayerGategayMap(
          upsertLiveGameRoomQueryFixture.liveGame.id,
        );

        liveGameRoomUpdated.playerIdToPlayerGatewayMap.set(
          upsertLiveGameRoomQueryFixture.playerId,
          upsertLiveGameRoomQueryFixture.playerGateway,
        );

        liveGameRoomRepository.updateOneAndSelect.mockResolvedValueOnce(
          liveGameRoomUpdated,
        );
      });

      describe('when called', () => {
        let result: unknown;

        beforeAll(async () => {
          result = await upsertLiveGameRoomInteractor.interact(
            upsertLiveGameRoomQueryFixture,
          );
        });

        afterAll(() => {
          liveGameRoomRepository.findOne.mockClear();
          liveGameRoomRepository.insert.mockClear();
          liveGameRoomRepository.updateOneAndSelect.mockClear();
        });

        it('must call liveGameRoomRepository.findOne()', () => {
          const expected: LiveGameRoomFindQuery = {
            liveGameId: upsertLiveGameRoomQueryFixture.liveGame.id,
          };

          expect(liveGameRoomRepository.findOne).toHaveBeenCalledTimes(1);
          expect(liveGameRoomRepository.findOne).toHaveBeenCalledWith(expected);
        });

        it('must call liveGameRoomRepository.insert()', () => {
          const expected: LiveGameRoomCreationQuery = {
            liveGameId: upsertLiveGameRoomQueryFixture.liveGame.id,
          };

          expect(liveGameRoomRepository.insert).toHaveBeenCalledTimes(1);
          expect(liveGameRoomRepository.insert).toHaveBeenCalledWith(expected);
        });

        it('must call liveGameRoomRepository.updateOneAndSelect()', () => {
          const expected: AddPlayerToLiveGameRoomQuery = {
            liveGameId: upsertLiveGameRoomQueryFixture.liveGame.id,
            playerGategay: upsertLiveGameRoomQueryFixture.playerGateway,
            playerId: upsertLiveGameRoomQueryFixture.playerId,
            type: LiveGameRoomUpdateQueryType.AddPlayerToLiveGameRoom,
          };

          expect(
            liveGameRoomRepository.updateOneAndSelect,
          ).toHaveBeenCalledTimes(1);
          expect(
            liveGameRoomRepository.updateOneAndSelect,
          ).toHaveBeenCalledWith(expected);
        });

        it('must return a LiveGameRoom created', () => {
          expect(result).toStrictEqual(liveGameRoomUpdated);
        });
      });
    });

    describe('when a live game room with the liveGameId provided exists', () => {
      let upsertLiveGameRoomQueryFixture: UpsertLiveGameRoomQuery;

      let liveGameRoomUpdated: LiveGameRoom;

      beforeAll(() => {
        upsertLiveGameRoomQueryFixture = {
          liveGame: liveGameFixtureFactory.get(),
          playerGateway: { send: jest.fn() },
          playerId: (liveGameFixtureFactory.get()
            .playerAreas as LiveGamePlayerArea[] & [LiveGamePlayerArea])[0]
            .player.userId,
        };

        liveGameRoomRepository.findOne.mockResolvedValueOnce(
          LiveGameRoomFixtures.withEmptyPlayerIdToPlayerGategayMap(
            upsertLiveGameRoomQueryFixture.liveGame.id,
          ),
        );

        liveGameRoomUpdated = LiveGameRoomFixtures.withEmptyPlayerIdToPlayerGategayMap(
          upsertLiveGameRoomQueryFixture.liveGame.id,
        );

        liveGameRoomUpdated.playerIdToPlayerGatewayMap.set(
          upsertLiveGameRoomQueryFixture.playerId,
          upsertLiveGameRoomQueryFixture.playerGateway,
        );

        liveGameRoomRepository.updateOneAndSelect.mockResolvedValueOnce(
          liveGameRoomUpdated,
        );
      });

      describe('when called', () => {
        let result: unknown;

        beforeAll(async () => {
          result = await upsertLiveGameRoomInteractor.interact(
            upsertLiveGameRoomQueryFixture,
          );
        });

        afterAll(() => {
          liveGameRoomRepository.findOne.mockClear();
          liveGameRoomRepository.insert.mockClear();
          liveGameRoomRepository.updateOneAndSelect.mockClear();
        });

        it('must call liveGameRoomRepository.findOne()', () => {
          const expected: LiveGameRoomFindQuery = {
            liveGameId: upsertLiveGameRoomQueryFixture.liveGame.id,
          };

          expect(liveGameRoomRepository.findOne).toHaveBeenCalledTimes(1);
          expect(liveGameRoomRepository.findOne).toHaveBeenCalledWith(expected);
        });

        it('must not call liveGameRoomRepository.insert()', () => {
          expect(liveGameRoomRepository.insert).not.toHaveBeenCalled();
        });

        it('must call liveGameRoomRepository.updateOneAndSelect()', () => {
          const expected: AddPlayerToLiveGameRoomQuery = {
            liveGameId: upsertLiveGameRoomQueryFixture.liveGame.id,
            playerGategay: upsertLiveGameRoomQueryFixture.playerGateway,
            playerId: upsertLiveGameRoomQueryFixture.playerId,
            type: LiveGameRoomUpdateQueryType.AddPlayerToLiveGameRoom,
          };

          expect(
            liveGameRoomRepository.updateOneAndSelect,
          ).toHaveBeenCalledTimes(1);
          expect(
            liveGameRoomRepository.updateOneAndSelect,
          ).toHaveBeenCalledWith(expected);
        });

        it('must return a LiveGameRoom created', () => {
          expect(result).toStrictEqual(liveGameRoomUpdated);
        });
      });
    });
  });
});
