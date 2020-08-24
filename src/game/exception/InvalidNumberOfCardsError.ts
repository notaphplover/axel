export class InvalidNumberOfCardsError extends Error {
  constructor(numberOfCards?: number) {
    super(InvalidNumberOfCardsError.getErrorMessage(numberOfCards));

    this.name = InvalidNumberOfCardsError.name;
  }

  private static getErrorMessage(numberOfCards?: number): string {
    return `Invalid number of cards${
      numberOfCards === undefined ? '' : ` (${numberOfCards})`
    }`;
  }
}
