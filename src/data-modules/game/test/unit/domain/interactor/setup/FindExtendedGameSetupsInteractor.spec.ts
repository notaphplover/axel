/* eslint-disable @typescript-eslint/unbound-method */
import 'reflect-metadata';
import { ExtendedGameSetup } from '../../../../../domain/model/setup/ExtendedGameSetup';
import { ExtendedGameSetupFindQuery } from '../../../../../domain/query/setup/ExtendedGameSetupFindQuery';
import { FindExtendedGameSetupsInteractor } from '../../../../../domain/interactor/setup/FindExtendedGameSetupsInteractor';
import { SearchRepository } from '../../../../../../../layer-modules/db/domain';
import { extendedGameSetupFindQueryFixtureFactory } from '../../../../fixtures/domain/query/setup';
import { extendedGameSetupFixtureFactory } from '../../../../fixtures/domain/model/setup';

describe(FindExtendedGameSetupsInteractor.name, () => {
  let extendedGameSetupSearchRepository: SearchRepository<
    ExtendedGameSetup,
    ExtendedGameSetupFindQuery
  >;
  let findExtendedGameSetupsInteractor: FindExtendedGameSetupsInteractor;

  beforeAll(() => {
    extendedGameSetupSearchRepository = ({
      find: jest.fn(),
    } as Partial<
      SearchRepository<ExtendedGameSetup, ExtendedGameSetupFindQuery>
    >) as SearchRepository<ExtendedGameSetup, ExtendedGameSetupFindQuery>;

    findExtendedGameSetupsInteractor = new FindExtendedGameSetupsInteractor(
      extendedGameSetupSearchRepository,
    );
  });

  describe('.interact()', () => {
    describe('when called', () => {
      let result: unknown;

      beforeAll(async () => {
        (extendedGameSetupSearchRepository.find as jest.Mock).mockResolvedValueOnce(
          [extendedGameSetupFixtureFactory.get()],
        );

        result = await findExtendedGameSetupsInteractor.interact(
          extendedGameSetupFindQueryFixtureFactory.get(),
        );
      });

      it('must call extendedGameSetupSearchRepository.find() with the received query', () => {
        expect(extendedGameSetupSearchRepository.find).toHaveBeenCalledTimes(1);
        expect(extendedGameSetupSearchRepository.find).toHaveBeenCalledWith(
          extendedGameSetupFindQueryFixtureFactory.get(),
        );
      });

      it('must return the repository result', () => {
        expect(result).toStrictEqual([extendedGameSetupFixtureFactory.get()]);
      });
    });
  });
});
