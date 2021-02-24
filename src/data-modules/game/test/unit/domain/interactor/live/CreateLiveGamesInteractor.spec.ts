/* eslint-disable @typescript-eslint/unbound-method */
import 'reflect-metadata';
import { InsertRepository } from '../../../../../../../layer-modules/db/domain';
import { CreateLiveGamesInteractor } from '../../../../../domain/interactor/live/CreateLiveGamesInteractor';
import { LiveGame } from '../../../../../domain/model/live/LiveGame';
import { LiveGameCreationQuery } from '../../../../../domain/query/live/LiveGameCreationQuery';
import { liveGameFixtureFactory } from '../../../../fixtures/domain/model/live';
import { liveGameCreationQueryFixtureFactory } from '../../../../fixtures/domain/query/live';

describe(CreateLiveGamesInteractor.name, () => {
  let liveGameInsertRepository: InsertRepository<
    LiveGame,
    LiveGameCreationQuery
  >;

  let createLiveGamesInteractor: CreateLiveGamesInteractor;

  beforeAll(() => {
    liveGameInsertRepository = ({
      insert: jest.fn(),
    } as Partial<
      InsertRepository<LiveGame, LiveGameCreationQuery>
    >) as InsertRepository<LiveGame, LiveGameCreationQuery>;

    createLiveGamesInteractor = new CreateLiveGamesInteractor(
      liveGameInsertRepository,
    );
  });

  describe('.interact()', () => {
    describe('when called', () => {
      let result: unknown;

      beforeAll(async () => {
        (liveGameInsertRepository.insert as jest.Mock).mockResolvedValueOnce([
          liveGameFixtureFactory.get(),
        ]);

        result = await createLiveGamesInteractor.interact(
          liveGameCreationQueryFixtureFactory.get(),
        );
      });

      it('must call gameInsertRepository.insert() with the games obtained from the converter', () => {
        expect(liveGameInsertRepository.insert).toHaveBeenCalledTimes(1);
        expect(liveGameInsertRepository.insert).toHaveBeenCalledWith(
          liveGameCreationQueryFixtureFactory.get(),
        );
      });

      it('must return the game created', () => {
        expect(result).toStrictEqual([liveGameFixtureFactory.get()]);
      });
    });
  });
});
