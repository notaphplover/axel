import 'reflect-metadata';

import {
  Converter,
  ValidationSuccess,
  Validator,
  ValueEither,
  ValueOrErrors,
} from '../../../../../../common/domain';
import { AppWsRequestContext, QueryWsApi } from '../../../../adapter';
import { QueryWsApiToQueryConverter } from '../../../../adapter/converter/QueryWsApiToQueryConverter';

interface QueryWsApiFixture extends QueryWsApi {
  queryApiField: string;
}

interface QueryFixture {
  queryField: string;
}

interface ValidationContextFixture {
  validationContextField: string;
}

class QueryWsApiToQueryConverterMock extends QueryWsApiToQueryConverter<
  QueryWsApiFixture,
  QueryFixture,
  ValidationContextFixture
> {
  constructor(
    contextBasedValidator:
      | Validator<
          QueryWsApiFixture,
          QueryWsApiFixture,
          ValidationContextFixture
        >
      | undefined,
    queryWsApiToQueryConverter: Converter<
      QueryWsApiFixture,
      Promise<QueryFixture>,
      ValidationContextFixture
    >,
    syntaxValidator: Validator<QueryWsApiFixture, QueryWsApi>,
    private readonly validationContextMockOrErrorsGenerator: (
      queryWsApi: QueryWsApiFixture,
      requestContext: AppWsRequestContext,
    ) => ValueOrErrors<ValidationContextFixture>,
  ) {
    super(contextBasedValidator, queryWsApiToQueryConverter, syntaxValidator);
  }

  protected async getValidationContextOrErrors(
    queryWsApi: QueryWsApiFixture,
    requestContext: AppWsRequestContext,
  ): Promise<ValueOrErrors<ValidationContextFixture>> {
    return this.validationContextMockOrErrorsGenerator(
      queryWsApi,
      requestContext,
    );
  }
}

describe(QueryWsApiToQueryConverter.name, () => {
  let contextBasedValidator: jest.Mocked<
    Validator<QueryWsApiFixture, QueryWsApiFixture, ValidationContextFixture>
  >;

  let queryWsApiToQueryConverter: jest.Mocked<
    Converter<
      QueryWsApiFixture,
      Promise<QueryFixture>,
      ValidationContextFixture
    >
  >;

  let syntaxValidator: jest.Mocked<Validator<QueryWsApiFixture, QueryWsApi>>;

  let validationContextMockOrErrorsGenerator: jest.Mock<
    ValueOrErrors<ValidationContextFixture>,
    [QueryWsApiFixture, AppWsRequestContext]
  >;

  let queryWsApiToQueryConverterMock: QueryWsApiToQueryConverterMock;

  beforeAll(() => {
    contextBasedValidator = {
      validate: jest.fn(),
    };

    queryWsApiToQueryConverter = {
      transform: jest.fn(),
    };

    syntaxValidator = {
      validate: jest.fn(),
    };

    validationContextMockOrErrorsGenerator =
      jest.fn<
        ValueOrErrors<ValidationContextFixture>,
        [QueryWsApiFixture, AppWsRequestContext]
      >();

    queryWsApiToQueryConverterMock = new QueryWsApiToQueryConverterMock(
      contextBasedValidator,
      queryWsApiToQueryConverter,
      syntaxValidator,
      validationContextMockOrErrorsGenerator,
    );
  });

  describe('.transform()', () => {
    let validationContextFixture: ValidationContextFixture;
    let queryFixture: QueryFixture;
    let queryWsApiFixture: QueryWsApiFixture;
    let requestContextFixture: AppWsRequestContext;

    let queryWsApiValidationSuccessFixture: ValidationSuccess<QueryWsApiFixture>;

    let queryValue: ValueEither<QueryFixture>;
    let validationContextValue: ValueEither<ValidationContextFixture>;

    beforeAll(() => {
      validationContextFixture = {
        validationContextField: 'validationContextFieldValue',
      };
      queryFixture = {
        queryField: 'queryFieldValue',
      };
      queryWsApiFixture = {
        id: 'sample-id',
        queryApiField: 'queryApiFieldValue',
        type: 'sample-type',
      };
      requestContextFixture =
        {} as Partial<AppWsRequestContext> as AppWsRequestContext;

      queryWsApiValidationSuccessFixture = {
        model: queryWsApiFixture,
        result: true,
      };

      queryValue = {
        isEither: false,
        value: queryFixture,
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
          queryWsApiValidationSuccessFixture,
        );

        validationContextMockOrErrorsGenerator.mockReturnValueOnce(
          validationContextValue,
        );

        contextBasedValidator.validate.mockReturnValueOnce(
          queryWsApiValidationSuccessFixture,
        );

        queryWsApiToQueryConverter.transform.mockResolvedValueOnce(
          queryFixture,
        );

        result = await queryWsApiToQueryConverterMock.transform(
          queryWsApiFixture,
          requestContextFixture,
        );
      });

      afterAll(() => {
        syntaxValidator.validate.mockClear();
        validationContextMockOrErrorsGenerator.mockClear();
        contextBasedValidator.validate.mockClear();
        queryWsApiToQueryConverter.transform.mockClear();
      });

      it('must call syntaxValidator.validate()', () => {
        expect(syntaxValidator.validate).toHaveBeenCalledTimes(1);
        expect(syntaxValidator.validate).toHaveBeenCalledWith(
          queryWsApiFixture,
        );
      });

      it('must call getValidationContextOrErrors', () => {
        expect(validationContextMockOrErrorsGenerator).toHaveBeenCalledTimes(1);
        expect(validationContextMockOrErrorsGenerator).toHaveBeenCalledWith(
          queryWsApiFixture,
          requestContextFixture,
        );
      });

      it('must call contextBasedValidator.validate()', () => {
        expect(contextBasedValidator.validate).toHaveBeenCalledTimes(1);
        expect(contextBasedValidator.validate).toHaveBeenCalledWith(
          queryWsApiFixture,
          validationContextFixture,
        );
      });

      it('must call queryWsApiToQueryConverter.transform()', () => {
        expect(queryWsApiToQueryConverter.transform).toHaveBeenCalledTimes(1);
        expect(queryWsApiToQueryConverter.transform).toHaveBeenCalledWith(
          queryWsApiFixture,
          validationContextFixture,
        );
      });

      it('must return query data', () => {
        expect(result).toStrictEqual(queryValue);
      });
    });
  });
});
