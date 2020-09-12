/* eslint-disable @typescript-eslint/unbound-method */
import 'reflect-metadata';
import { CreateUsersInteractor } from '../../../../domain/interactor/CreateUsersInteractor';
import { InsertRepository } from '../../../../../layer-modules/db/domain';
import { User } from '../../../../domain/model/User';
import { UserCreationQuery } from '../../../../domain/query/UserCreationQuery';
import { userCreationQueryFixtureFactory } from '../../../fixtures/domain/query/fixtures';
import { userFixtureFactory } from '../../../fixtures/domain/model/fixtures';

describe(CreateUsersInteractor.name, () => {
  let userInsertRepository: InsertRepository<User, UserCreationQuery>;

  let createUsersInteractor: CreateUsersInteractor;

  beforeAll(() => {
    userInsertRepository = ({
      insert: jest.fn(),
    } as Partial<
      InsertRepository<User, UserCreationQuery>
    >) as InsertRepository<User, UserCreationQuery>;

    createUsersInteractor = new CreateUsersInteractor(userInsertRepository);
  });

  describe('.interact()', () => {
    describe('when called', () => {
      let result: unknown;

      beforeAll(async () => {
        (userInsertRepository.insert as jest.Mock).mockResolvedValueOnce([
          userFixtureFactory.get(),
        ]);

        result = await createUsersInteractor.interact(
          userCreationQueryFixtureFactory.get(),
        );
      });

      it('must call userInsertRepository.insert() with the users obtained from the converter', () => {
        expect(userInsertRepository.insert).toHaveBeenCalledTimes(1);
        expect(userInsertRepository.insert).toHaveBeenCalledWith(
          userCreationQueryFixtureFactory.get(),
        );
      });

      it('must return the user created', () => {
        expect(result).toStrictEqual([userFixtureFactory.get()]);
      });
    });
  });
});
