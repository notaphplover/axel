import { ContainerModule, interfaces } from 'inversify';
import { JSON_SCHEMA_ADAPTER_TYPES } from './types';
import { JSON_SCHEMA_DOMAIN_TYPES } from '../../domain/config/types';
import { TJSGenerator } from '../generator/TJSGenerator';
import { ajv } from '../validator/Ajv';

function bindAdapter(bind: interfaces.Bind) {
  bind(JSON_SCHEMA_ADAPTER_TYPES.validator.AJV).toConstantValue(ajv);
}

function bindDomain(bind: interfaces.Bind) {
  bind(JSON_SCHEMA_DOMAIN_TYPES.generator.JSON_SCHEMA_GENERATOR).to(
    TJSGenerator,
  );
}

export const jsonSchemaContainer: ContainerModule = new ContainerModule(
  (bind: interfaces.Bind) => {
    bindAdapter(bind);
    bindDomain(bind);
  },
);
