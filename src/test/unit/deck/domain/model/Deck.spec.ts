import { Deck } from '../../../../../deck/domain/model/Deck';
import { InvalidNumberOfCardsError } from '../../../../../deck/exception/InvalidNumberOfCardsError';

describe(Deck.name, () => {
  describe(`.${Deck.prototype.draw.name}`, () => {
    describe('when called, with an integer greater than zero and less or equals the cards amount', () => {
      const cards: number[] = [0, 1, 2, 3];
      const deck: Deck<number> = new Deck(cards);

      let result: unknown;

      beforeAll(() => {
        result = deck.draw(2);
      });

      it('must return as many cards as requested', () => {
        expect(result).toStrictEqual([2, 3]);
      });
    });

    describe('when called, with an integer greater than the cards amount', () => {
      const cards: number[] = [0, 1, 2, 3];
      const deck: Deck<number> = new Deck(cards);

      let result: unknown;

      beforeAll(() => {
        result = deck.draw(4);
      });

      it('must return all the cards', () => {
        expect(result).toStrictEqual([0, 1, 2, 3]);
      });
    });

    describe('when called, with an integer less than zero', () => {
      const cards: number[] = [0, 1, 2, 3];
      const deck: Deck<number> = new Deck(cards);

      let result: unknown;

      beforeAll(() => {
        try {
          result = deck.draw(-2);
        } catch (err) {
          result = err;
        }
      });

      it('must throw an error', () => {
        expect(result).toBeInstanceOf(InvalidNumberOfCardsError);
      });
    });

    describe('when called, with a non integer', () => {
      const cards: number[] = [0, 1, 2, 3];
      const deck: Deck<number> = new Deck(cards);

      let result: unknown;

      beforeAll(() => {
        try {
          result = deck.draw(2.5);
        } catch (err) {
          result = err;
        }
      });

      it('must throw an error', () => {
        expect(result).toBeInstanceOf(InvalidNumberOfCardsError);
      });
    });
  });

  describe(`.${Deck.prototype.drawOne.name}`, () => {
    describe('when called with cards', () => {
      const cards: number[] = [0, 1, 2, 3];
      const deck: Deck<number> = new Deck(cards);

      let result: unknown;

      beforeAll(() => {
        result = deck.drawOne();
      });

      it('must return a card', () => {
        expect(result).toStrictEqual(3);
      });
    });

    describe('when called with no cards', () => {
      const cards: number[] = [];
      const deck: Deck<number> = new Deck(cards);

      let result: unknown;

      beforeAll(() => {
        result = deck.drawOne();
      });

      it('must return a card', () => {
        expect(result).toBeUndefined();
      });
    });
  });

  describe(`.${Deck.prototype.shuffle.name}`, () => {
    const cards: number[] = [0, 1, 2, 3];
    const deck: Deck<number> = new Deck(cards);

    let result: unknown;

    describe('when called', () => {
      beforeAll(() => {
        jest
          .spyOn(global.Math, 'random')
          .mockReturnValueOnce(0)
          .mockReturnValueOnce(0)
          .mockReturnValueOnce(0);

        deck.shuffle();
        result = deck.draw(cards.length);
      });

      afterAll(() => {
        jest.spyOn(global.Math, 'random').mockRestore();
      });

      it('must shuffle all the cards', () => {
        expect(result).toStrictEqual([1, 2, 3, 0]);
      });
    });
  });
});
