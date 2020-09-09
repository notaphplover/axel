import 'reflect-metadata';
import Ajv, { ErrorObject } from 'ajv';
import {
  ValidationFail,
  ValidationSuccess,
} from '../../../../../common/domain/validator/ValidationResult';
import { JsonSchemaValidator } from '../../../../adapter';

interface TypeMock {
  foo: string;
}

class JsonSchemaValidatorMock extends JsonSchemaValidator<TypeMock> {}

describe(JsonSchemaValidator.name, () => {
  let ajv: Ajv.Ajv;
  let jsonSchemaFixture: Record<string, unknown>;

  beforeAll(() => {
    ajv = ({
      compile: jest.fn(),
    } as Partial<Ajv.Ajv>) as Ajv.Ajv;
    jsonSchemaFixture = {};
  });

  describe(`.${JsonSchemaValidator.prototype.validate.name}()`, () => {
    let modelFixture: TypeMock;

    beforeAll(() => {
      modelFixture = { foo: 'bar' };
    });

    describe('when called, and value is valid', () => {
      let validatorFixture: () => boolean;
      let jsonSchemaValidator: JsonSchemaValidator<TypeMock>;

      let result: unknown;

      beforeAll(() => {
        validatorFixture = jest.fn().mockReturnValue(true);
        (ajv.compile as jest.Mock<Ajv.ValidateFunction>).mockReturnValueOnce(
          validatorFixture,
        );
        jsonSchemaValidator = new JsonSchemaValidatorMock(
          ajv,
          jsonSchemaFixture,
        );

        result = jsonSchemaValidator.validate(modelFixture);
      });

      it('must call validator', () => {
        expect(validatorFixture).toHaveBeenCalledTimes(1);
        expect(validatorFixture).toHaveBeenCalledWith(modelFixture);
      });

      it('must return a ValidationSuccess', () => {
        const expected: ValidationSuccess<TypeMock> = {
          model: modelFixture,
          result: true,
        };
        expect(result).toStrictEqual(expected);
      });
    });

    describe('when called, and value is not valid', () => {
      let validatorFixture: Ajv.ValidateFunction;
      let jsonSchemaValidator: JsonSchemaValidator<TypeMock>;

      let result: unknown;

      beforeAll(() => {
        validatorFixture = jest.fn().mockReturnValue(false);
        validatorFixture.errors = [
          ({ message: 'test message 1' } as Partial<
            ErrorObject
          >) as ErrorObject,
          ({ message: 'test message 2' } as Partial<
            ErrorObject
          >) as ErrorObject,
        ];
        (ajv.compile as jest.Mock<Ajv.ValidateFunction>).mockReturnValueOnce(
          validatorFixture,
        );
        jsonSchemaValidator = new JsonSchemaValidatorMock(
          ajv,
          jsonSchemaFixture,
        );

        result = jsonSchemaValidator.validate(modelFixture);
      });

      it('must return a ValidationFail', () => {
        const expected: ValidationFail = {
          errorMessage: 'test message 1\ntest message 2',
          result: false,
        };
        expect(result).toStrictEqual(expected);
      });
    });
  });
});
