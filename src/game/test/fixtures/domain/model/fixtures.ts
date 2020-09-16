import {
  DeepCloneFixtureFactory,
  FixtureFactory,
} from '../../../../../common/test';
import { Artifact } from '../../../../domain/model/card/Artifact';
import { CardType } from '../../../../domain/model/card/CardType';
import { Creature } from '../../../../domain/model/card/Creature';
import { Enchantment } from '../../../../domain/model/card/Enchantment';
import { Game } from '../../../../domain/model/Game';
import { Land } from '../../../../domain/model/card/Land';
import { Resource } from '../../../../domain/model/card/Resource';

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
  id: '5f5cb76243fda130685e00dc',
  type: CardType.Artifact,
};

export const artifactFixtureFactory: FixtureFactory<Artifact> = new DeepCloneFixtureFactory(
  artifact,
);

export const creature: Creature = {
  cost: resource,
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
  id: '5f5cb76243fda130685e00dc',
  type: CardType.Enchantment,
};

export const enchantmentFixtureFactory: FixtureFactory<Enchantment> = new DeepCloneFixtureFactory(
  enchantment,
);

export const land: Land = {
  cost: resource,
  id: '5f5cb76c43fda630685e00dc',
  type: CardType.Land,
};

export const landFixtureFactory: FixtureFactory<Land> = new DeepCloneFixtureFactory(
  land,
);

export const game: Game = {
  id: '5f5cb76273fd1130685e00dc',
  round: 2,
};

export const gameFixtureFactory: FixtureFactory<Game> = new DeepCloneFixtureFactory(
  game,
);
