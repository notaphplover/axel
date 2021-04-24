import 'reflect-metadata';

import { InsertRepository } from '../../../../../layer-modules/db/domain';
import { CreateEntitiesInteractor } from '../../../../domain/interactor/CreateEntitiesInteractor';

interface EntityFixture {
  foo: string;
}

interface QueryFixture {
  fooInitialValue: string;
}

describe(CreateEntitiesInteractor.name, () => {
  let entityInsertRepository: jest.Mocked<
    InsertRepository<EntityFixture, QueryFixture>
  >;

  let createEntitiesInteractor: CreateEntitiesInteractor<
    EntityFixture,
    QueryFixture
  >;

  beforeAll(() => {
    entityInsertRepository = {
      insert: jest.fn(),
    };

    createEntitiesInteractor = new CreateEntitiesInteractor<
      EntityFixture,
      QueryFixture
    >(entityInsertRepository);
  });

  describe('.interact', () => {
    describe('when called', () => {
      let entityFixture: EntityFixture;
      let queryFixture: QueryFixture;
      let result: unknown;

      beforeAll(async () => {
        entityFixture = {
          foo: 'bar',
        };

        queryFixture = {
          fooInitialValue: 'bar',
        };

        entityInsertRepository.insert.mockResolvedValueOnce([entityFixture]);

        result = await createEntitiesInteractor.interact(queryFixture);
      });

      it('must call entityInsertRepository.insert', () => {
        expect(entityInsertRepository.insert).toHaveBeenCalledTimes(1);
        expect(entityInsertRepository.insert).toHaveBeenCalledWith(
          queryFixture,
        );
      });

      it('must return the entity created', () => {
        expect(result).toStrictEqual([entityFixture]);
      });
    });
  });
});
