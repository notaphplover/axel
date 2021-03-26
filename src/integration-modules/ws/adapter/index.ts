import { wsContainer } from './config/container';
import { WS_ADAPTER_PUBLIC_TYPES } from './config/types';
import { WsMessageHandler } from './msgHandler/WsMessageHandler';
import { WsServer } from './WsServer';

export { WsMessageHandler, WsServer };

// eslint-disable-next-line @typescript-eslint/typedef
export const wsAdapter = {
  config: {
    container: wsContainer,
    types: WS_ADAPTER_PUBLIC_TYPES,
  },
};
