/* eslint-disable @typescript-eslint/unbound-method */
import 'reflect-metadata';
import { SearchRepository } from '../../../../../../../layer-modules/db/domain';
import { FindLiveGameInteractor } from '../../../../../domain/interactor/live/FindLiveGameInteractor';
import { LiveGame } from '../../../../../domain/model/live/LiveGame';
import { LiveGameFindQuery } from '../../../../../domain/query/live/LiveGameFindQuery';
import { liveGameFixtureFactory } from '../../../../fixtures/domain/model';
import { gameFindQueryFixtureFactory } from '../../../../fixtures/domain/query/card';

describe(FindLiveGameInteractor.name, () => {
  let liveGameSearchRepository: SearchRepository<LiveGame, LiveGameFindQuery>;
  let findLiveGameInteractor: FindLiveGameInteractor;

  beforeAll(() => {
    liveGameSearchRepository = ({
      findOne: jest.fn(),
    } as Partial<
      SearchRepository<LiveGame, LiveGameFindQuery>
    >) as SearchRepository<LiveGame, LiveGameFindQuery>;

    findLiveGameInteractor = new FindLiveGameInteractor(
      liveGameSearchRepository,
    );
  });

  describe('.interact()', () => {
    describe('when called', () => {
      let result: unknown;

      beforeAll(async () => {
        (liveGameSearchRepository.findOne as jest.Mock).mockResolvedValueOnce(
          liveGameFixtureFactory.get(),
        );

        result = await findLiveGameInteractor.interact(
          gameFindQueryFixtureFactory.get(),
        );
      });

      it('must call liveGameSearchRepository.findOne() with the received query', () => {
        expect(liveGameSearchRepository.findOne).toHaveBeenCalledTimes(1);
        expect(liveGameSearchRepository.findOne).toHaveBeenCalledWith(
          gameFindQueryFixtureFactory.get(),
        );
      });

      it('must return the repository result', () => {
        expect(result).toStrictEqual(liveGameFixtureFactory.get());
      });
    });
  });
});
