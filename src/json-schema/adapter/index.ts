import { JSON_SCHEMA_ADAPTER_PUBLIC_TYPES } from './config/types';
import { JsonSchemaValidator } from './validator/JsonSchemaValidator';

export { JsonSchemaValidator };

// eslint-disable-next-line @typescript-eslint/typedef
export const jsonSchemaAdapter = {
  config: { types: JSON_SCHEMA_ADAPTER_PUBLIC_TYPES },
};
