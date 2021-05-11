import { injectable } from 'inversify';

import {
  commonDomain,
  ValidationResult,
  Validator,
} from '../../../../../../common/domain';
import { GameSetupUpdateQueryApiV1 } from '../../query/setup/GameSetupUpdateQueryApiV1';
import { GameSetupUpdateQueryApiV1ValidationContext } from './GameSetupUpdateQueryApiV1ValidationContext';

@injectable()
export class GameSetupUpdateQueryApiV1SemanticValidator
  implements
    Validator<
      GameSetupUpdateQueryApiV1,
      GameSetupUpdateQueryApiV1,
      GameSetupUpdateQueryApiV1ValidationContext
    >
{
  public validate(
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
        !commonDomain.utils.hasOneElement(
          gameSetupUpdateQuery.additionalPlayerSetups,
        ) ||
        gameSetupUpdateQuery.additionalPlayerSetups[0].userId !==
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
        !commonDomain.utils.hasOneElement(
          gameSetupUpdateQuery.removePlayerSetups,
        ) ||
        gameSetupUpdateQuery.removePlayerSetups[0].userId !== context.user.id
      ) {
        errorMessages.push(
          'Invalid removePlayerSetups: expected one player setup of the user who send the request.',
        );
      }
    }
  }
}
