import { injectable } from 'inversify';

import { Converter } from '../../../../../../common/domain';
import { GameSetupFindQueryPlayerSetup } from '../../../../domain/query/setup/GameSetupFindQueryPlayerSetup';
import { GameSetupFindQueryPlayerSetupApiV1 } from '../../query/setup/GameSetupFindQueryPlayerSetupApiV1';

@injectable()
export class GameSetupFindQueryPlayerSetupApiV1ToGameSetupFindQueryPlayerSetupConverter
  implements
    Converter<
      GameSetupFindQueryPlayerSetupApiV1,
      GameSetupFindQueryPlayerSetup
    >
{
  public transform(
    input: GameSetupFindQueryPlayerSetupApiV1,
  ): GameSetupFindQueryPlayerSetup {
    return {
      userId: input.userId,
    };
  }
}
