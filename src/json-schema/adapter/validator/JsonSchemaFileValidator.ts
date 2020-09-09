/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-require-imports */

import Ajv from 'ajv';
import { JsonSchemaValidator } from './JsonSchemaValidator';
import { unmanaged } from 'inversify';

export class JsonSchemaFileValidator<T> extends JsonSchemaValidator<T> {
  constructor(@unmanaged() ajv: Ajv.Ajv, @unmanaged() schemaFilePath: string) {
    const validationSchema: Record<
      string,
      unknown
    > = require(schemaFilePath) as Record<string, unknown>;

    super(ajv, validationSchema);
  }
}
