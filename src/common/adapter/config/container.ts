import { Container, ContainerModule, interfaces } from 'inversify';
import { COMMON_ADAPTER_TYPES } from './types';
import { COMMON_DOMAIN_TYPES } from '../../domain/config/types';
import { CommonDotEnvLoader } from '../env/CommonDotEnvLoader';
import { FastifyServer } from '../server/model/FastifyServer';
import { MongooseConector } from '../db/MongooseConnector';
import { gameAdapter } from '../../../game/adapter';
import { jsonSchemaAdapter } from '../../../json-schema/adapter';

function bindAdapter(bind: interfaces.Bind): void {
  bind(COMMON_ADAPTER_TYPES.db.MONGOOSE_CONNECTOR).to(MongooseConector);
}

function bindDomain(bind: interfaces.Bind): void {
  bind(COMMON_DOMAIN_TYPES.COMMON_ENV_LOADER)
    .to(CommonDotEnvLoader)
    .inSingletonScope();
  bind(COMMON_DOMAIN_TYPES.SERVER).to(FastifyServer).inSingletonScope();
}

const commonContainer: ContainerModule = new ContainerModule(
  (bind: interfaces.Bind) => {
    bindAdapter(bind);
    bindDomain(bind);
  },
);

export const container: Container = new Container();

container.load(commonContainer);
container.load(gameAdapter.config.container);
container.load(jsonSchemaAdapter.config.container);
