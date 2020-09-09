import { JSON_SCHEMA_ADAPTER_PUBLIC_TYPES } from './config/types';
import { JsonSchemaFileValidator } from './validator/JsonSchemaFileValidator';
import { JsonSchemaValidator } from './validator/JsonSchemaValidator';
import { jsonSchemaContainer } from './config/container';

export { JsonSchemaValidator, JsonSchemaFileValidator };

// eslint-disable-next-line @typescript-eslint/typedef
export const jsonSchemaAdapter = {
  config: {
    container: jsonSchemaContainer,
    types: JSON_SCHEMA_ADAPTER_PUBLIC_TYPES,
  },
};
