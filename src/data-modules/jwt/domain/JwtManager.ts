export interface JwtManager<TToken> {
  create(payload: TToken): Promise<string>;
  parse(jwtToken: string): Promise<TToken>;
}
