/* eslint-disable @typescript-eslint/unbound-method */
import 'reflect-metadata';
import { CreateLiveGamesInteractor } from '../../../../../domain/interactor/live/CreateLiveGamesInteractor';
import { InsertRepository } from '../../../../../../../layer-modules/db/domain';
import { LiveGame } from '../../../../../domain/model/live/LiveGame';
import { LiveGameCreationQuery } from '../../../../../domain/query/live/LiveGameCreationQuery';
import { gameCreationQueryFixtureFactory } from '../../../../fixtures/domain/query/card';
import { gameFixtureFactory } from '../../../../fixtures/domain/model';

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
          gameFixtureFactory.get(),
        ]);

        result = await createLiveGamesInteractor.interact(
          gameCreationQueryFixtureFactory.get(),
        );
      });

      it('must call gameInsertRepository.insert() with the games obtained from the converter', () => {
        expect(liveGameInsertRepository.insert).toHaveBeenCalledTimes(1);
        expect(liveGameInsertRepository.insert).toHaveBeenCalledWith(
          gameCreationQueryFixtureFactory.get(),
        );
      });

      it('must return the game created', () => {
        expect(result).toStrictEqual([gameFixtureFactory.get()]);
      });
    });
  });
});
