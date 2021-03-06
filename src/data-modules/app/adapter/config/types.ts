// eslint-disable-next-line @typescript-eslint/typedef
export const APP_ADAPTER_TYPES = {
  env: {
    APP_ENV_LOADER: Symbol('AppEnvLoader'),
  },
  server: {
    reqHandler: {
      GET_STATUS_V1_REQUEST_HANDLER: Symbol('GetStatusV1RequestHandler'),
    },
    router: {
      STATUS_ROUTER: Symbol('StatusRouter'),
    },
  },
};

// eslint-disable-next-line @typescript-eslint/typedef
export const APP_ADAPTER_PUBLIC_TYPES = {
  env: {
    APP_ENV_LOADER: APP_ADAPTER_TYPES.env.APP_ENV_LOADER,
  },
  server: {
    router: {
      STATUS_ROUTER: APP_ADAPTER_TYPES.server.router.STATUS_ROUTER,
    },
  },
};
