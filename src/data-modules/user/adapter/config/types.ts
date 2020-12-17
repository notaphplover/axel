// eslint-disable-next-line @typescript-eslint/typedef
export const USER_ADAPTER_TYPES = {
  api: {
    converter: {
      USER_ROLE_TO_USER_ROLE_API_V1_CONVERTER: Symbol.for(
        'UserRoleToUserRoleApiV1Converter',
      ),
      USER_TOKEN_TO_USER_TOKEN_API_V1_CONVERTER: Symbol.for(
        'UserTokenToUserTokenApiV1Converter',
      ),
      USER_TO_USER_API_V1_CONVERTER: Symbol.for('UserToUserApiV1Converter'),
    },
    validator: {
      schema: {
        AUTH_CREATION_QUERY_API_V1_JOI_VALIDATOR_SCHEMA: Symbol.for(
          'authCreationQueryApiV1JoiValidator',
        ),
        USER_CREATION_QUERY_API_V1_JOI_VALIDATOR_SCHEMA: Symbol.for(
          'userCreationQueryApiV1JoiValidator',
        ),
      },
      AUTH_CREATION_QUERY_API_V1_VALIDATOR: Symbol.for(
        'AuthCreationQueryApiV1Validator',
      ),
      USER_CREATION_QUERY_API_V1_VALIDATOR: Symbol.for(
        'UserCreationQueryApiV1Validator',
      ),
    },
  },
  auth: {
    FASTIFY_USER_AUTHENTICATOR: Symbol.for('FastifyUserAuthenticator'),
  },
  db: {
    collection: {
      USER_COLLECTION_NAME: Symbol.for('UserCollectionName'),
    },
    converter: {
      USER_CREATION_QUERY_TO_USER_DBS_CONVERTER: Symbol.for(
        'UserCreationQueryToUserDbsConverter',
      ),
      USER_DB_TO_USER_CONVERTER: Symbol.for('UserDbToUserConverter'),
      USER_FIND_QUERY_TO_USER_DB_FILTER_QUERY_CONVERTER: Symbol.for(
        'UserFindQueryToUserDbFilterQueryConverter',
      ),
    },
    filter: {
      POST_USER_DB_SEARCH_FILTER: Symbol.for('PostUserDbSearchFilter'),
    },
  },
  security: {
    PASSWORD_HASHER: Symbol.for('PasswordHasher'),
  },
  server: {
    reqHandler: {
      POST_AUTH_USER_TOKEN_V1_REQUEST_HANDLER: Symbol.for(
        'PostAuthTokenV1RequestHandler',
      ),
      POST_USER_V1_REQUEST_HANDLER: Symbol.for('PostUserV1RequestHandler'),
    },
    router: {
      AUTH_ROUTER: Symbol.for('AuthRouter'),
      USER_ROUTER: Symbol.for('UserRouter'),
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
