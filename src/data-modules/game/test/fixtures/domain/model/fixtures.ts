import {
  CardDeck,
  CardDeckSections,
} from '../../../../domain/model/deck/CardDeck';
import {
  DeepCloneFixtureFactory,
  FixtureFactory,
} from '../../../../../../common/test';
import { Artifact } from '../../../../domain/model/card/Artifact';
import { CardDetail } from '../../../../domain/model/card/CardDetail';
import { CardType } from '../../../../domain/model/card/CardType';
import { Creature } from '../../../../domain/model/card/Creature';
import { Enchantment } from '../../../../domain/model/card/Enchantment';
import { Game } from '../../../../domain/model/Game';
import { GameFormat } from '../../../../domain/model/GameFormat';
import { Land } from '../../../../domain/model/card/Land';
import { Resource } from '../../../../domain/model/card/Resource';

export const cardDetail: CardDetail = {
  description: 'Sample description',
  image: 'http://sample.com/sample-image',
  title: 'Sample title',
};

export const cardDetailFixtureFactory: FixtureFactory<CardDetail> = new DeepCloneFixtureFactory(
  cardDetail,
);

export const resource: Resource = {
  black: 1,
  blue: 2,
  green: 3,
  red: 4,
  uncolored: 5,
  white: 6,
};

export const resourceFixtureFactory: FixtureFactory<Resource> = new DeepCloneFixtureFactory(
  resource,
);

export const artifact: Artifact = {
  cost: resource,
  detail: cardDetail,
  id: '5f5cb76243fda130685e00dc',
  type: CardType.Artifact,
};

export const artifactFixtureFactory: FixtureFactory<Artifact> = new DeepCloneFixtureFactory(
  artifact,
);

export const creature: Creature = {
  cost: resource,
  detail: cardDetail,
  id: '5f5cb76243faa130688e00dc',
  type: CardType.Creature,
  power: 2,
  toughness: 3,
};

export const creatureFixtureFactory: FixtureFactory<Creature> = new DeepCloneFixtureFactory(
  creature,
);

export const enchantment: Enchantment = {
  cost: resource,
  detail: cardDetail,
  id: '5f5cb76243fda130685e00dc',
  type: CardType.Enchantment,
};

export const enchantmentFixtureFactory: FixtureFactory<Enchantment> = new DeepCloneFixtureFactory(
  enchantment,
);

export const land: Land = {
  cost: resource,
  detail: cardDetail,
  id: '5f5cb76c43fda630685e00dc',
  type: CardType.Land,
};

export const landFixtureFactory: FixtureFactory<Land> = new DeepCloneFixtureFactory(
  land,
);

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

export const cardDeckFixtureFactory: FixtureFactory<CardDeck> = new DeepCloneFixtureFactory(
  cardDeck,
);

export const game: Game = {
  id: '5f5cb76273fd1130685e00dc',
  round: 2,
};

export const gameFixtureFactory: FixtureFactory<Game> = new DeepCloneFixtureFactory(
  game,
);
