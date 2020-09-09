// eslint-disable-next-line @typescript-eslint/typedef
export const DB_ADAPTER_TYPES = {
  db: {
    MONGOOSE_CONNECTOR: Symbol.for('MongooseConnector'),
  },
};

// eslint-disable-next-line @typescript-eslint/typedef
export const DB_ADAPTER_PUBLIC_TYPES = {
  db: {
    MONGOOSE_CONNECTOR: DB_ADAPTER_TYPES.db.MONGOOSE_CONNECTOR,
  },
};
