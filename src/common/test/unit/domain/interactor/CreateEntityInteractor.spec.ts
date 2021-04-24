import 'reflect-metadata';

import { InsertRepository } from '../../../../../layer-modules/db/domain';
import { CreateEntityInteractor } from '../../../../domain/interactor/CreateEntityInteractor';

interface EntityFixture {
  foo: string;
}

interface QueryFixture {
  fooInitialValue: string;
}

describe(CreateEntityInteractor.name, () => {
  let entityInsertRepository: jest.Mocked<
    InsertRepository<EntityFixture, QueryFixture>
  >;

  let createEntityInteractor: CreateEntityInteractor<
    EntityFixture,
    QueryFixture
  >;

  beforeAll(() => {
    entityInsertRepository = {
      insert: jest.fn(),
    };

    createEntityInteractor = new CreateEntityInteractor<
      EntityFixture,
      QueryFixture
    >(entityInsertRepository);
  });

  describe('.interact', () => {
    describe('when called, and one Entity is created', () => {
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

        result = await createEntityInteractor.interact(queryFixture);
      });

      it('must call entityInsertRepository.insert', () => {
        expect(entityInsertRepository.insert).toHaveBeenCalledTimes(1);
        expect(entityInsertRepository.insert).toHaveBeenCalledWith(
          queryFixture,
        );
      });

      it('must return the entity created', () => {
        expect(result).toBe(entityFixture);
      });
    });

    describe('when called, and not one entities are created', () => {
      let result: unknown;

      beforeAll(async () => {
        try {
          const queryFixture: QueryFixture = {
            fooInitialValue: 'bar',
          };

          entityInsertRepository.insert.mockResolvedValueOnce([]);

          await createEntityInteractor.interact(queryFixture);
        } catch (err: unknown) {
          result = err;
        }
      });

      it('must throw an Error', () => {
        expect(result).toBeInstanceOf(Error);
        expect((result as Error).message).toMatch(
          '.insert() to create a single entity,',
        );
      });
    });
  });
});
