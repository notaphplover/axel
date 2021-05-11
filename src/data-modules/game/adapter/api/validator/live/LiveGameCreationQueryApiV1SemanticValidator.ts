import { injectable } from 'inversify';

import { ValidationResult, Validator } from '../../../../../../common/domain';
import { LiveGameCreationQueryApiV1 } from '../../query/live/LiveGameCreationQueryApiV1';
import { LiveGameCreationQueryApiV1ValidationContext } from './LiveGameCreationQueryApiV1ValidationContext';

@injectable()
export class LiveGameCreationQueryApiV1SemanticValidator
  implements
    Validator<
      LiveGameCreationQueryApiV1,
      LiveGameCreationQueryApiV1,
      LiveGameCreationQueryApiV1ValidationContext
    >
{
  public validate(
    value: LiveGameCreationQueryApiV1,
    context: LiveGameCreationQueryApiV1ValidationContext,
  ): ValidationResult<LiveGameCreationQueryApiV1> {
    const errors: string[] = [
      ...this.validateLiveGameCreationQueryApiV1ValidationContext(context),
      ...this.validateLiveGameCreationQueryApiV1(value, context),
    ];

    if (errors.length === 0) {
      return {
        model: value,
        result: true,
      };
    } else {
      return {
        errorMessage: errors.join('\n'),
        result: false,
      };
    }
  }

  private validateLiveGameCreationQueryApiV1ValidationContext(
    context: LiveGameCreationQueryApiV1ValidationContext,
  ): string[] {
    const errors: string[] = [];

    if (
      context.gameSetup.playerSetups.length !== context.gameSetup.playerSlots
    ) {
      errors.push(
        'Invalid game setup. Expected as many player setups as slots available',
      );
    }

    for (const cardDeck of context.deckIdToDeckMap.values()) {
      if (context.gameSetup.format !== cardDeck.format) {
        errors.push(
          `Invalid card deck ${cardDeck.id} . Expected a card deck of "${context.gameSetup.format}" format, got "${cardDeck.format}" instead.`,
        );
      }
    }

    return errors;
  }

  private validateLiveGameCreationQueryApiV1(
    liveGameCreationQueryApiV1: LiveGameCreationQueryApiV1,
    context: LiveGameCreationQueryApiV1ValidationContext,
  ): string[] {
    const errors: string[] = [];

    if (liveGameCreationQueryApiV1.gameSetupId !== context.gameSetup.id) {
      throw new Error(
        'Invalid validation context. Expecting the game setup provided to match gameSetupId',
      );
    }

    if (context.gameSetup.ownerUserId !== context.user.id) {
      errors.push(`Expected user to be the game's owner`);
    }

    return errors;
  }
}
