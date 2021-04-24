import 'reflect-metadata';

import { SearchRepository } from '../../../../../layer-modules/db/domain';
import { FindEntityInteractor } from '../../../../domain/interactor/FindEntityInteractor';

interface EntityFixture {
  foo: string;
}

interface QueryFixture {
  fooValue: string;
}

describe(FindEntityInteractor.name, () => {
  let entitySearchRepository: jest.Mocked<
    SearchRepository<EntityFixture, QueryFixture>
  >;

  let findEntityInteractor: FindEntityInteractor<EntityFixture, QueryFixture>;

  beforeAll(() => {
    entitySearchRepository = ({
      findOne: jest.fn(),
    } as Partial<
      jest.Mocked<SearchRepository<EntityFixture, QueryFixture>>
    >) as jest.Mocked<SearchRepository<EntityFixture, QueryFixture>>;

    findEntityInteractor = new FindEntityInteractor<
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

        entitySearchRepository.findOne.mockResolvedValueOnce(entityFixture);

        result = await findEntityInteractor.interact(queryFixture);
      });

      it('must call entitySearchRepository.findOne', () => {
        expect(entitySearchRepository.findOne).toHaveBeenCalledTimes(1);
        expect(entitySearchRepository.findOne).toHaveBeenCalledWith(
          queryFixture,
        );
      });

      it('must return the entity created', () => {
        expect(result).toStrictEqual(entityFixture);
      });
    });
  });
});
