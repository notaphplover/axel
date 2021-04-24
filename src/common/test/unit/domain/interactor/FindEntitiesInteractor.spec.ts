import 'reflect-metadata';

import { SearchRepository } from '../../../../../layer-modules/db/domain';
import { FindEntitiesInteractor } from '../../../../domain/interactor/FindEntitiesInteractor';

interface EntityFixture {
  foo: string;
}

interface QueryFixture {
  fooValue: string;
}

describe(FindEntitiesInteractor.name, () => {
  let entitySearchRepository: jest.Mocked<
    SearchRepository<EntityFixture, QueryFixture>
  >;

  let findEntitiesInteractor: FindEntitiesInteractor<
    EntityFixture,
    QueryFixture
  >;

  beforeAll(() => {
    entitySearchRepository = ({
      find: jest.fn(),
    } as Partial<
      jest.Mocked<SearchRepository<EntityFixture, QueryFixture>>
    >) as jest.Mocked<SearchRepository<EntityFixture, QueryFixture>>;

    findEntitiesInteractor = new FindEntitiesInteractor<
      EntityFixture,
      QueryFixture
    >(entitySearchRepository);
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
          fooValue: 'bar',
        };

        entitySearchRepository.find.mockResolvedValueOnce([entityFixture]);

        result = await findEntitiesInteractor.interact(queryFixture);
      });

      it('must call entitySearchRepository.find', () => {
        expect(entitySearchRepository.find).toHaveBeenCalledTimes(1);
        expect(entitySearchRepository.find).toHaveBeenCalledWith(queryFixture);
      });

      it('must return the entity created', () => {
        expect(result).toStrictEqual([entityFixture]);
      });
    });
  });
});
