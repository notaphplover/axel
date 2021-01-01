// eslint-disable-next-line @typescript-eslint/typedef
export const MONGODB_ADAPTER_TYPES = {
  db: {
    MONGODB_CONNECTOR: Symbol('MongoDbConnector'),
  },
};

// eslint-disable-next-line @typescript-eslint/typedef
export const MONGODB_ADAPTER_PUBLIC_TYPES = {
  db: {
    MONGODB_CONNECTOR: MONGODB_ADAPTER_TYPES.db.MONGODB_CONNECTOR,
  },
};
