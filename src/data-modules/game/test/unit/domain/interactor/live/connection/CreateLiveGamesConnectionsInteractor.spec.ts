import 'reflect-metadata';

import { InsertRepository } from '../../../../../../../../layer-modules/db/domain';
import { CreateLiveGamesConnectionsInteractor } from '../../../../../../domain/interactor/live/connection/CreateLiveGamesConnectionsInteractor';
import { LiveGameConnections } from '../../../../../../domain/model/live/connection/LiveGameConnections';
import { LiveGameConnectionsCreationQuery } from '../../../../../../domain/query/live/connection/LiveGameConnectionsCreationQuery';
import { liveGameConnectionsFixtureFactory } from '../../../../../fixtures/domain/model/live';
import { liveGameConnectionsCreationQueryFixtureFactory } from '../../../../../fixtures/domain/query/live';

describe(CreateLiveGamesConnectionsInteractor.name, () => {
  let liveGameConnectionsInsertRepository: jest.Mocked<
    InsertRepository<LiveGameConnections, LiveGameConnectionsCreationQuery>
  >;

  let createLiveGamesConnectionsInteractor: CreateLiveGamesConnectionsInteractor;

  beforeAll(() => {
    liveGameConnectionsInsertRepository = {
      insert: jest.fn(),
    };

    createLiveGamesConnectionsInteractor = new CreateLiveGamesConnectionsInteractor(
      liveGameConnectionsInsertRepository,
    );
  });

  describe('.interact()', () => {
    describe('when called', () => {
      let result: unknown;

      beforeAll(async () => {
        liveGameConnectionsInsertRepository.insert.mockResolvedValueOnce([
          liveGameConnectionsFixtureFactory.get(),
        ]);

        result = await createLiveGamesConnectionsInteractor.interact(
          liveGameConnectionsCreationQueryFixtureFactory.get(),
        );
      });

      afterAll(() => {
        liveGameConnectionsInsertRepository.insert.mockClear();
      });

      it('should call liveGameConnectionsInsertRepository.insert()', () => {
        expect(
          liveGameConnectionsInsertRepository.insert,
        ).toHaveBeenCalledTimes(1);
        expect(liveGameConnectionsInsertRepository.insert).toHaveBeenCalledWith(
          liveGameConnectionsCreationQueryFixtureFactory.get(),
        );
      });

      it('should return the liveGameConnections inserted', () => {
        expect(result).toStrictEqual([liveGameConnectionsFixtureFactory.get()]);
      });
    });
  });
});
