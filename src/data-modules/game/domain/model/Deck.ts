export interface Deck<TCard> {
  draw(number: number): TCard[];
  drawOne(): TCard | undefined;
  shuffle(): void;
}
