import { injectable, unmanaged } from 'inversify';

import {
  Converter,
  ValidationResult,
  Validator,
  ValueOrErrors,
} from '../../../../common/domain';
import { AppWsRequestContext } from '../model/AppWsRequestContext';
import { QueryWsApi } from '../model/QueryWsApi';

@injectable()
export abstract class QueryWsApiToQueryConverter<
  TQueryWsApi,
  TMessage,
  TValidationContext = void
> implements
    Converter<
      QueryWsApi,
      Promise<ValueOrErrors<TMessage>>,
      AppWsRequestContext
    > {
  constructor(
    @unmanaged()
    private readonly contextBasedValidator:
      | Validator<TQueryWsApi, TQueryWsApi, TValidationContext>
      | undefined,
    @unmanaged()
    private readonly messageWsApiToMessageConverter: Converter<
      TQueryWsApi,
      Promise<TMessage>,
      TValidationContext
    >,
    @unmanaged()
    private readonly syntaxValidator: Validator<TQueryWsApi, QueryWsApi>,
  ) {}

  public async transform(
    queryWsApi: QueryWsApi,
    requestContext: AppWsRequestContext,
  ): Promise<ValueOrErrors<TMessage>> {
    const syntaxValidationResult: ValidationResult<TQueryWsApi> = this.syntaxValidator.validate(
      queryWsApi,
    );

    if (!syntaxValidationResult.result) {
      const validationError: ValueOrErrors<TMessage> = {
        isEither: true,
        value: [syntaxValidationResult.errorMessage],
      };

      return validationError;
    }

    const messageWsApi: TQueryWsApi = syntaxValidationResult.model;

    const validationContextOrErrors: ValueOrErrors<TValidationContext> = await this.getValidationContextOrErrors(
      messageWsApi,
      requestContext,
    );

    if (validationContextOrErrors.isEither) {
      return validationContextOrErrors;
    }

    const validationContext: TValidationContext =
      validationContextOrErrors.value;

    if (this.contextBasedValidator !== undefined) {
      const semanticValidationResult: ValidationResult<TQueryWsApi> = this.contextBasedValidator.validate(
        messageWsApi,
        validationContext,
      );

      if (!semanticValidationResult.result) {
        const validationError: ValueOrErrors<TMessage> = {
          isEither: true,
          value: [semanticValidationResult.errorMessage],
        };

        return validationError;
      }
    }

    const message: TMessage = await this.messageWsApiToMessageConverter.transform(
      messageWsApi,
      validationContext,
    );

    const messageOrErrors: ValueOrErrors<TMessage> = {
      isEither: false,
      value: message,
    };

    return messageOrErrors;
  }

  protected abstract getValidationContextOrErrors(
    messageWsApi: TQueryWsApi,
    requestContext: AppWsRequestContext,
  ): Promise<ValueOrErrors<TValidationContext>>;
}
