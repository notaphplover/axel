import { WsMessageHandler } from '../../../../integration-modules/ws/adapter';
import { QueryWsApi } from '../model/QueryWsApi';

export interface AppWsMessageHandler<
  TMessage extends QueryWsApi = QueryWsApi,
  TContext = void,
> extends WsMessageHandler<TMessage, TContext> {
  readonly messageTypes: string[];
}
