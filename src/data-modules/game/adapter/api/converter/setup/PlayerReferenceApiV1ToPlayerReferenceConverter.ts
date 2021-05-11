import { injectable } from 'inversify';

import { Converter } from '../../../../../../common/domain';
import { PlayerReference } from '../../../../domain/model/setup/PlayerReference';
import { PlayerReferenceApiV1 } from '../../model/setup/PlayerReferenceApiV1';

@injectable()
export class PlayerReferenceApiV1ToPlayerReferenceConverter
  implements Converter<PlayerReferenceApiV1, PlayerReference>
{
  public transform(input: PlayerReferenceApiV1): PlayerReference {
    return {
      userId: input.userId,
    };
  }
}
