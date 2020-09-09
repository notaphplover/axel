import { ContainerModule, interfaces } from 'inversify';
import { DB_ADAPTER_TYPES } from './types';
import { MongooseConector } from '../MongooseConnector';

function bindAdapter(bind: interfaces.Bind): void {
  bind(DB_ADAPTER_TYPES.db.MONGOOSE_CONNECTOR).to(MongooseConector);
}

export const dbContainer: ContainerModule = new ContainerModule(
  (bind: interfaces.Bind) => {
    bindAdapter(bind);
  },
);
