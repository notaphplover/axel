import {
  DeepCloneFixtureFactory,
  FixtureFactory,
} from '../../../../../../common/test';
import {
  artifact,
  creature,
  enchantment,
  game,
  land,
} from '../../../domain/model/fixtures';
import { ArtifactApiV1 } from '../../../../../adapter/api/model/card/ArtifactApiV1';
import { CardTypeApiV1 } from '../../../../../adapter/api/model/card/CardTypeApiV1';
import { CreatureApiV1 } from '../../../../../adapter/api/model/card/CreatureApiV1';
import { EnchantmentApiV1 } from '../../../../../adapter/api/model/card/EnchantmentApiV1';
import { GameApiV1 } from '../../../../../adapter/api/model/GameApiV1';
import { LandApiV1 } from '../../../../../adapter/api/model/card/LandApiV1';

export const artifactApiV1: ArtifactApiV1 = {
  cost: {
    black: artifact.cost.black,
    blue: artifact.cost.blue,
    green: artifact.cost.green,
    red: artifact.cost.red,
    uncolored: artifact.cost.uncolored,
    white: artifact.cost.white,
  },
  id: artifact.id,
  type: CardTypeApiV1.Artifact,
};

export const artifactApiV1FixtureFactory: FixtureFactory<ArtifactApiV1> = new DeepCloneFixtureFactory(
  artifactApiV1,
);

export const creatureApiV1: CreatureApiV1 = {
  cost: {
    black: creature.cost.black,
    blue: creature.cost.blue,
    green: creature.cost.green,
    red: creature.cost.red,
    uncolored: creature.cost.uncolored,
    white: creature.cost.white,
  },
  id: creature.id,
  power: creature.power,
  toughness: creature.toughness,
  type: CardTypeApiV1.Creature,
};

export const creatureApiV1FixtureFactory: FixtureFactory<CreatureApiV1> = new DeepCloneFixtureFactory(
  creatureApiV1,
);

export const enchantmentApiV1: EnchantmentApiV1 = {
  cost: {
    black: enchantment.cost.black,
    blue: enchantment.cost.blue,
    green: enchantment.cost.green,
    red: enchantment.cost.red,
    uncolored: enchantment.cost.uncolored,
    white: enchantment.cost.white,
  },
  id: enchantment.id,
  type: CardTypeApiV1.Enchantment,
};

export const enchantmentApiV1FixtureFactory: FixtureFactory<EnchantmentApiV1> = new DeepCloneFixtureFactory(
  enchantmentApiV1,
);

export const landApiV1: LandApiV1 = {
  cost: {
    black: land.cost.black,
    blue: land.cost.blue,
    green: land.cost.green,
    red: land.cost.red,
    uncolored: land.cost.uncolored,
    white: land.cost.white,
  },
  id: land.id,
  type: CardTypeApiV1.Land,
};

export const landApiV1FixtureFactory: FixtureFactory<LandApiV1> = new DeepCloneFixtureFactory(
  landApiV1,
);

const gameApiV1: GameApiV1 = {
  id: game.id,
  round: game.round,
};

export const gameApiV1FixtureFactory: FixtureFactory<GameApiV1> = new DeepCloneFixtureFactory(
  gameApiV1,
);
