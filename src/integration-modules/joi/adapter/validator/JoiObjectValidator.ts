import { ValidationResult, Validator } from '../../../../common/domain';
import Joi from 'joi';
import { hasValue } from '../../../../common/domain/utils/hasValue';
import { injectable } from 'inversify';

@injectable()
export abstract class JoiObjectValidator<TObject>
  implements Validator<TObject> {
  constructor(private readonly joiValidatorSchema: Joi.ObjectSchema<TObject>) {}

  public validate(value: unknown): ValidationResult<TObject> {
    const joiValidationResult: Joi.ValidationResult = this.joiValidatorSchema.validate(
      value,
    );

    if (hasValue(joiValidationResult.errors)) {
      return {
        errorMessage: joiValidationResult.errors.message,
        result: false,
      };
    } else {
      return {
        model: value as TObject,
        result: true,
      };
    }
  }
}
