import { ValidationResult, Validator } from '../../../../../../common/domain';
import { LiveGameCreationQueryApiV1 } from '../../query/live/LiveGameCreationQueryApiV1';
import { LiveGameCreationQueryApiV1ValidationContext } from './LiveGameCreationQueryApiV1ValidationContext';
import { injectable } from 'inversify';

@injectable()
export class LiveGameCreationQueryApiV1SemanticValidator
  implements
    Validator<
      LiveGameCreationQueryApiV1,
      LiveGameCreationQueryApiV1,
      LiveGameCreationQueryApiV1ValidationContext
    > {
  public validate(
    value: LiveGameCreationQueryApiV1,
    context: LiveGameCreationQueryApiV1ValidationContext,
  ): ValidationResult<LiveGameCreationQueryApiV1> {
    return this.validateLiveGameCreationQueryApiV1(value, context);
  }

  private validateLiveGameCreationQueryApiV1(
    liveGameCreationQueryApiV1: LiveGameCreationQueryApiV1,
    context: LiveGameCreationQueryApiV1ValidationContext,
  ): ValidationResult<LiveGameCreationQueryApiV1> {
    const errors: string[] = [];

    if (liveGameCreationQueryApiV1.gameSetupIdId !== context.gameSetup.id) {
      throw new Error(
        'Invalid validation context. Expecting the game setup provided to match gameSetupId',
      );
    }

    if (context.gameSetup.ownerUserId !== context.user.id) {
      errors.push(`Expected user to be the game's owner`);
    }

    if (errors.length === 0) {
      return {
        model: liveGameCreationQueryApiV1,
        result: true,
      };
    } else {
      return {
        errorMessage: errors.join('\n'),
        result: false,
      };
    }
  }
}
