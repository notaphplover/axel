import 'reflect-metadata';

import { UpdateRepository } from '../../../../../layer-modules/db/domain';
import { UpdateEntityInteractor } from '../../../../domain/interactor/UpdateEntityInteractor';

interface EntityFixture {
  foo: string;
}

interface QueryFixture {
  fooValue: string;
}

describe(UpdateEntityInteractor.name, () => {
  let entityUpdateRepository: jest.Mocked<
    UpdateRepository<EntityFixture, QueryFixture>
  >;

  let updateEntityInteractor: UpdateEntityInteractor<
    EntityFixture,
    QueryFixture
  >;

  beforeAll(() => {
    entityUpdateRepository = ({
      updateOneAndSelect: jest.fn(),
    } as Partial<
      jest.Mocked<UpdateRepository<EntityFixture, QueryFixture>>
    >) as jest.Mocked<UpdateRepository<EntityFixture, QueryFixture>>;

    updateEntityInteractor = new UpdateEntityInteractor<
      EntityFixture,
      QueryFixture
    >(entityUpdateRepository);
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

        entityUpdateRepository.updateOneAndSelect.mockResolvedValueOnce(
          entityFixture,
        );

        result = await updateEntityInteractor.interact(queryFixture);
      });

      it('must call entityUpdateRepository.updateOneAndSelect', () => {
        expect(entityUpdateRepository.updateOneAndSelect).toHaveBeenCalledTimes(
          1,
        );
        expect(entityUpdateRepository.updateOneAndSelect).toHaveBeenCalledWith(
          queryFixture,
        );
      });

      it('must return the entity created', () => {
        expect(result).toStrictEqual(entityFixture);
      });
    });
  });
});
