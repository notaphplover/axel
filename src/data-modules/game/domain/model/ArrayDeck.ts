import { Deck } from './Deck';
import { InvalidNumberOfCardsError } from '../exception/InvalidNumberOfCardsError';
import { common } from '../../../../common/domain';

export class ArrayDeck<TCard> implements Deck<TCard> {
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
    const cardsDrawn: TCard[] = this.draw(1);
    return cardsDrawn.length === 0 ? undefined : cardsDrawn[0];
  }

  public shuffle(): void {
    for (let i: number = this.cards.length - 1; i > 0; --i) {
      const randomIndex: number = Math.floor(Math.random() * (i + 1));
      const choosenCard: TCard = this.cards[randomIndex];
      this.cards[randomIndex] = this.cards[i];
      this.cards[i] = choosenCard;
    }
  }
}
