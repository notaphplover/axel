import { InvalidNumberOfCardsError } from '../../exception/InvalidNumberOfCardsError';
import { common } from '../../../common';

export class ArrayDeck<TCard> {
  constructor(private readonly cards: TCard[]) {}

  public draw(number: number): TCard[] {
    if (number < 0) {
      throw new InvalidNumberOfCardsError(number);
    }

    const numberOfCards: number = common.parse.floatToInt(number);

    if (number !== numberOfCards) {
      throw new InvalidNumberOfCardsError(number);
    }

    return number > this.cards.length
      ? this.cards.splice(0)
      : this.cards.splice(-number);
  }

  public drawOne(): TCard | undefined {
    return this.draw(1)?.[0];
  }

  public shuffle(): void {
    for (let i = this.cards.length - 1; i > 0; --i) {
      let randomIndex = Math.floor(Math.random() * (i + 1));
      const choosenCard: TCard = this.cards[randomIndex];
      this.cards[randomIndex] = this.cards[i];
      this.cards[i] = choosenCard;
    }
  }
}
