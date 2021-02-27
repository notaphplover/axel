import 'reflect-metadata';
import { InsertRepository } from '../../../../../../../layer-modules/db/domain';
import { CreateCreaturesInteractor } from '../../../../../domain/interactor/card/CreateCreaturesInteractor';
import { Creature } from '../../../../../domain/model/card/Creature';
import { CreatureCreationQuery } from '../../../../../domain/query/card/CreatureCreationQuery';
import { creatureFixtureFactory } from '../../../../fixtures/domain/model/card';
import { creatureCreationQueryFixtureFactory } from '../../../../fixtures/domain/query/card';

describe(CreateCreaturesInteractor.name, () => {
  let creatureInsertRepository: InsertRepository<
    Creature,
    CreatureCreationQuery
  >;

  let createCreaturesInteractor: CreateCreaturesInteractor;

  beforeAll(() => {
    creatureInsertRepository = {
      insert: jest.fn(),
    };

    createCreaturesInteractor = new CreateCreaturesInteractor(
      creatureInsertRepository,
    );
  });

  describe('.interact()', () => {
    describe('when called', () => {
      let result: unknown;

      beforeAll(async () => {
        (creatureInsertRepository.insert as jest.Mock).mockResolvedValueOnce([
          creatureFixtureFactory.get(),
        ]);

        result = await createCreaturesInteractor.interact(
          creatureCreationQueryFixtureFactory.get(),
        );
      });

      it('must call creatureInsertRespository.insert', () => {
        expect(creatureInsertRepository.insert).toHaveBeenCalledTimes(1);
        expect(creatureInsertRepository.insert).toHaveBeenCalledWith(
          creatureCreationQueryFixtureFactory.get(),
        );
      });

      it('must return creatureInsertRespository.insert results', () => {
        expect(result).toStrictEqual([creatureFixtureFactory.get()]);
      });
    });
  });
});
