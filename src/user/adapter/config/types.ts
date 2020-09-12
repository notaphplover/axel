// eslint-disable-next-line @typescript-eslint/typedef
export const USER_ADAPTER_TYPES = {
  db: {
    converter: {
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
