import { injectable, unmanaged } from 'inversify';

import {
  Converter,
  ValidationResult,
  Validator,
  ValueOrErrors,
} from '../../../../common/domain';
import { AppWsMessage } from '../model/AppWsMessage';
import { AppWsRequestContext } from '../model/AppWsRequestContext';

@injectable()
export abstract class AppWsMessageApiToMessageConverter<
  TMessageWsApi,
  TMessage,
  TValidationContext = void
> implements
    Converter<
      AppWsMessage,
      Promise<ValueOrErrors<TMessage>>,
      AppWsRequestContext
    > {
  constructor(
    @unmanaged()
    private readonly contextBasedValidator:
      | Validator<TMessageWsApi, TMessageWsApi, TValidationContext>
      | undefined,
    @unmanaged()
    private readonly messageWsApiToMessageConverter: Converter<
      TMessageWsApi,
      Promise<TMessage>,
      TValidationContext
    >,
    @unmanaged()
    private readonly syntaxValidator: Validator<TMessageWsApi, AppWsMessage>,
  ) {}

  public async transform(
    appWsMessage: AppWsMessage,
    requestContext: AppWsRequestContext,
  ): Promise<ValueOrErrors<TMessage>> {
    const syntaxValidationResult: ValidationResult<TMessageWsApi> = this.syntaxValidator.validate(
      appWsMessage,
    );

    if (!syntaxValidationResult.result) {
      const validationError: ValueOrErrors<TMessage> = {
        isEither: true,
        value: [syntaxValidationResult.errorMessage],
      };

      return validationError;
    }

    const messageWsApi: TMessageWsApi = syntaxValidationResult.model;

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
      const semanticValidationResult: ValidationResult<TMessageWsApi> = this.contextBasedValidator.validate(
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
    messageWsApi: TMessageWsApi,
    requestContext: AppWsRequestContext,
  ): Promise<ValueOrErrors<TValidationContext>>;
}
