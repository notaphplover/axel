// eslint-disable-next-line @typescript-eslint/typedef
export const USER_ADAPTER_TYPES = {
  api: {
    converter: {
      USER_TOKEN_TO_USER_TOKEN_API_V1_CONVERTER: Symbol.for(
        'UserTokenToUserTokenApiV1Converter',
      ),
      USER_TO_USER_API_V1_CONVERTER: Symbol.for('UserToUserApiV1Converter'),
    },
    validator: {
      AUTH_CREATION_QUERY_API_V1_VALIDATOR: Symbol.for(
        'AuthCreationQueryApiV1Validator',
      ),
      USER_CREATION_QUERY_API_V1_VALIDATOR: Symbol.for(
        'UserCreationQueryApiV1Validator',
      ),
    },
  },
  db: {
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
    model: {
      USER_DB_MODEL: Symbol.for('UserDbModel'),
    },
  },
  security: {
    PASSWORD_HASHER: Symbol.for('PasswordHasher'),
  },
  server: {
    reqHandler: {
      POST_USER_V1_REQUEST_HANDLER: Symbol.for('PostUserV1RequestHandler'),
    },
    router: {
      USER_ROUTER: Symbol.for('UserRouter'),
    },
  },
};

// eslint-disable-next-line @typescript-eslint/typedef
export const USER_ADAPTER_PUBLIC_TYPES = {
  server: {
    router: {
      USER_ROUTER: USER_ADAPTER_TYPES.server.router.USER_ROUTER,
    },
  },
};
