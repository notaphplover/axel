// eslint-disable-next-line @typescript-eslint/typedef
export const DB_ADAPTER_TYPES = {
  db: {
    MONGOOSE_CONNECTOR: Symbol.for('MongooseConnector'),
  },
  env: {
    DB_ENV_LOADER: Symbol.for('DbEnvLoader'),
  },
};

// eslint-disable-next-line @typescript-eslint/typedef
export const DB_ADAPTER_PUBLIC_TYPES = {
  db: {
    MONGOOSE_CONNECTOR: DB_ADAPTER_TYPES.db.MONGOOSE_CONNECTOR,
  },
};
