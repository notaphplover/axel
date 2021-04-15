import { interfaces } from 'inversify';

import { bindGameAdapterApi } from './bindGameAdapterApi';
import { bindGameAdapterBroker } from './bindGameAdapterBroker';
import { bindGameAdapterDb } from './bindGameAdapterDb';
import { bindGameAdapterServer } from './bindGameAdapterServer';
import { bindGameAdapterWs } from './bindGameAdapterWs';

export function bindGameAdapter(bind: interfaces.Bind): void {
  bindGameAdapterApi(bind);
  bindGameAdapterBroker(bind);
  bindGameAdapterDb(bind);
  bindGameAdapterServer(bind);
  bindGameAdapterWs(bind);
}
