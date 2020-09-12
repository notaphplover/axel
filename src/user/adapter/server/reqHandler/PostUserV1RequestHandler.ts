import {
  Converter,
  Interactor,
  ValidationResult,
  Validator,
} from '../../../../common/domain';
import { FastifyReply, FastifyRequest } from 'fastify';
import { inject, injectable } from 'inversify';
import { FastifyRequestHandler } from '../../../../layer-modules/server/adapter';
import { StatusCodes } from 'http-status-codes';
import { USER_ADAPTER_TYPES } from '../../config/types';
import { USER_DOMAIN_TYPES } from '../../../domain/config/types';
import { User } from '../../../domain/model/User';
import { UserApiV1 } from '../../api/model/UserApiV1';
import { UserCreationQuery } from '../../../domain/query/UserCreationQuery';
import { UserCreationQueryApiV1 } from '../../api/query/UserCreationQueryApiV1';
import { UserRole } from '../../../domain/model/UserRole';

@injectable()
export class PostUserV1RequestHandler implements FastifyRequestHandler {
  constructor(
    @inject(USER_DOMAIN_TYPES.interactor.CREATE_USERS_INTERACTOR)
    private readonly createUsersInteractor: Interactor<
      UserCreationQuery,
      Promise<User[]>
    >,
    @inject(
      USER_ADAPTER_TYPES.api.validator.USER_CREATION_QUERY_API_V1_VALIDATOR,
    )
    private readonly userCreationQueryApiV1Validator: Validator<
      UserCreationQueryApiV1
    >,
    @inject(USER_ADAPTER_TYPES.api.converter.USER_TO_USER_API_V1_CONVERTER)
    private readonly userToUserApiV1Converter: Converter<User, UserApiV1>,
  ) {}

  public async handle(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<void> {
    const validationResult: ValidationResult<UserCreationQueryApiV1> = this.userCreationQueryApiV1Validator.validate(
      request.body,
    );
    if (validationResult.result) {
      const userCreationQuery: UserCreationQuery = {
        email: validationResult.model.email,
        roles: [UserRole.CLIENT],
        password: validationResult.model.password,
        username: validationResult.model.username,
      };
      const [userCreated]: User[] = await this.createUsersInteractor.interact(
        userCreationQuery,
      );

      const userApiV1Created: UserApiV1 = this.userToUserApiV1Converter.transform(
        userCreated,
      );

      await reply.send(userApiV1Created);
    } else {
      await reply
        .code(StatusCodes.BAD_REQUEST)
        .send(validationResult.errorMessage);
    }
  }
}
