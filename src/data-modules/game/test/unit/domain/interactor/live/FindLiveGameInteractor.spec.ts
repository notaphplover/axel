/* eslint-disable @typescript-eslint/unbound-method */
import 'reflect-metadata';
import { FindLiveGameInteractor } from '../../../../../domain/interactor/FindLiveGameInteractor';
import { GameFindQuery } from '../../../../../domain/query/GameFindQuery';
import { LiveGame } from '../../../../../domain/model/live/LiveGame';
import { SearchRepository } from '../../../../../../../layer-modules/db/domain';
import { gameFindQueryFixtureFactory } from '../../../../fixtures/domain/query/card';
import { gameFixtureFactory } from '../../../../fixtures/domain/model';

describe(FindLiveGameInteractor.name, () => {
  let gameSearchRepository: SearchRepository<LiveGame, GameFindQuery>;
  let findGameInteractor: FindLiveGameInteractor;

  beforeAll(() => {
    gameSearchRepository = ({
      findOne: jest.fn(),
    } as Partial<
      SearchRepository<LiveGame, GameFindQuery>
    >) as SearchRepository<LiveGame, GameFindQuery>;

    findGameInteractor = new FindLiveGameInteractor(gameSearchRepository);
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
