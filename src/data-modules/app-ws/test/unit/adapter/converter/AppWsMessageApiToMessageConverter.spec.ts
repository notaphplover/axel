import 'reflect-metadata';

import {
  Converter,
  ValidationSuccess,
  Validator,
  ValueEither,
  ValueOrErrors,
} from '../../../../../../common/domain';
import { AppWsMessage, AppWsRequestContext } from '../../../../adapter';
import { AppWsMessageApiToMessageConverter } from '../../../../adapter/converter/AppWsMessageApiToMessageConverter';

interface MessageWsApiFixture extends AppWsMessage {
  messageApiField: string;
}

interface MessageFixture {
  messageField: string;
}

interface ValidationContextFixture {
  validationContextField: string;
}

class AppWsMessageApiToMessageConverterMock extends AppWsMessageApiToMessageConverter<
  MessageWsApiFixture,
  MessageFixture,
  ValidationContextFixture
> {
  constructor(
    contextBasedValidator:
      | Validator<
          MessageWsApiFixture,
          MessageWsApiFixture,
          ValidationContextFixture
        >
      | undefined,
    messageWsApiToMessageConverter: Converter<
      MessageWsApiFixture,
      Promise<MessageFixture>,
      ValidationContextFixture
    >,
    syntaxValidator: Validator<MessageWsApiFixture, AppWsMessage>,
    private readonly validationContextMockOrErrorsGenerator: (
      messageWsApi: MessageWsApiFixture,
      requestContext: AppWsRequestContext,
    ) => ValueOrErrors<ValidationContextFixture>,
  ) {
    super(
      contextBasedValidator,
      messageWsApiToMessageConverter,
      syntaxValidator,
    );
  }

  protected async getValidationContextOrErrors(
    messageWsApi: MessageWsApiFixture,
    requestContext: AppWsRequestContext,
  ): Promise<ValueOrErrors<ValidationContextFixture>> {
    return this.validationContextMockOrErrorsGenerator(
      messageWsApi,
      requestContext,
    );
  }
}

describe(AppWsMessageApiToMessageConverter.name, () => {
  let contextBasedValidator: jest.Mocked<
    Validator<
      MessageWsApiFixture,
      MessageWsApiFixture,
      ValidationContextFixture
    >
  >;

  let messageWsApiToMessageConverter: jest.Mocked<
    Converter<
      MessageWsApiFixture,
      Promise<MessageFixture>,
      ValidationContextFixture
    >
  >;

  let syntaxValidator: jest.Mocked<
    Validator<MessageWsApiFixture, AppWsMessage>
  >;

  let validationContextMockOrErrorsGenerator: jest.Mock<
    ValueOrErrors<ValidationContextFixture>,
    [MessageWsApiFixture, AppWsRequestContext]
  >;

  let appWsMessageApiToMessageConverterMock: AppWsMessageApiToMessageConverterMock;

  beforeAll(() => {
    contextBasedValidator = {
      validate: jest.fn(),
    };

    messageWsApiToMessageConverter = {
      transform: jest.fn(),
    };

    syntaxValidator = {
      validate: jest.fn(),
    };

    validationContextMockOrErrorsGenerator = jest.fn<
      ValueOrErrors<ValidationContextFixture>,
      [MessageWsApiFixture, AppWsRequestContext]
    >();

    appWsMessageApiToMessageConverterMock = new AppWsMessageApiToMessageConverterMock(
      contextBasedValidator,
      messageWsApiToMessageConverter,
      syntaxValidator,
      validationContextMockOrErrorsGenerator,
    );
  });

  describe('.transform()', () => {
    let validationContextFixture: ValidationContextFixture;
    let messageFixture: MessageFixture;
    let messageWsApiFixture: MessageWsApiFixture;
    let requestContextFixture: AppWsRequestContext;

    let messageWsApiValidationSuccessFixture: ValidationSuccess<MessageWsApiFixture>;

    let messageValue: ValueEither<MessageFixture>;
    let validationContextValue: ValueEither<ValidationContextFixture>;

    beforeAll(() => {
      validationContextFixture = {
        validationContextField: 'validationContextFieldValue',
      };
      messageFixture = {
        messageField: 'messageFieldValue',
      };
      messageWsApiFixture = {
        messageApiField: 'messageApiFieldValue',
        type: 'sample-type',
      };
      requestContextFixture = ({} as Partial<AppWsRequestContext>) as AppWsRequestContext;

      messageWsApiValidationSuccessFixture = {
        model: messageWsApiFixture,
        result: true,
      };

      messageValue = {
        isEither: false,
        value: messageFixture,
      };
      validationContextValue = {
        isEither: false,
        value: validationContextFixture,
      };
    });

    describe('.when called', () => {
      let result: unknown;

      beforeAll(async () => {
        syntaxValidator.validate.mockReturnValueOnce(
          messageWsApiValidationSuccessFixture,
        );

        validationContextMockOrErrorsGenerator.mockReturnValueOnce(
          validationContextValue,
        );

        contextBasedValidator.validate.mockReturnValueOnce(
          messageWsApiValidationSuccessFixture,
        );

        messageWsApiToMessageConverter.transform.mockResolvedValueOnce(
          messageFixture,
        );

        result = await appWsMessageApiToMessageConverterMock.transform(
          messageWsApiFixture,
          requestContextFixture,
        );
      });

      afterAll(() => {
        syntaxValidator.validate.mockClear();
        validationContextMockOrErrorsGenerator.mockClear();
        contextBasedValidator.validate.mockClear();
        messageWsApiToMessageConverter.transform.mockClear();
      });

      it('must call syntaxValidator.validate()', () => {
        expect(syntaxValidator.validate).toHaveBeenCalledTimes(1);
        expect(syntaxValidator.validate).toHaveBeenCalledWith(
          messageWsApiFixture,
        );
      });

      it('must call getValidationContextOrErrors', () => {
        expect(validationContextMockOrErrorsGenerator).toHaveBeenCalledTimes(1);
        expect(validationContextMockOrErrorsGenerator).toHaveBeenCalledWith(
          messageWsApiFixture,
          requestContextFixture,
        );
      });

      it('must call contextBasedValidator.validate()', () => {
        expect(contextBasedValidator.validate).toHaveBeenCalledTimes(1);
        expect(contextBasedValidator.validate).toHaveBeenCalledWith(
          messageWsApiFixture,
          validationContextFixture,
        );
      });

      it('must call messageWsApiToMessageConverter.transform()', () => {
        expect(messageWsApiToMessageConverter.transform).toHaveBeenCalledTimes(
          1,
        );
        expect(messageWsApiToMessageConverter.transform).toHaveBeenCalledWith(
          messageWsApiFixture,
          validationContextFixture,
        );
      });

      it('must return message data', () => {
        expect(result).toStrictEqual(messageValue);
      });
    });
  });
});
