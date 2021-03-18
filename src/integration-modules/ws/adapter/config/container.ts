import { ContainerModule, interfaces } from 'inversify';

import { WsRoomInMemoryManager } from '../room/WsRoomInMemoryManager';
import { WS_ADAPTER_TYPES } from './types';

function bindAdapter(bind: interfaces.Bind): void {
  bind(WS_ADAPTER_TYPES.room.WS_ROOM_MANAGER)
    .to(WsRoomInMemoryManager)
    .inSingletonScope();
}

export const wsContainer: ContainerModule = new ContainerModule(
  (bind: interfaces.Bind) => {
    bindAdapter(bind);
  },
);
