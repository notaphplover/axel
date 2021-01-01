// eslint-disable-next-line @typescript-eslint/typedef
export const USER_DOMAIN_TYPES = {
  interactor: {
    CREATE_USER_TOKEN_INTERACTOR: Symbol('CreateUserTokenInteractor'),
    CREATE_USERS_INTERACTOR: Symbol('CreateUsersInteractor'),
    FIND_USER_INTERACTOR: Symbol('FindUserInteractor'),
  },
  repository: {
    USER_INSERT_REPOSITORY: Symbol('UserInsertRepository'),
    USER_SEARCH_REPOSITORY: Symbol('UserSearchRepository'),
  },
};
