import {
  ContextBasedValidator,
  ValidationResult,
  Validator,
} from '../../../../../../common/domain';
import { inject, injectable } from 'inversify';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { LiveGameCreationQueryApiV1 } from '../../query/live/LiveGameCreationQueryApiV1';
import { LiveGameCreationQueryApiV1ValidationContext } from './LiveGameCreationQueryApiV1ValidationContext';

@injectable()
export class LiveGameCreationQueryApiV1ContextBasedValidator
  implements
    ContextBasedValidator<
      LiveGameCreationQueryApiV1,
      LiveGameCreationQueryApiV1ValidationContext
    > {
  constructor(
    @inject(
      GAME_ADAPTER_TYPES.api.validator.live
        .LIVE_GAME_CREATION_QUERY_API_V1_VALIDATOR,
    )
    private readonly liveGameCreationQueryApiV1Validator: Validator<LiveGameCreationQueryApiV1>,
  ) {}

  public validate(
    value: unknown,
    context: LiveGameCreationQueryApiV1ValidationContext,
  ): ValidationResult<LiveGameCreationQueryApiV1> {
    const validationResult: ValidationResult<LiveGameCreationQueryApiV1> = this.liveGameCreationQueryApiV1Validator.validate(
      value,
    );

    if (validationResult.result) {
      return this.validateLiveGameCreationQueryApiV1(
        validationResult.model,
        context,
      );
    } else {
      return validationResult;
    }
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
