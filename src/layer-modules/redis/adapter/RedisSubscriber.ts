export interface RedisSubscriber {
  subscribe(channel: string): Promise<void>;
}
