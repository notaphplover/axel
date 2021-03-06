import { injectable } from 'inversify';

import { Converter } from '../../../../../common/domain';
import { PlayerReference } from '../../model/setup/PlayerReference';
import { PlayerSetup } from '../../model/setup/PlayerSetup';

@injectable()
export class PlayerSetupToPlayerReferenceConverter
  implements Converter<PlayerSetup, PlayerReference>
{
  public transform(input: PlayerSetup): PlayerReference {
    return {
      userId: input.userId,
    };
  }
}
