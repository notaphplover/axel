import { injectable } from 'inversify';

import { ValidationResult, Validator } from '../../../../../../common/domain';
import { GameSetupCreationQueryApiV1 } from '../../query/setup/GameSetupCreationQueryApiV1';
import { GameSetupCreationQueryPlayerSetupApiV1 } from '../../query/setup/GameSetupCreationQueryPlayerSetupApiV1';
import { GameSetupCreationQueryApiV1ValidationContext } from './GameSetupCreationQueryApiV1ValidationContext';

@injectable()
export class GameSetupCreationQueryApiV1SemanticValidator
  implements
    Validator<
      GameSetupCreationQueryApiV1,
      GameSetupCreationQueryApiV1,
      GameSetupCreationQueryApiV1ValidationContext
    > {
  public validate(
    gameSetupCreationQuery: GameSetupCreationQueryApiV1,
    context: GameSetupCreationQueryApiV1ValidationContext,
  ): ValidationResult<GameSetupCreationQueryApiV1> {
    const userId: string = context.user.id;

    const isSetupOwned: boolean = gameSetupCreationQuery.ownerUserId === userId;

    if (!isSetupOwned) {
      return {
        errorMessage:
          'Invalid game setup query. The user provided must be the owner of the game setup',
        result: false,
      };
    }

    const isEverySetupOwned: boolean = gameSetupCreationQuery.playerSetups.every(
      (playerSetup: GameSetupCreationQueryPlayerSetupApiV1) =>
        playerSetup.userId === userId,
    );

    if (!isEverySetupOwned) {
      return {
        errorMessage:
          'Invalid game setup query. At least one player setup is not owned by the user provided',
        result: false,
      };
    }

    return {
      model: gameSetupCreationQuery,
      result: true,
    };
  }
}
