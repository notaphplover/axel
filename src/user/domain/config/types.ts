// eslint-disable-next-line @typescript-eslint/typedef
export const USER_DOMAIN_TYPES = {
  converter: {
    USER_CREATION_QUERY_TO_NO_ID_USERS_CONVERTER: Symbol.for(
      'UserCreationQueryToNoIdUsersConverter',
    ),
  },
  interactor: {
    FIND_USER_INTERACTOR: Symbol.for('FindUserInteractor'),
  },
  repository: {
    USER_SEARCH_REPOSITORY: Symbol.for('UserSearchRepository'),
  },
};
