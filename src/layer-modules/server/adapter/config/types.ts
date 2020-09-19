// eslint-disable-next-line @typescript-eslint/typedef
export const SERVER_ADAPTER_TYPES = {
  auth: {
    FASTIFY_AUTHENTICATOR: Symbol.for('FastifyAuthenticator'),
  },
};

// eslint-disable-next-line @typescript-eslint/typedef
export const SERVER_ADAPTER_PUBLIC_TYPES = {
  auth: {
    FASTIFY_AUTHENTICATOR: SERVER_ADAPTER_TYPES.auth.FASTIFY_AUTHENTICATOR,
  },
};
