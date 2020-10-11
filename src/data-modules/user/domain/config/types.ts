// eslint-disable-next-line @typescript-eslint/typedef
export const USER_DOMAIN_TYPES = {
  interactor: {
    CREATE_USER_TOKEN_INTERACTOR: Symbol.for('CreateUserTokenInteractor'),
    CREATE_USERS_INTERACTOR: Symbol.for('CreateUsersInteractor'),
    FIND_USER_INTERACTOR: Symbol.for('FindUserInteractor'),
  },
  repository: {
    USER_INSERT_REPOSITORY: Symbol.for('UserInsertRepository'),
    USER_SEARCH_REPOSITORY: Symbol.for('UserSearchRepository'),
  },
};
