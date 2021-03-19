import { wsContainer } from './config/container';
import { WS_ADAPTER_PUBLIC_TYPES } from './config/types';
import { WsMessageHandler } from './msgHandler/WsMessageHandler';
import { WsRoomManager } from './room/WsRoomManager';
import { WsServer } from './WsServer';

export { WsMessageHandler, WsServer, WsRoomManager };

// eslint-disable-next-line @typescript-eslint/typedef
export const wsAdapter = {
  config: {
    container: wsContainer,
    types: WS_ADAPTER_PUBLIC_TYPES,
  },
};
