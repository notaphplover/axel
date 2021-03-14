import { WsMessageHandler } from '../../../../../integration-modules/ws/adapter';

export interface AppWsMessageHandler extends WsMessageHandler {
  readonly messageTypes: string[];
}
