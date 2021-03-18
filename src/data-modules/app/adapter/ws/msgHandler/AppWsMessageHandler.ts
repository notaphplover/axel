import { WsMessageHandler } from '../../../../../integration-modules/ws/adapter';
import { AppWsMessage } from '../model/AppWsMessage';

export interface AppWsMessageHandler<
  TMessage extends AppWsMessage = AppWsMessage
> extends WsMessageHandler<TMessage> {
  readonly messageTypes: string[];
}
