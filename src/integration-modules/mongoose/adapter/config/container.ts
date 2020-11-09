import { ContainerModule, interfaces } from 'inversify';
import { MONGOOSE_ADAPTER_TYPES } from './types';
import { MongooseConnector } from '../../../../integration-modules/mongoose/adapter/MongooseConnector';

function bindAdapter(bind: interfaces.Bind): void {
  bind(MONGOOSE_ADAPTER_TYPES.db.MONGOOSE_CONNECTOR).to(MongooseConnector);
}

export const mongooseContainer: ContainerModule = new ContainerModule(
  (bind: interfaces.Bind) => {
    bindAdapter(bind);
  },
);