// eslint-disable-next-line @typescript-eslint/typedef
export const USER_ADAPTER_TYPES = {
  api: {
    converter: {
      USER_TO_USER_API_V1_CONVERTER: Symbol.for('UserToUserApiV1Converter'),
    },
    validator: {
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
    model: {
      USER_DB_MODEL: Symbol.for('UserDbModel'),
    },
  },
};
