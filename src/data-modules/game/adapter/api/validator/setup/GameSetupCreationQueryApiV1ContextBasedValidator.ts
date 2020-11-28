import {
  ContextBasedValidator,
  ValidationResult,
  Validator,
} from '../../../../../../common/domain';
import { inject, injectable } from 'inversify';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { GameSetupCreationQueryApiV1 } from '../../query/setup/GameSetupCreationQueryApiV1';
import { GameSetupCreationQueryApiV1ValidationContext } from './GameSetupCreationQueryApiV1ValidationContext';
import { GameSetupCreationQueryPlayerSetupApiV1 } from '../../query/setup/GameSetupCreationQueryPlayerSetupApiV1';

@injectable()
export class GameSetupCreationQueryApiV1ContextBasedValidator
  implements
    ContextBasedValidator<
      GameSetupCreationQueryApiV1,
      GameSetupCreationQueryApiV1ValidationContext
    > {
  constructor(
    @inject(
      GAME_ADAPTER_TYPES.api.validator.setup
        .GAME_SETUP_CREATION_QUERY_API_V1_VALIDATOR,
    )
    private readonly gameSetupCreationQueryApiV1Validator: Validator<GameSetupCreationQueryApiV1>,
  ) {}

  public validate(
    value: unknown,
    context: GameSetupCreationQueryApiV1ValidationContext,
  ): ValidationResult<GameSetupCreationQueryApiV1> {
    const gameSetupCreationQueryApiV1ValidatorValidationResult: ValidationResult<GameSetupCreationQueryApiV1> = this.gameSetupCreationQueryApiV1Validator.validate(
      value,
    );

    if (gameSetupCreationQueryApiV1ValidatorValidationResult.result) {
      return this.validateGameSetupCreationQueryApiV1(
        gameSetupCreationQueryApiV1ValidatorValidationResult.model,
        context,
      );
    } else {
      return gameSetupCreationQueryApiV1ValidatorValidationResult;
    }
  }

  private validateGameSetupCreationQueryApiV1(
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
