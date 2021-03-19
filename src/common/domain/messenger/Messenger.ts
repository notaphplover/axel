export interface Messenger<TMessage = unknown> {
  send(message: TMessage): Promise<void>;
}
