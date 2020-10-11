import { inject, injectable } from 'inversify';
import { Interactor } from '../../../../common/domain';
import { SearchRepository } from '../../../../layer-modules/db/domain';
import { USER_DOMAIN_TYPES } from '../config/types';
import { User } from '../model/User';
import { UserFindQuery } from '../query/UserFindQuery';

@injectable()
export class FindUserInteractor
  implements Interactor<UserFindQuery, Promise<User | null>> {
  constructor(
    @inject(USER_DOMAIN_TYPES.repository.USER_SEARCH_REPOSITORY)
    private readonly userSearchRepository: SearchRepository<
      User,
      UserFindQuery
    >,
  ) {}

  public async interact(query: UserFindQuery): Promise<User | null> {
    return this.userSearchRepository.findOne(query);
  }
}