import {
  Converter,
  Interactor,
  ValidationResult,
  Validator,
} from '../../../../../common/domain';
import { FastifyReply, FastifyRequest } from 'fastify';
import { inject, injectable } from 'inversify';
import { AuthCreationQueryApiV1 } from '../../api/query/AuthCreationQueryApiV1';
import { FastifyRequestHandler } from '../../../../../layer-modules/server/adapter';
import { StatusCodes } from 'http-status-codes';
import { USER_ADAPTER_TYPES } from '../../config/types';
import { USER_DOMAIN_TYPES } from '../../../domain/config/types';
import { User } from '../../../domain/model/User';
import { UserFindQuery } from '../../../domain/query/UserFindQuery';
import { UserToken } from '../../../domain/model/UserToken';
import { UserTokenApiV1 } from '../../api/model/UserTokenApiV1';

@injectable()
export class PostAuthTokenV1RequestHandler implements FastifyRequestHandler {
  constructor(
    @inject(
      USER_ADAPTER_TYPES.api.validator.AUTH_CREATION_QUERY_API_V1_VALIDATOR,
    )
    private readonly authCreationQueryApiV1Validator: Validator<
      AuthCreationQueryApiV1
    >,
    @inject(USER_DOMAIN_TYPES.interactor.FIND_USER_INTERACTOR)
    private readonly findUserInteractor: Interactor<
      UserFindQuery,
      Promise<User | null>
    >,
    @inject(USER_DOMAIN_TYPES.interactor.CREATE_USER_TOKEN_INTERACTOR)
    private readonly createUserTokenInteractor: Interactor<
      User,
      Promise<UserToken>
    >,
    @inject(
      USER_ADAPTER_TYPES.api.converter
        .USER_TOKEN_TO_USER_TOKEN_API_V1_CONVERTER,
    )
    private readonly userTokenToUserTokenApiV1Converter: Converter<
      UserToken,
      UserTokenApiV1
    >,
  ) {}

  public async handle(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<void> {
    const validationResult: ValidationResult<AuthCreationQueryApiV1> = this.authCreationQueryApiV1Validator.validate(
      request.body,
    );
    if (validationResult.result) {
      const userFindQuery: UserFindQuery = {
        password: validationResult.model.password,
        username: validationResult.model.username,
      };

      const userFound: User | null = await this.findUserInteractor.interact(
        userFindQuery,
      );

      if (userFound === null) {
        await reply
          .code(StatusCodes.UNAUTHORIZED)
          .send({ message: 'Invalid credentials' });
        return;
      }

      const userToken: UserToken = await this.createUserTokenInteractor.interact(
        userFound,
      );

      const userTokenApiV1: UserTokenApiV1 = this.userTokenToUserTokenApiV1Converter.transform(
        userToken,
      );

      await reply.send(userTokenApiV1);
    } else {
      await reply
        .code(StatusCodes.BAD_REQUEST)
        .send({ message: validationResult.errorMessage });
    }
  }
}
