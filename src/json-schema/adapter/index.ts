import { JSON_SCHEMA_ADAPTER_PUBLIC_TYPES } from './config/types';
import { JsonSchemaValidator } from './validator/JsonSchemaValidator';
import { jsonSchemaContainer } from './config/container';

export { JsonSchemaValidator };

// eslint-disable-next-line @typescript-eslint/typedef
export const jsonSchemaAdapter = {
  config: {
    container: jsonSchemaContainer,
    types: JSON_SCHEMA_ADAPTER_PUBLIC_TYPES,
  },
};
