import { JSON_SCHEMA_DOMAIN_TYPES } from './config/types';
import { JsonSchemaGenerator } from './generator/JsonSchemaGenerator';

export { JsonSchemaGenerator };

// eslint-disable-next-line @typescript-eslint/typedef
export const jsonSchemaDomain = {
  config: {
    types: JSON_SCHEMA_DOMAIN_TYPES,
  },
};
