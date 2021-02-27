import 'reflect-metadata';
import { SearchRepository } from '../../../../../../../layer-modules/db/domain';
import { FindGameSetupsInteractor } from '../../../../../domain/interactor/setup/FindGameSetupsInteractor';
import { GameSetup } from '../../../../../domain/model/setup/GameSetup';
import { GameSetupFindQuery } from '../../../../../domain/query/setup/GameSetupFindQuery';
import { gameSetupFixtureFactory } from '../../../../fixtures/domain/model/setup';
import { gameSetupFindQueryFixtureFactory } from '../../../../fixtures/domain/query/setup';

describe(FindGameSetupsInteractor.name, () => {
  let gameSetupSearchRepository: SearchRepository<
    GameSetup,
    GameSetupFindQuery
  >;
  let findGameSetupsInteractor: FindGameSetupsInteractor;

  beforeAll(() => {
    gameSetupSearchRepository = ({
      find: jest.fn(),
    } as Partial<
      SearchRepository<GameSetup, GameSetupFindQuery>
    >) as SearchRepository<GameSetup, GameSetupFindQuery>;

    findGameSetupsInteractor = new FindGameSetupsInteractor(
      gameSetupSearchRepository,
    );
  });

  describe('.interact()', () => {
    describe('when called', () => {
      let result: unknown;

      beforeAll(async () => {
        (gameSetupSearchRepository.find as jest.Mock).mockResolvedValueOnce([
          gameSetupFixtureFactory.get(),
        ]);

        result = await findGameSetupsInteractor.interact(
          gameSetupFindQueryFixtureFactory.get(),
        );
      });

      it('must call gameSetupSearchRepository.find() with the received query', () => {
        expect(gameSetupSearchRepository.find).toHaveBeenCalledTimes(1);
        expect(gameSetupSearchRepository.find).toHaveBeenCalledWith(
          gameSetupFindQueryFixtureFactory.get(),
        );
      });

      it('must return the repository result', () => {
        expect(result).toStrictEqual([gameSetupFixtureFactory.get()]);
      });
    });
  });
});
