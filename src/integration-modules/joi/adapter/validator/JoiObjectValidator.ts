import { injectable } from 'inversify';
import Joi from 'joi';

import {
  commonDomain,
  ValidationResult,
  Validator,
} from '../../../../common/domain';

const hasValue: <TType>(
  value: TType,
) => value is Exclude<TType, null | undefined> = commonDomain.utils.hasValue;

@injectable()
export abstract class JoiObjectValidator<TObject>
  implements Validator<TObject> {
  constructor(private readonly joiValidatorSchema: Joi.AnySchema) {}

  public validate(value: unknown): ValidationResult<TObject> {
    const joiValidationResult: Joi.ValidationResult = this.joiValidatorSchema.validate(
      value,
    );

    if (hasValue(joiValidationResult.error)) {
      return {
        errorMessage: joiValidationResult.error.message,
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
