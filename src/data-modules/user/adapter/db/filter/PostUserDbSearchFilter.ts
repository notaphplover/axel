import { inject, injectable } from 'inversify';
import { PasswordHasher } from '../../security/PasswordHasher';
import { USER_ADAPTER_TYPES } from '../../config/types';
import { UserDb } from '../model/UserDb';
import { UserFindQuery } from '../../../domain/query/UserFindQuery';
import { ValidatorFunctionBasedFilter } from '../../../../../common/domain';
import { commonDomain } from '../../../../../common/domain';

@injectable()
export class PostUserDbSearchFilter extends ValidatorFunctionBasedFilter<
  UserDb,
  UserFindQuery
> {
  constructor(
    @inject(USER_ADAPTER_TYPES.security.PASSWORD_HASHER)
    private readonly passwordHasher: PasswordHasher,
  ) {
    super();
  }

  protected async complains(
    model: UserDb,
    filter: UserFindQuery,
  ): Promise<boolean> {
    if (commonDomain.utils.hasValue(filter.password)) {
      if (
        !(await this.passwordHasher.verifyPassword(filter.password, model.hash))
      ) {
        return false;
      }
    }

    return true;
  }
}
