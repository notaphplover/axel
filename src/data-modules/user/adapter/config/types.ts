// eslint-disable-next-line @typescript-eslint/typedef
export const USER_ADAPTER_TYPES = {
  api: {
    converter: {
      USER_CREATION_QUERY_API_V1_TO_USER_CREATION_QUERY_CONVERTER: Symbol(
        'UserCreationQueryApiV1ToUserCreationQueryConverter',
      ),
      USER_ROLE_TO_USER_ROLE_API_V1_CONVERTER: Symbol(
        'UserRoleToUserRoleApiV1Converter',
      ),
      USER_TOKEN_TO_USER_TOKEN_API_V1_CONVERTER: Symbol(
        'UserTokenToUserTokenApiV1Converter',
      ),
      USER_TO_USER_API_V1_CONVERTER: Symbol('UserToUserApiV1Converter'),
    },
    validator: {
      schema: {
        AUTH_CREATION_QUERY_API_V1_JOI_VALIDATOR_SCHEMA: Symbol(
          'authCreationQueryApiV1JoiValidator',
        ),
        USER_CREATION_QUERY_API_V1_JOI_VALIDATOR_SCHEMA: Symbol(
          'userCreationQueryApiV1JoiValidator',
        ),
      },
      AUTH_CREATION_QUERY_API_V1_VALIDATOR: Symbol(
        'AuthCreationQueryApiV1Validator',
      ),
      USER_CREATION_QUERY_API_V1_VALIDATOR: Symbol(
        'UserCreationQueryApiV1Validator',
      ),
    },
  },
  auth: {
    FASTIFY_USER_AUTHENTICATOR: Symbol('FastifyUserAuthenticator'),
  },
  db: {
    collection: {
      USER_COLLECTION_NAME: Symbol('UserCollectionName'),
    },
    converter: {
      USER_CREATION_QUERY_TO_USER_DBS_CONVERTER: Symbol(
        'UserCreationQueryToUserDbsConverter',
      ),
      USER_DB_TO_USER_CONVERTER: Symbol('UserDbToUserConverter'),
      USER_FIND_QUERY_TO_USER_DB_FILTER_QUERY_CONVERTER: Symbol(
        'UserFindQueryToUserDbFilterQueryConverter',
      ),
    },
    filter: {
      POST_USER_DB_SEARCH_FILTER: Symbol('PostUserDbSearchFilter'),
    },
  },
  security: {
    PASSWORD_HASHER: Symbol('PasswordHasher'),
  },
  server: {
    reqHandler: {
      POST_AUTH_USER_TOKEN_V1_REQUEST_HANDLER: Symbol(
        'PostAuthTokenV1RequestHandler',
      ),
      POST_USER_V1_REQUEST_HANDLER: Symbol('PostUserV1RequestHandler'),
    },
    router: {
      AUTH_ROUTER: Symbol('AuthRouter'),
      USER_ROUTER: Symbol('UserRouter'),
    },
  },
};

// eslint-disable-next-line @typescript-eslint/typedef
export const USER_ADAPTER_PUBLIC_TYPES = {
  auth: {
    FASTIFY_USER_AUTHENTICATOR:
      USER_ADAPTER_TYPES.auth.FASTIFY_USER_AUTHENTICATOR,
  },
  server: {
    router: {
      AUTH_ROUTER: USER_ADAPTER_TYPES.server.router.AUTH_ROUTER,
      USER_ROUTER: USER_ADAPTER_TYPES.server.router.USER_ROUTER,
    },
  },
};
