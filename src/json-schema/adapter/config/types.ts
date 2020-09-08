// eslint-disable-next-line @typescript-eslint/typedef
export const JSON_SCHEMA_ADAPTER_TYPES = {
  validator: {
    AJV: Symbol.for('Ajv'),
  },
};

// eslint-disable-next-line @typescript-eslint/typedef
export const JSON_SCHEMA_ADAPTER_PUBLIC_TYPES = {
  validator: {
    AJV: JSON_SCHEMA_ADAPTER_TYPES.validator.AJV,
  },
};
