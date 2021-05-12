const REDIS_KEY_REGEX: RegExp = /^([\d\w]+)\/([\d\w]+)$/;

export class GameIdPlayerIdRedisKey {
  private innerLiveGameId!: string;

  private innerPlayerId!: string;

  private innerRedisKey!: string;

  constructor(key: string);
  // eslint-disable-next-line @typescript-eslint/unified-signatures
  constructor(liveGameId: string, playerId: string);
  constructor(keyOrGameId: string, playerId?: string) {
    if (playerId === undefined) {
      this.initializeFromRedisKey(keyOrGameId);
    } else {
      this.initializeFromGameIdAndPlayerId(keyOrGameId, playerId);
    }
  }

  public getRedisKey(): string {
    return this.innerRedisKey;
  }

  private initializeFromRedisKey(key: string) {
    const regexResult: RegExpExecArray | null = REDIS_KEY_REGEX.exec(key);

    if (regexResult === null) {
      throw new Error(`Unexpected redis key ${key}`);
    } else {
      const [, liveGameId, playerId]: [string, string, string] =
        regexResult as string[] as [string, string, string];

      this.initializeFromGameIdAndPlayerId(liveGameId, playerId);
    }
  }

  private initializeFromGameIdAndPlayerId(
    liveGameId: string,
    playerId: string,
  ): void {
    this.innerLiveGameId = liveGameId;
    this.innerPlayerId = playerId;

    this.innerRedisKey = this.buildRedisKey(
      this.innerLiveGameId,
      this.innerPlayerId,
    );
  }

  private buildRedisKey(liveGameId: string, playerId: string): string {
    return `${liveGameId}/${playerId}`;
  }
}
