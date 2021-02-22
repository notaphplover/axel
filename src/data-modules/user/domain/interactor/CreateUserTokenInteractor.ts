import { inject, injectable } from 'inversify';

import { Interactor } from '../../../../common/domain';
import { JwtManager, jwtDomain } from '../../../jwt/domain';
import { User } from '../model/User';
import { UserToken } from '../model/UserToken';

@injectable()
export class CreateUserTokenInteractor
  implements Interactor<User, Promise<UserToken>> {
  constructor(
    @inject(jwtDomain.types.JWT_MANAGER)
    private readonly jwtManager: JwtManager<User>,
  ) {}
  public async interact(input: User): Promise<UserToken> {
    return {
      token: await this.jwtManager.create(input),
    };
  }
}
