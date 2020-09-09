import { Container, ContainerModule, interfaces } from 'inversify';
import { COMMON_DOMAIN_TYPES } from '../../domain/config/types';
import { CommonDotEnvLoader } from '../env/CommonDotEnvLoader';
import { dbAdapter } from '../../../layer-modules/db/adapter';
import { gameAdapter } from '../../../game/adapter';
import { jsonSchemaAdapter } from '../../../json-schema/adapter';
import { serverAdapter } from '../../../layer-modules/server/adapter';

function bindDomain(bind: interfaces.Bind): void {
  bind(COMMON_DOMAIN_TYPES.COMMON_ENV_LOADER)
    .to(CommonDotEnvLoader)
    .inSingletonScope();
}

const commonContainer: ContainerModule = new ContainerModule(
  (bind: interfaces.Bind) => {
    bindDomain(bind);
  },
);

export const container: Container = new Container();

container.load(dbAdapter.config.container);
container.load(commonContainer);
container.load(gameAdapter.config.container);
container.load(jsonSchemaAdapter.config.container);
container.load(serverAdapter.config.container);
