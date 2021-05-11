import {
  DeepCloneFixtureFactory,
  FixtureFactory,
} from '../../../../../../common/test';
import { CardDeck } from '../../../../domain/model/deck/CardDeck';
import { CardDeckSections } from '../../../../domain/model/deck/CardDeckSections';
import { GameFormat } from '../../../../domain/model/GameFormat';

export const cardDeckSections: CardDeckSections = ((): CardDeckSections => {
  const cardDeckCoreFirstReference: bigint = BigInt(
    '0x5f5ab76243fda130685d40dc',
  );
  const cardDeckCoreReferences: number = 60;

  const cardDeckSideboardFirstReference: bigint = BigInt(
    '0x6f5ab76243fda130685d40dc',
  );
  const cardDeckSideboardReferences: number = 15;

  const cardDeckSections: CardDeckSections = {
    core: { references: new Array<string>(cardDeckCoreReferences) },
    sideboard: { references: new Array<string>(cardDeckSideboardReferences) },
  };

  for (let i: number = 0; i < cardDeckCoreReferences; ++i) {
    cardDeckSections.core.references[i] = (
      cardDeckCoreFirstReference + BigInt(i)
    ).toString(16);
  }

  for (let i: number = 0; i < cardDeckSideboardReferences; ++i) {
    cardDeckSections.sideboard.references[i] = (
      cardDeckSideboardFirstReference + BigInt(i)
    ).toString(16);
  }

  return cardDeckSections;
})();

export const cardDeck: CardDeck = {
  description: 'Sample card deck description',
  format: GameFormat.UNRESTRICTED,
  id: '5f5ab76243fda130685d40dc',
  name: 'Sample card deck name',
  sections: cardDeckSections,
};

export const cardDeckFixtureFactory: FixtureFactory<CardDeck> =
  new DeepCloneFixtureFactory(cardDeck);
