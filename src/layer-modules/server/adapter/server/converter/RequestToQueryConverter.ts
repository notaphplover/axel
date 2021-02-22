import { injectable, unmanaged } from 'inversify';

import {
  Converter,
  ValidationResult,
  Validator,
} from '../../../../../common/domain';
import { ValueOrErrors } from '../../../../../common/domain/either/ValueOrErrors';

@injectable()
export abstract class RequestToQueryConverter<
  TRequest,
  TQuery,
  TQueryApi,
  TContext = void
> implements Converter<TRequest, Promise<ValueOrErrors<TQuery>>> {
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

  public async transform(request: TRequest): Promise<ValueOrErrors<TQuery>> {
    const requestQuery: unknown = this.extractRequestQuery(request);

    const syntaxValidationResult: ValidationResult<TQueryApi> = this.syntaxValidator.validate(
      requestQuery,
    );

    if (!syntaxValidationResult.result) {
      const validationError: ValueOrErrors<TQuery> = {
        isEither: true,
        value: [syntaxValidationResult.errorMessage],
      };

      return validationError;
    }

    const queryApi: TQueryApi = syntaxValidationResult.model;

    const contextOrErrors: ValueOrErrors<TContext> = await this.getContextOrErrors(
      request,
      queryApi,
    );

    if (contextOrErrors.isEither) {
      return contextOrErrors;
    }

    const context: TContext = contextOrErrors.value;

    if (this.contextBasedValidator !== undefined) {
      const semanticValidationResult: ValidationResult<TQueryApi> = this.contextBasedValidator.validate(
        queryApi,
        context,
      );

      if (!semanticValidationResult.result) {
        const validationError: ValueOrErrors<TQuery> = {
          isEither: true,
          value: [semanticValidationResult.errorMessage],
        };

        return validationError;
      }
    }

    const query: TQuery = await this.queryApiToQueryConverter.transform(
      queryApi,
      context,
    );

    const queryOrErrors: ValueOrErrors<TQuery> = {
      isEither: false,
      value: query,
    };

    return queryOrErrors;
  }

  protected abstract extractRequestQuery(request: TRequest): unknown;

  protected abstract getContextOrErrors(
    request: TRequest,
    queryApi: TQueryApi,
  ): Promise<ValueOrErrors<TContext>>;
}
