import { Container, ContainerModule, interfaces } from 'inversify';
import { COMMON_DOMAIN_TYPES } from '../../domain/config/types';
import { FastifyServer } from '../server/model/FastifyServer';

const commonContainer: ContainerModule = new ContainerModule(
  (bind: interfaces.Bind) => {
    bind(COMMON_DOMAIN_TYPES.SERVER).to(FastifyServer).inSingletonScope();
  },
);

export const container: Container = new Container();

container.load(commonContainer);
