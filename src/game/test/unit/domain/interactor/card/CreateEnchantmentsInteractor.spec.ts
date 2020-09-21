/* eslint-disable @typescript-eslint/unbound-method */
import 'reflect-metadata';
import { CreateEnchantmentsInteractor } from '../../../../../domain/interactor/card/CreateEnchantmentsInteractor';
import { Enchantment } from '../../../../../domain/model/card/Enchantment';
import { EnchantmentCreationQuery } from '../../../../../domain/query/card/EnchantmentCreationQuery';
import { InsertRepository } from '../../../../../../layer-modules/db/domain';
import { enchantmentCreationQueryFixtureFactory } from '../../../../fixtures/domain/query/fixtures';
import { enchantmentFixtureFactory } from '../../../../fixtures/domain/model/fixtures';

describe(CreateEnchantmentsInteractor.name, () => {
  let enchantmentInsertRepository: InsertRepository<
    Enchantment,
    EnchantmentCreationQuery
  >;

  let createEnchantmentsInteractor: CreateEnchantmentsInteractor;

  beforeAll(() => {
    enchantmentInsertRepository = {
      insert: jest.fn(),
    };

    createEnchantmentsInteractor = new CreateEnchantmentsInteractor(
      enchantmentInsertRepository,
    );
  });

  describe('.interact()', () => {
    describe('when called', () => {
      let result: unknown;

      beforeAll(async () => {
        (enchantmentInsertRepository.insert as jest.Mock).mockResolvedValueOnce(
          [enchantmentFixtureFactory.get()],
        );

        result = await createEnchantmentsInteractor.interact(
          enchantmentCreationQueryFixtureFactory.get(),
        );
      });

      it('must call enchantmentInsertRespository.insert', () => {
        expect(enchantmentInsertRepository.insert).toHaveBeenCalledTimes(1);
        expect(enchantmentInsertRepository.insert).toHaveBeenCalledWith(
          enchantmentCreationQueryFixtureFactory.get(),
        );
      });

      it('must return enchantmentInsertRespository.insert results', () => {
        expect(result).toStrictEqual([enchantmentFixtureFactory.get()]);
      });
    });
  });
});
