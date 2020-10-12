// eslint-disable-next-line @typescript-eslint/typedef
export const APP_ADAPTER_TYPES = {
  env: {
    APP_ENV_LOADER: Symbol.for('AppEnvLoader'),
  },
  server: {
    reqHandler: {
      GET_STATUS_V1_REQUEST_HANDLER: Symbol.for('GetStatusV1RequestHandler'),
    },
  },
};

// eslint-disable-next-line @typescript-eslint/typedef
export const APP_ADAPTER_PUBLIC_TYPES = {
  env: {
    APP_ENV_LOADER: APP_ADAPTER_TYPES.env.APP_ENV_LOADER,
  },
};
