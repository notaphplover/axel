import 'reflect-metadata';
import { InsertRepository } from '../../../../../../../layer-modules/db/domain';
import { CreateCardsInteractor } from '../../../../../domain/interactor/card/CreateCardsInteractor';
import { Card } from '../../../../../domain/model/card/Card';
import { CardCreationQuery } from '../../../../../domain/query/card/CardCreationQuery';
import { creatureFixtureFactory } from '../../../../fixtures/domain/model/card';
import { creatureCreationQueryFixtureFactory } from '../../../../fixtures/domain/query/card';

describe(CreateCardsInteractor.name, () => {
  let createCardsRepository: InsertRepository<Card, CardCreationQuery>;

  let createCardsInteractor: CreateCardsInteractor;

  beforeAll(() => {
    createCardsRepository = {
      insert: jest.fn(),
    };

    createCardsInteractor = new CreateCardsInteractor(createCardsRepository);
  });

  describe('.interact()', () => {
    describe('when called, with an CardCreationQuery', () => {
      let result: unknown;

      beforeAll(async () => {
        (createCardsRepository.insert as jest.Mock).mockResolvedValueOnce([
          creatureFixtureFactory.get(),
        ]);

        result = await createCardsInteractor.interact(
          creatureCreationQueryFixtureFactory.get(),
        );
      });

      it('must call createCreaturesInteractor.interact', () => {
        expect(createCardsRepository.insert).toHaveBeenCalledTimes(1);
        expect(createCardsRepository.insert).toHaveBeenCalledWith(
          creatureCreationQueryFixtureFactory.get(),
        );
      });

      it('must return the creatures found by createCreaturesInteractor', () => {
        expect(result).toStrictEqual([creatureFixtureFactory.get()]);
      });
    });
  });
});
