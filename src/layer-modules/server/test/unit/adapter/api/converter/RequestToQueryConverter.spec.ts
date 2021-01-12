/* eslint-disable @typescript-eslint/unbound-method */
import 'reflect-metadata';
import {
  Converter,
  ValidationFail,
  ValidationSuccess,
  Validator,
} from '../../../../../../../common/domain';
import { RequestToQueryConverter } from '../../../../../adapter/api/converter/RequestToQueryConverter';

interface RequestMock {
  body: {
    foo: string;
  };
}

interface QueryMock {
  foo: string;
}

interface QueryApiMock {
  foo: string;
}

interface ContextMock {
  bar: string;
}

class RequestToQueryConverterMock extends RequestToQueryConverter<
  RequestMock,
  QueryMock,
  QueryApiMock,
  ContextMock
> {
  constructor(
    contextBasedValidator:
      | Validator<QueryApiMock, QueryApiMock, ContextMock>
      | undefined,
    queryApiToQueryConverter: Converter<
      QueryApiMock,
      Promise<QueryMock>,
      ContextMock
    >,
    syntaxValidator: Validator<QueryApiMock>,
    public readonly getContextMock: jest.Mock,
  ) {
    super(contextBasedValidator, queryApiToQueryConverter, syntaxValidator);
  }

  protected extractRequestQuery(request: RequestMock): unknown {
    return { ...request.body };
  }
  protected async getContext(
    request: RequestMock,
    queryApi: QueryApiMock,
  ): Promise<ContextMock> {
    return this.getContextMock(request, queryApi) as Promise<ContextMock>;
  }
}

describe(RequestToQueryConverter.name, () => {
  let contextBasedValidator: Validator<QueryApiMock, QueryApiMock, ContextMock>;

  let queryApiToQueryConverter: Converter<
    QueryApiMock,
    Promise<QueryMock>,
    ContextMock
  >;

  let syntaxValidator: Validator<QueryApiMock>;

  let requestToQueryConverter: RequestToQueryConverterMock;

  beforeAll(() => {
    contextBasedValidator = {
      validate: jest.fn(),
    };

    queryApiToQueryConverter = {
      transform: jest.fn(),
    };

    syntaxValidator = {
      validate: jest.fn(),
    };

    requestToQueryConverter = new RequestToQueryConverterMock(
      contextBasedValidator,
      queryApiToQueryConverter,
      syntaxValidator,
      jest.fn(),
    );
  });

  describe('.transform()', () => {
    let contextFixture: ContextMock;
    let queryFixture: QueryMock;
    let queryApiFixture: QueryApiMock;

    let requestFixture: RequestMock;

    let queryApiValidationSuccess: ValidationSuccess<QueryApiMock>;
    let queryValidationSuccessFixture: ValidationSuccess<QueryMock>;

    beforeAll(() => {
      contextFixture = {
        bar: 'bar',
      };

      queryFixture = {
        foo: 'foo',
      };

      queryApiFixture = {
        foo: queryFixture.foo,
      };

      requestFixture = {
        body: { ...queryApiFixture },
      };

      queryApiValidationSuccess = {
        model: { ...queryApiFixture },
        result: true,
      };

      queryValidationSuccessFixture = {
        model: { ...queryFixture },
        result: true,
      };
    });

    describe('.when called', () => {
      let result: unknown;

      beforeAll(async () => {
        (contextBasedValidator.validate as jest.Mock).mockReturnValueOnce(
          queryApiValidationSuccess,
        );

        (queryApiToQueryConverter.transform as jest.Mock).mockReturnValueOnce(
          queryFixture,
        );

        (syntaxValidator.validate as jest.Mock).mockReturnValueOnce(
          queryApiValidationSuccess,
        );

        requestToQueryConverter.getContextMock.mockResolvedValueOnce(
          contextFixture,
        );

        result = await requestToQueryConverter.transform(requestFixture);
      });

      afterAll(() => {
        (contextBasedValidator.validate as jest.Mock).mockClear();
        (queryApiToQueryConverter.transform as jest.Mock).mockClear();
        (syntaxValidator.validate as jest.Mock).mockClear();
        requestToQueryConverter.getContextMock.mockClear();
      });

      it('must call syntaxValidator.validate', () => {
        expect(syntaxValidator.validate).toHaveBeenCalledTimes(1);
        expect(syntaxValidator.validate).toHaveBeenCalledWith(queryApiFixture);
      });

      it('must call contextBasedValidator.validate', () => {
        expect(contextBasedValidator.validate).toHaveBeenCalledTimes(1);
        expect(contextBasedValidator.validate).toHaveBeenCalledWith(
          queryApiFixture,
          contextFixture,
        );
      });

      it('must call queryApiToQueryConverter.transform', () => {
        expect(queryApiToQueryConverter.transform).toHaveBeenCalledTimes(1);
        expect(queryApiToQueryConverter.transform).toHaveBeenCalledWith(
          queryApiFixture,
          contextFixture,
        );
      });

      it('must return a validation success', () => {
        expect(result).toStrictEqual(queryValidationSuccessFixture);
      });
    });

    describe('when called, and a syntax error is found', () => {
      let queryValidationFailFixture: ValidationFail;

      let result: unknown;

      beforeAll(async () => {
        queryValidationFailFixture = {
          errorMessage:
            'Test RequestToQueryConverter.transform when a syntax error is found',
          result: false,
        };

        (syntaxValidator.validate as jest.Mock).mockReturnValueOnce(
          queryValidationFailFixture,
        );

        requestToQueryConverter.getContextMock.mockResolvedValueOnce(
          contextFixture,
        );

        result = await requestToQueryConverter.transform(requestFixture);
      });

      afterAll(() => {
        (syntaxValidator.validate as jest.Mock).mockClear();
        requestToQueryConverter.getContextMock.mockClear();
      });

      it('must not call contextBasedValidator.validate', () => {
        expect(contextBasedValidator.validate).not.toHaveBeenCalled();
      });

      it('must not call queryApiToQueryConverter.transform', () => {
        expect(queryApiToQueryConverter.transform).not.toHaveBeenCalled();
      });

      it('must return a validation failure', () => {
        expect(result).toStrictEqual(queryValidationFailFixture);
      });
    });

    describe('when called, and a semantic error is found', () => {
      let queryValidationFailFixture: ValidationFail;

      let result: unknown;

      beforeAll(async () => {
        queryValidationFailFixture = {
          errorMessage:
            'Test RequestToQueryConverter.transform when a semantic error is found',
          result: false,
        };

        (contextBasedValidator.validate as jest.Mock).mockReturnValueOnce(
          queryValidationFailFixture,
        );

        (syntaxValidator.validate as jest.Mock).mockReturnValueOnce(
          queryApiValidationSuccess,
        );

        requestToQueryConverter.getContextMock.mockResolvedValueOnce(
          contextFixture,
        );

        result = await requestToQueryConverter.transform(requestFixture);
      });

      afterAll(() => {
        (contextBasedValidator.validate as jest.Mock).mockClear();
        (syntaxValidator.validate as jest.Mock).mockClear();
        requestToQueryConverter.getContextMock.mockClear();
      });

      it('must not call queryApiToQueryConverter.transform', () => {
        expect(queryApiToQueryConverter.transform).not.toHaveBeenCalled();
      });

      it('must return a validation failure', () => {
        expect(result).toStrictEqual(queryValidationFailFixture);
      });
    });
  });
});
