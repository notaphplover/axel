export interface RedisPublisher {
  publish(key: string, body: Record<string, unknown>): Promise<void>;
}
