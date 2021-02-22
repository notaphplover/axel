import { interfaces } from 'inversify';

import { bindGameAdapterApi } from './bindGameAdapterApi';
import { bindGameAdapterDb } from './bindGameAdapterDb';
import { bindGameAdapterServer } from './bindGameAdapterServer';

export function bindGameAdapter(bind: interfaces.Bind): void {
  bindGameAdapterApi(bind);
  bindGameAdapterDb(bind);
  bindGameAdapterServer(bind);
}
