import { Converter } from '../../../../common/domain';
import { UserToken } from '../../../domain/model/UserToken';
import { UserTokenapiV1 } from '../model/UserTokenApiV1';
import { injectable } from 'inversify';

@injectable()
export class UserTokenToUserTokenApiV1Converter
  implements Converter<UserToken, UserTokenapiV1> {
  public transform(input: UserToken): UserTokenapiV1 {
    return {
      token: input.token,
    };
  }
}
