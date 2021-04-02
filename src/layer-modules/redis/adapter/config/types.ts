// eslint-disable-next-line @typescript-eslint/typedef
export const REDIS_ADAPTER_TYPES = {
  env: {
    RedisEnvLoader: Symbol('RedisEnvLoader'),
  },
};

// eslint-disable-next-line @typescript-eslint/typedef
export const REDIS_ADAPTER_PUBLIC_TYPES = {
  env: {
    RedisEnvLoader: REDIS_ADAPTER_TYPES.env.RedisEnvLoader,
  },
};
