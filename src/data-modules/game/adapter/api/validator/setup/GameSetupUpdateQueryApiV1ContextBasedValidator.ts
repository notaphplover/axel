import {
  ContextBasedValidator,
  ValidationResult,
  Validator,
} from '../../../../../../common/domain';
import { inject, injectable } from 'inversify';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { GameSetupUpdateQueryApiV1 } from '../../query/setup/GameSetupUpdateQueryApiV1';
import { GameSetupUpdateQueryApiV1ValidationContext } from './GameSetupUpdateQueryApiV1ValidationContext';

@injectable()
export class GameSetupUpdateQueryApiV1ContextBasedValidator
  implements
    ContextBasedValidator<
      GameSetupUpdateQueryApiV1,
      GameSetupUpdateQueryApiV1ValidationContext
    > {
  constructor(
    @inject(
      GAME_ADAPTER_TYPES.api.validator.setup
        .GAME_SETUP_UPDATE_QUERY_API_V1_VALIDATOR,
    )
    private readonly gameSetupCreationQueryApiV1Validator: Validator<
      GameSetupUpdateQueryApiV1
    >,
  ) {}

  public validate(
    value: unknown,
    context: GameSetupUpdateQueryApiV1ValidationContext,
  ): ValidationResult<GameSetupUpdateQueryApiV1> {
    const gameSetupUpdateQueryApiV1ValidatorValidationResult: ValidationResult<GameSetupUpdateQueryApiV1> = this.gameSetupCreationQueryApiV1Validator.validate(
      value,
    );

    if (gameSetupUpdateQueryApiV1ValidatorValidationResult.result) {
      return this.validateGameSetupUpdateQueryApiV1(
        gameSetupUpdateQueryApiV1ValidatorValidationResult.model,
        context,
      );
    } else {
      return gameSetupUpdateQueryApiV1ValidatorValidationResult;
    }
  }

  private validateGameSetupUpdateQueryApiV1(
    gameSetupUpdateQuery: GameSetupUpdateQueryApiV1,
    context: GameSetupUpdateQueryApiV1ValidationContext,
  ): ValidationResult<GameSetupUpdateQueryApiV1> {
    const errorMessages: string[] = [];

    this.validateAdditionalPlayerSetups(
      gameSetupUpdateQuery,
      context,
      errorMessages,
    );

    this.validateRemovePlayerSetups(
      gameSetupUpdateQuery,
      context,
      errorMessages,
    );

    if (errorMessages.length === 0) {
      return {
        model: gameSetupUpdateQuery,
        result: true,
      };
    } else {
      const errorMessage: string = errorMessages.join('\n');

      return {
        errorMessage: errorMessage,
        result: false,
      };
    }
  }

  private validateAdditionalPlayerSetups(
    gameSetupUpdateQuery: GameSetupUpdateQueryApiV1,
    context: GameSetupUpdateQueryApiV1ValidationContext,
    errorMessages: string[],
  ): void {
    if (gameSetupUpdateQuery.additionalPlayerSetups !== undefined) {
      if (
        gameSetupUpdateQuery.additionalPlayerSetups.length === 1 &&
        gameSetupUpdateQuery.additionalPlayerSetups[0].userId ===
          context.user.id
      ) {
        errorMessages.push(
          'Invalid additionalPlayerSetups: expected one player setup of the user who send the request.',
        );
      }
    }
  }

  private validateRemovePlayerSetups(
    gameSetupUpdateQuery: GameSetupUpdateQueryApiV1,
    context: GameSetupUpdateQueryApiV1ValidationContext,
    errorMessages: string[],
  ): void {
    if (gameSetupUpdateQuery.removePlayerSetups !== undefined) {
      if (
        gameSetupUpdateQuery.removePlayerSetups.length === 1 &&
        gameSetupUpdateQuery.removePlayerSetups[0].userId === context.user.id
      ) {
        errorMessages.push(
          'Invalid removePlayerSetups: expected one player setup of the user who send the request.',
        );
      }
    }
  }
}
