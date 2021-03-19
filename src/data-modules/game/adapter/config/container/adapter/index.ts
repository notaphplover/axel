import { interfaces } from 'inversify';

import { bindGameAdapterApi } from './bindGameAdapterApi';
import { bindGameAdapterDb } from './bindGameAdapterDb';
import { bindGameAdapterServer } from './bindGameAdapterServer';
import { bindGameAdapterWs } from './bindGameAdapterWs';

export function bindGameAdapter(bind: interfaces.Bind): void {
  bindGameAdapterApi(bind);
  bindGameAdapterDb(bind);
  bindGameAdapterServer(bind);
  bindGameAdapterWs(bind);
}
