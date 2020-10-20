/* eslint-disable @typescript-eslint/unbound-method */
import 'reflect-metadata';
import { BasicGameSetup } from '../../../../../domain/model/setup/BasicGameSetup';
import { BasicGameSetupFindQuery } from '../../../../../domain/query/setup/BasicGameSetupFindQuery';
import { FindBasicGameSetupsInteractor } from '../../../../../domain/interactor/setup/FindBasicGameSetupsInteractor';
import { SearchRepository } from '../../../../../../../layer-modules/db/domain';
import { basicGameSetupFindQueryFixtureFactory } from '../../../../fixtures/domain/query/setup';
import { basicGameSetupFixtureFactory } from '../../../../fixtures/domain/model/setup';

describe(FindBasicGameSetupsInteractor.name, () => {
  let basicGameSetupSearchRepository: SearchRepository<
    BasicGameSetup,
    BasicGameSetupFindQuery
  >;
  let findBasicGameSetupsInteractor: FindBasicGameSetupsInteractor;

  beforeAll(() => {
    basicGameSetupSearchRepository = ({
      find: jest.fn(),
    } as Partial<
      SearchRepository<BasicGameSetup, BasicGameSetupFindQuery>
    >) as SearchRepository<BasicGameSetup, BasicGameSetupFindQuery>;

    findBasicGameSetupsInteractor = new FindBasicGameSetupsInteractor(
      basicGameSetupSearchRepository,
    );
  });

  describe('.interact()', () => {
    describe('when called', () => {
      let result: unknown;

      beforeAll(async () => {
        (basicGameSetupSearchRepository.find as jest.Mock).mockResolvedValueOnce(
          [basicGameSetupFixtureFactory.get()],
        );

        result = await findBasicGameSetupsInteractor.interact(
          basicGameSetupFindQueryFixtureFactory.get(),
        );
      });

      it('must call basicGameSetupSearchRepository.find() with the received query', () => {
        expect(basicGameSetupSearchRepository.find).toHaveBeenCalledTimes(1);
        expect(basicGameSetupSearchRepository.find).toHaveBeenCalledWith(
          basicGameSetupFindQueryFixtureFactory.get(),
        );
      });

      it('must return the repository result', () => {
        expect(result).toStrictEqual([basicGameSetupFixtureFactory.get()]);
      });
    });
  });
});
