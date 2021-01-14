import {
  Converter,
  ValidationResult,
  ValidationSuccess,
  Validator,
} from '../../../../../common/domain';
import { injectable, unmanaged } from 'inversify';

@injectable()
export abstract class RequestToQueryConverter<
  TRequest,
  TQuery,
  TQueryApi,
  TContext = void
> implements Converter<TRequest, Promise<ValidationResult<TQuery>>, TContext> {
  constructor(
    @unmanaged()
    private readonly contextBasedValidator:
      | Validator<TQueryApi, TQueryApi, TContext>
      | undefined,
    @unmanaged()
    private readonly queryApiToQueryConverter: Converter<
      TQueryApi,
      Promise<TQuery>,
      TContext
    >,
    @unmanaged()
    private readonly syntaxValidator: Validator<TQueryApi>,
  ) {}

  public async transform(request: TRequest): Promise<ValidationResult<TQuery>> {
    const requestQuery: unknown = this.extractRequestQuery(request);

    const syntaxValidationResult: ValidationResult<TQueryApi> = this.syntaxValidator.validate(
      requestQuery,
    );

    if (!syntaxValidationResult.result) {
      return syntaxValidationResult;
    }

    const queryApi: TQueryApi = syntaxValidationResult.model;

    const contextValidationResult: ValidationResult<TContext> = await this.getContextAndValidateIt(
      request,
      queryApi,
    );

    if (!contextValidationResult.result) {
      return contextValidationResult;
    }

    const context: TContext = contextValidationResult.model;

    if (this.contextBasedValidator !== undefined) {
      const semanticValidationResult: ValidationResult<TQueryApi> = this.contextBasedValidator.validate(
        queryApi,
        context,
      );

      if (!semanticValidationResult.result) {
        return semanticValidationResult;
      }
    }

    const query: TQuery = await this.queryApiToQueryConverter.transform(
      queryApi,
      context,
    );

    const validationSuccess: ValidationSuccess<TQuery> = {
      model: query,
      result: true,
    };

    return validationSuccess;
  }

  protected abstract extractRequestQuery(request: TRequest): unknown;

  protected abstract getContextAndValidateIt(
    request: TRequest,
    queryApi: TQueryApi,
  ): Promise<ValidationResult<TContext>>;
}
