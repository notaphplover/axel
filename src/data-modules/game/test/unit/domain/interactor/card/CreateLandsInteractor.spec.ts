/* eslint-disable @typescript-eslint/unbound-method */
import 'reflect-metadata';
import { CreateLandsInteractor } from '../../../../../domain/interactor/card/CreateLandsInteractor';
import { InsertRepository } from '../../../../../../../layer-modules/db/domain';
import { Land } from '../../../../../domain/model/card/Land';
import { LandCreationQuery } from '../../../../../domain/query/card/LandCreationQuery';
import { landCreationQueryFixtureFactory } from '../../../../fixtures/domain/query/fixtures';
import { landFixtureFactory } from '../../../../fixtures/domain/model/fixtures';

describe(CreateLandsInteractor.name, () => {
  let landInsertRepository: InsertRepository<Land, LandCreationQuery>;

  let createLandsInteractor: CreateLandsInteractor;

  beforeAll(() => {
    landInsertRepository = {
      insert: jest.fn(),
    };

    createLandsInteractor = new CreateLandsInteractor(landInsertRepository);
  });

  describe('.interact()', () => {
    describe('when called', () => {
      let result: unknown;

      beforeAll(async () => {
        (landInsertRepository.insert as jest.Mock).mockResolvedValueOnce([
          landFixtureFactory.get(),
        ]);

        result = await createLandsInteractor.interact(
          landCreationQueryFixtureFactory.get(),
        );
      });

      it('must call landInsertRespository.insert', () => {
        expect(landInsertRepository.insert).toHaveBeenCalledTimes(1);
        expect(landInsertRepository.insert).toHaveBeenCalledWith(
          landCreationQueryFixtureFactory.get(),
        );
      });

      it('must return landInsertRespository.insert results', () => {
        expect(result).toStrictEqual([landFixtureFactory.get()]);
      });
    });
  });
});