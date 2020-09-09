export interface NoIdGame {
  round: number;
}

export interface Game extends NoIdGame {
  id: string;
}
