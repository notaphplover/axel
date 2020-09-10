export interface JwtManager<TToken> {
  create(payload: TToken): string;
  parse(jwtToken: string): TToken;
}
