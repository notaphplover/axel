// eslint-disable-next-line @typescript-eslint/typedef
export const DB_ADAPTER_TYPES = {
  env: {
    DB_ENV_LOADER: Symbol('DbEnvLoader'),
  },
};

// eslint-disable-next-line @typescript-eslint/typedef
export const DB_ADAPTER_PUBLIC_TYPES = {
  env: {
    DB_ENV_LOADER: DB_ADAPTER_TYPES.env.DB_ENV_LOADER,
  },
};
