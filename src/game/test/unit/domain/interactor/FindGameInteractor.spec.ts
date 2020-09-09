/* eslint-disable @typescript-eslint/unbound-method */
import 'reflect-metadata';
import { FindGameInteractor } from '../../../../domain/interactor/FindGameInteractor';
import { Game } from '../../../../domain/model/Game';
import { GameFindQuery } from '../../../../domain/query/GameFindQuery';
import { SearchRepository } from '../../../../../layer-modules/db/domain';
import { gameFindQueryFixtureFactory } from '../../../fixtures/domain/query/fixtures';
import { gameFixtureFactory } from '../../../fixtures/domain/model/fixtures';

describe(FindGameInteractor.name, () => {
  let gameSearchRepository: SearchRepository<Game, GameFindQuery>;
  let findGameInteractor: FindGameInteractor;

  beforeAll(() => {
    gameSearchRepository = ({
      findOne: jest.fn(),
    } as Partial<SearchRepository<Game, GameFindQuery>>) as SearchRepository<
      Game,
      GameFindQuery
    >;

    findGameInteractor = new FindGameInteractor(gameSearchRepository);
  });

  describe('.interact()', () => {
    describe('when called', () => {
      let result: unknown;

      beforeAll(async () => {
        (gameSearchRepository.findOne as jest.Mock).mockResolvedValueOnce(
          gameFixtureFactory.get(),
        );

        result = await findGameInteractor.interact(
          gameFindQueryFixtureFactory.get(),
        );
      });

      it('must call gameSearchRepository.findOne() with the received query', () => {
        expect(gameSearchRepository.findOne).toHaveBeenCalledTimes(1);
        expect(gameSearchRepository.findOne).toHaveBeenCalledWith(
          gameFindQueryFixtureFactory.get(),
        );
      });

      it('must return the repository result', () => {
        expect(result).toStrictEqual(gameFixtureFactory.get());
      });
    });
  });
});
