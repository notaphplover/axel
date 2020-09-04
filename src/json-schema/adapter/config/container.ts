import { ContainerModule, interfaces } from 'inversify';
import { JSON_SCHEMA_DOMAIN_TYPES } from '../../domain/config/types';
import { TJSGenerator } from '../TJSGenerator';

function bindDomain(bind: interfaces.Bind) {
  bind(JSON_SCHEMA_DOMAIN_TYPES.generator.JSON_SCHEMA_GENERATOR).to(
    TJSGenerator,
  );
}

export const jsonSchemaContainer: ContainerModule = new ContainerModule(
  (bind: interfaces.Bind) => {
    bindDomain(bind);
  },
);
