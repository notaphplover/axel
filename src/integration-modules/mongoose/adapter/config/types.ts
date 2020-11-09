// eslint-disable-next-line @typescript-eslint/typedef
export const MONGOOSE_ADAPTER_TYPES = {
  db: {
    MONGOOSE_CONNECTOR: Symbol.for('MongooseConnector'),
  },
};

// eslint-disable-next-line @typescript-eslint/typedef
export const MONGOOSE_ADAPTER_PUBLIC_TYPES = {
  db: {
    MONGOOSE_CONNECTOR: MONGOOSE_ADAPTER_TYPES.db.MONGOOSE_CONNECTOR,
  },
};
