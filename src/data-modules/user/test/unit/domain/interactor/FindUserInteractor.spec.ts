/* eslint-disable @typescript-eslint/unbound-method */
import 'reflect-metadata';
import { SearchRepository } from '../../../../../../layer-modules/db/domain';
import { FindUserInteractor } from '../../../../domain/interactor/FindUserInteractor';
import { User } from '../../../../domain/model/User';
import { UserFindQuery } from '../../../../domain/query/UserFindQuery';
import { userFixtureFactory } from '../../../fixtures/domain/model/fixtures';
import { userFindQueryFixtureFactory } from '../../../fixtures/domain/query/fixtures';

describe(FindUserInteractor.name, () => {
  let userSearchRepository: SearchRepository<User, UserFindQuery>;
  let findUserInteractor: FindUserInteractor;

  beforeAll(() => {
    userSearchRepository = ({
      findOne: jest.fn(),
    } as Partial<SearchRepository<User, UserFindQuery>>) as SearchRepository<
      User,
      UserFindQuery
    >;

    findUserInteractor = new FindUserInteractor(userSearchRepository);
  });

  describe('.interact()', () => {
    describe('when called', () => {
      let result: unknown;

      beforeAll(async () => {
        (userSearchRepository.findOne as jest.Mock).mockResolvedValueOnce(
          userFixtureFactory.get(),
        );

        result = await findUserInteractor.interact(
          userFindQueryFixtureFactory.get(),
        );
      });

      it('must call UserSearchRepository.findOne() with the received query', () => {
        expect(userSearchRepository.findOne).toHaveBeenCalledTimes(1);
        expect(userSearchRepository.findOne).toHaveBeenCalledWith(
          userFindQueryFixtureFactory.get(),
        );
      });

      it('must return the repository result', () => {
        expect(result).toStrictEqual(userFixtureFactory.get());
      });
    });
  });
});
