// eslint-disable-next-line @typescript-eslint/typedef
export const JWT_ADAPTER_TYPES = {
  env: {
    JWT_ENV_LOADER: Symbol('JwtEnvLoader'),
  },
};

// eslint-disable-next-line @typescript-eslint/typedef
export const JWT_ADAPTER_PUBLIC_TYPES = {
  env: {
    JWT_ENV_LOADER: JWT_ADAPTER_TYPES.env.JWT_ENV_LOADER,
  },
};
