export interface BrokerMessageApi<TBody extends Record<string, unknown>> {
  body: TBody;
  key: string;
}
