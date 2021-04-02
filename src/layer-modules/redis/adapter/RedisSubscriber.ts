export interface RedisSubscriber {
  subscribe(channel: string): Promise<void>;

  unsubscribe(channel: string): Promise<void>;
}
