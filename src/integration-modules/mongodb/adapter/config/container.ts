import { ContainerModule, interfaces } from 'inversify';
import { MONGODB_ADAPTER_TYPES } from './types';
import { MongoDbConnector } from '../MongoDbConnector';

function bindAdapter(bind: interfaces.Bind): void {
  bind(MONGODB_ADAPTER_TYPES.db.MONGODB_CONNECTOR)
    .to(MongoDbConnector)
    .inSingletonScope();
}

export const mongoDbContainer: ContainerModule = new ContainerModule(
  (bind: interfaces.Bind) => {
    bindAdapter(bind);
  },
);
