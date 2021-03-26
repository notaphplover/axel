import 'reflect-metadata';

import { Messenger } from '../../../../../../../../common/domain';
import { UpdateRepository } from '../../../../../../../../layer-modules/db/domain';
import { LiveGameRoom } from '../../../../../../domain/model/live/room/LiveGameRoom';
import { AddPlayerToLiveGameRoomQuery } from '../../../../../../domain/query/live/room/AddPlayerToLiveGameRoomQuery';
import { LiveGameRoomCreationQuery } from '../../../../../../domain/query/live/room/LiveGameRoomCreationQuery';
import { LiveGameRoomFindQuery } from '../../../../../../domain/query/live/room/LiveGameRoomFindQuery';
import { LiveGameRoomUpdateQuery } from '../../../../../../domain/query/live/room/LiveGameRoomUpdateQuery';
import { LiveGameRoomUpdateQueryType } from '../../../../../../domain/query/live/room/LiveGameRoomUpdateQueryType';
import { RemovePlayerFromGameRoomQuery } from '../../../../../../domain/query/live/room/RemovePlayerFromGameRoomQuery';
import { LiveGameRoomInMemoryRepository } from '../../../../../../domain/repository/live/room/LiveGameRoomInMemoryRepository';

describe(LiveGameRoomInMemoryRepository.name, () => {
  describe('.insert()', () => {
    describe('when called, and no room with the same liveGameId exists', () => {
      let liveGameRoomCreationQuery: LiveGameRoomCreationQuery;

      let liveGameRoomInMemoryRepository: LiveGameRoomInMemoryRepository;

      beforeAll(async () => {
        liveGameRoomCreationQuery = {
          liveGameId: 'sample-live-game-id',
        };

        liveGameRoomInMemoryRepository = new LiveGameRoomInMemoryRepository();

        await liveGameRoomInMemoryRepository.insert(liveGameRoomCreationQuery);
      });

      describe('when called .findOne with a LiveGameRoomFindQuery with the same liveGameId', () => {
        let liveGameRoomFindQuery: LiveGameRoomFindQuery;

        let result: unknown;

        beforeAll(async () => {
          liveGameRoomFindQuery = {
            liveGameId: liveGameRoomCreationQuery.liveGameId,
          };

          result = await liveGameRoomInMemoryRepository.findOne(
            liveGameRoomFindQuery,
          );
        });

        it('must return the LiveGameRoom created', () => {
          const expected: LiveGameRoom = {
            liveGameId: liveGameRoomFindQuery.liveGameId,
            playerIdToPlayerGatewayMap: new Map<string, Messenger>(),
          };

          expect(result).toStrictEqual(expected);
        });
      });
    });

    describe('when called, and a room with the same liveGameId exists', () => {
      let result: unknown;

      let liveGameRoomInMemoryRepository: LiveGameRoomInMemoryRepository;

      beforeAll(async () => {
        const liveGameRoomCreationQuery: LiveGameRoomCreationQuery = {
          liveGameId: 'sample-live-game-id',
        };

        liveGameRoomInMemoryRepository = new LiveGameRoomInMemoryRepository();

        await liveGameRoomInMemoryRepository.insert(liveGameRoomCreationQuery);

        try {
          await liveGameRoomInMemoryRepository.insert(
            liveGameRoomCreationQuery,
          );
        } catch (err: unknown) {
          result = err;
        }
      });

      it('must throw an error', () => {
        expect(result).toBeInstanceOf(Error);
      });
    });
  });

  describe('.find()', () => {
    describe('when called, and no liveGameRoom matches the query', () => {
      let liveGameRoomFindQuery: LiveGameRoomFindQuery;
      let liveGameRoomInMemoryRepository: LiveGameRoomInMemoryRepository;

      let result: unknown;

      beforeAll(async () => {
        liveGameRoomFindQuery = {
          liveGameId: 'sample-live-game-id',
        };

        liveGameRoomInMemoryRepository = new LiveGameRoomInMemoryRepository();

        result = await liveGameRoomInMemoryRepository.find(
          liveGameRoomFindQuery,
        );
      });

      it('must return an empty array', () => {
        expect(result).toStrictEqual([]);
      });
    });

    describe('when called, and a liveGameRoom matches the query', () => {
      let liveGameRoomCreationQuery: LiveGameRoomCreationQuery;
      let liveGameRoomFindQuery: LiveGameRoomFindQuery;
      let liveGameRoomInMemoryRepository: LiveGameRoomInMemoryRepository;

      let result: unknown;

      beforeAll(async () => {
        liveGameRoomCreationQuery = {
          liveGameId: 'sample-live-game-id',
        };

        liveGameRoomFindQuery = {
          liveGameId: liveGameRoomCreationQuery.liveGameId,
        };

        liveGameRoomInMemoryRepository = new LiveGameRoomInMemoryRepository();

        await liveGameRoomInMemoryRepository.insert(liveGameRoomCreationQuery);

        result = await liveGameRoomInMemoryRepository.find(
          liveGameRoomFindQuery,
        );
      });

      it('must return an array with the liveGameRoom matched', () => {
        const expected: LiveGameRoom[] = [
          {
            liveGameId: liveGameRoomFindQuery.liveGameId,
            playerIdToPlayerGatewayMap: new Map<string, Messenger>(),
          },
        ];

        expect(result).toStrictEqual(expected);
      });
    });
  });

  describe('.findOne()', () => {
    describe('when called, and no liveGameRoom matches the query', () => {
      let liveGameRoomFindQuery: LiveGameRoomFindQuery;
      let liveGameRoomInMemoryRepository: LiveGameRoomInMemoryRepository;

      let result: unknown;

      beforeAll(async () => {
        liveGameRoomFindQuery = {
          liveGameId: 'sample-live-game-id',
        };

        liveGameRoomInMemoryRepository = new LiveGameRoomInMemoryRepository();

        result = await liveGameRoomInMemoryRepository.findOne(
          liveGameRoomFindQuery,
        );
      });

      it('must return null', () => {
        expect(result).toBeNull();
      });
    });

    describe('when called, and a liveGameRoom matches the query', () => {
      let liveGameRoomCreationQuery: LiveGameRoomCreationQuery;
      let liveGameRoomFindQuery: LiveGameRoomFindQuery;
      let liveGameRoomInMemoryRepository: LiveGameRoomInMemoryRepository;

      let result: unknown;

      beforeAll(async () => {
        liveGameRoomCreationQuery = {
          liveGameId: 'sample-live-game-id',
        };

        liveGameRoomFindQuery = {
          liveGameId: liveGameRoomCreationQuery.liveGameId,
        };

        liveGameRoomInMemoryRepository = new LiveGameRoomInMemoryRepository();

        await liveGameRoomInMemoryRepository.insert(liveGameRoomCreationQuery);

        result = await liveGameRoomInMemoryRepository.findOne(
          liveGameRoomFindQuery,
        );
      });

      it('must return the liveGameRoom matched', () => {
        const expected: LiveGameRoom = {
          liveGameId: liveGameRoomFindQuery.liveGameId,
          playerIdToPlayerGatewayMap: new Map<string, Messenger>(),
        };

        expect(result).toStrictEqual(expected);
      });
    });
  });

  describe.each<
    [
      string,
      (
        updateRepository: UpdateRepository<
          LiveGameRoom,
          LiveGameRoomUpdateQuery
        >,
        liveGameRoomUpdateQuery: LiveGameRoomUpdateQuery,
      ) => Promise<void | null | LiveGameRoom | LiveGameRoom[]>,
      (
        | ((
            result: LiveGameRoom | null,
          ) => null | LiveGameRoom | LiveGameRoom[])
        | undefined
      ),
    ]
  >([
    [
      '.update()',
      async (
        updateRepository: UpdateRepository<
          LiveGameRoom,
          LiveGameRoomUpdateQuery
        >,
        liveGameRoomUpdateQuery: LiveGameRoomUpdateQuery,
      ): Promise<void | null | LiveGameRoom | LiveGameRoom[]> =>
        updateRepository.update(liveGameRoomUpdateQuery),
      undefined,
    ],
    [
      '.updateAndSelect()',
      async (
        updateRepository: UpdateRepository<
          LiveGameRoom,
          LiveGameRoomUpdateQuery
        >,
        liveGameRoomUpdateQuery: LiveGameRoomUpdateQuery,
      ): Promise<void | null | LiveGameRoom | LiveGameRoom[]> =>
        updateRepository.updateAndSelect(liveGameRoomUpdateQuery),
      (result: LiveGameRoom | null): LiveGameRoom[] =>
        result === null ? [] : [result],
    ],
    [
      '.updateOne()',
      async (
        updateRepository: UpdateRepository<
          LiveGameRoom,
          LiveGameRoomUpdateQuery
        >,
        liveGameRoomUpdateQuery: LiveGameRoomUpdateQuery,
      ): Promise<void | null | LiveGameRoom | LiveGameRoom[]> =>
        updateRepository.updateOne(liveGameRoomUpdateQuery),
      undefined,
    ],
    [
      '.updateOneAndSelect()',
      async (
        updateRepository: UpdateRepository<
          LiveGameRoom,
          LiveGameRoomUpdateQuery
        >,
        liveGameRoomUpdateQuery: LiveGameRoomUpdateQuery,
      ): Promise<void | null | LiveGameRoom | LiveGameRoom[]> =>
        updateRepository.updateOneAndSelect(liveGameRoomUpdateQuery),
      (result: LiveGameRoom | null) => result,
    ],
  ])(
    '%s',
    (
      _describeName: string,
      caller: (
        updateRepository: UpdateRepository<
          LiveGameRoom,
          LiveGameRoomUpdateQuery
        >,
        liveGameRoomUpdateQuery: LiveGameRoomUpdateQuery,
      ) => Promise<void | null | LiveGameRoom | LiveGameRoom[]>,
      resultExpander:
        | ((
            result: LiveGameRoom | null,
          ) => null | LiveGameRoom | LiveGameRoom[])
        | undefined,
    ) => {
      describe('having an AddPlayerToLiveGameRoomQuery', () => {
        let liveGameRoomInMemoryRepository: LiveGameRoomInMemoryRepository;

        let addPlayerToLiveGameRoomQueryFixture: AddPlayerToLiveGameRoomQuery;

        beforeAll(async () => {
          liveGameRoomInMemoryRepository = new LiveGameRoomInMemoryRepository();

          const liveGameId: string = 'sample-live-game-id';

          const liveGameRoomCreationQueryFixture: LiveGameRoomCreationQuery = {
            liveGameId: liveGameId,
          };

          addPlayerToLiveGameRoomQueryFixture = {
            liveGameId: liveGameId,
            playerGategay: {
              send: jest.fn(),
            },
            playerId: 'sample-player-id',
            type: LiveGameRoomUpdateQueryType.AddPlayerToLiveGameRoom,
          };

          await liveGameRoomInMemoryRepository.insert(
            liveGameRoomCreationQueryFixture,
          );
        });

        describe('when called', () => {
          let expected: LiveGameRoom;

          let resultFromCall: unknown;
          let resultFromQuery: unknown;

          beforeAll(async () => {
            expected = {
              liveGameId: addPlayerToLiveGameRoomQueryFixture.liveGameId,
              playerIdToPlayerGatewayMap: new Map<string, Messenger>([
                [
                  addPlayerToLiveGameRoomQueryFixture.playerId,
                  addPlayerToLiveGameRoomQueryFixture.playerGategay,
                ],
              ]),
            };

            const liveGameRoomFindQueryFixture: LiveGameRoomFindQuery = {
              liveGameId: addPlayerToLiveGameRoomQueryFixture.liveGameId,
            };

            resultFromCall = await caller(
              liveGameRoomInMemoryRepository,
              addPlayerToLiveGameRoomQueryFixture,
            );

            resultFromQuery = await liveGameRoomInMemoryRepository.findOne(
              liveGameRoomFindQueryFixture,
            );
          });

          if (resultExpander !== undefined) {
            it('must return an updated liveGameRoom', () => {
              expect(resultFromCall).toStrictEqual(resultExpander(expected));
            });
          }

          it('must return an updated liveGameRoom from the find query', () => {
            expect(resultFromQuery).toStrictEqual(expected);
          });
        });
      });

      describe('having a RemovePlayerFromGameRoomQuery', () => {
        let liveGameRoomInMemoryRepository: LiveGameRoomInMemoryRepository;

        let addPlayerToLiveGameRoomQueryFixture: AddPlayerToLiveGameRoomQuery;
        let removePlayerFromGameRoomQuery: RemovePlayerFromGameRoomQuery;

        let liveGameRoomFound: LiveGameRoom | null;

        beforeAll(async () => {
          liveGameRoomInMemoryRepository = new LiveGameRoomInMemoryRepository();

          const liveGameId: string = 'sample-live-game-id';

          const liveGameRoomCreationQueryFixture: LiveGameRoomCreationQuery = {
            liveGameId: liveGameId,
          };

          addPlayerToLiveGameRoomQueryFixture = {
            liveGameId: liveGameId,
            playerGategay: {
              send: jest.fn(),
            },
            playerId: 'sample-player-id',
            type: LiveGameRoomUpdateQueryType.AddPlayerToLiveGameRoom,
          };

          removePlayerFromGameRoomQuery = {
            liveGameId: liveGameId,
            playerId: 'sample-player-id',
            type: LiveGameRoomUpdateQueryType.RemovePlayerFromLiveGameRoom,
          };

          await liveGameRoomInMemoryRepository.insert(
            liveGameRoomCreationQueryFixture,
          );

          await caller(
            liveGameRoomInMemoryRepository,
            addPlayerToLiveGameRoomQueryFixture,
          );
        });

        describe('when called', () => {
          beforeAll(async () => {
            const liveGameRoomFindQueryFixture: LiveGameRoomFindQuery = {
              liveGameId: addPlayerToLiveGameRoomQueryFixture.liveGameId,
            };

            await caller(
              liveGameRoomInMemoryRepository,
              removePlayerFromGameRoomQuery,
            );

            liveGameRoomFound = await liveGameRoomInMemoryRepository.findOne(
              liveGameRoomFindQueryFixture,
            );
          });

          it('must return an updated liveGameRoom', () => {
            const expected: LiveGameRoom = {
              liveGameId: addPlayerToLiveGameRoomQueryFixture.liveGameId,
              playerIdToPlayerGatewayMap: new Map<string, Messenger>(),
            };

            expect(liveGameRoomFound).toStrictEqual(expected);
          });
        });
      });
    },
  );
});
