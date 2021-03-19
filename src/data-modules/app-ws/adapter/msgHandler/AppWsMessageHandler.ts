import { WsMessageHandler } from '../../../../integration-modules/ws/adapter';
import { MessageWsApi } from '../model/MessageWsApi';

export interface AppWsMessageHandler<
  TMessage extends MessageWsApi = MessageWsApi,
  TContext = void
> extends WsMessageHandler<TMessage, TContext> {
  readonly messageTypes: string[];
}
