/* eslint-disable @typescript-eslint/unbound-method */
import 'reflect-metadata';
import { CreateExtendedGameSetupsInteractor } from '../../../../../domain/interactor/setup/CreateExtendedGameSetupsInteractor';
import { ExtendedGameSetup } from '../../../../../domain/model/setup/ExtendedGameSetup';
import { ExtendedGameSetupsCreationQuery } from '../../../../../domain/query/setup/ExtendedGameSetupCreationQuery';
import { InsertRepository } from '../../../../../../../layer-modules/db/domain';
import { extendedGameSetupFixtureFactory } from '../../../../fixtures/domain/model/setup';
import { extendedGameSetupsCreationQueryFixtureFactory } from '../../../../fixtures/domain/query/setup';

describe(CreateExtendedGameSetupsInteractor.name, () => {
  let extendedGameSetupInsertRepository: InsertRepository<
    ExtendedGameSetup,
    ExtendedGameSetupsCreationQuery
  >;

  let createExtendedGameSetupsInteractor: CreateExtendedGameSetupsInteractor;

  beforeAll(() => {
    extendedGameSetupInsertRepository = ({
      insert: jest.fn(),
    } as Partial<
      InsertRepository<ExtendedGameSetup, ExtendedGameSetup>
    >) as InsertRepository<ExtendedGameSetup, ExtendedGameSetupsCreationQuery>;

    createExtendedGameSetupsInteractor = new CreateExtendedGameSetupsInteractor(
      extendedGameSetupInsertRepository,
    );
  });

  describe('.interact()', () => {
    describe('when called', () => {
      let result: unknown;

      beforeAll(async () => {
        (extendedGameSetupInsertRepository.insert as jest.Mock).mockResolvedValueOnce(
          [extendedGameSetupFixtureFactory.get()],
        );

        result = await createExtendedGameSetupsInteractor.interact(
          extendedGameSetupsCreationQueryFixtureFactory.get(),
        );
      });

      it('must call extendedGameSetupInsertRepository.insert() with the game setups obtained from the converter', () => {
        expect(extendedGameSetupInsertRepository.insert).toHaveBeenCalledTimes(
          1,
        );
        expect(extendedGameSetupInsertRepository.insert).toHaveBeenCalledWith(
          extendedGameSetupsCreationQueryFixtureFactory.get(),
        );
      });

      it('must return the game setup created', () => {
        expect(result).toStrictEqual([extendedGameSetupFixtureFactory.get()]);
      });
    });
  });
});
