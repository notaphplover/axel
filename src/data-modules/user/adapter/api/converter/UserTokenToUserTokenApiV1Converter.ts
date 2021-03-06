import { injectable } from 'inversify';

import { Converter } from '../../../../../common/domain';
import { UserToken } from '../../../domain/model/UserToken';
import { UserTokenApiV1 } from '../model/UserTokenApiV1';

@injectable()
export class UserTokenToUserTokenApiV1Converter
  implements Converter<UserToken, UserTokenApiV1>
{
  public transform(input: UserToken): UserTokenApiV1 {
    return {
      token: input.token,
    };
  }
}
