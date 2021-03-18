import { WsMessageHandler } from '../../../../integration-modules/ws/adapter';
import { AppWsMessage } from '../model/AppWsMessage';

export interface AppWsMessageHandler<
  TMessage extends AppWsMessage = AppWsMessage,
  TContext = void
> extends WsMessageHandler<TMessage, TContext> {
  readonly messageTypes: string[];
}
