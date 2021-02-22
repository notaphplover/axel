import { ContainerModule, interfaces } from 'inversify';

import { MongoDbConnector } from '../MongoDbConnector';
import { MONGODB_ADAPTER_TYPES } from './types';

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
