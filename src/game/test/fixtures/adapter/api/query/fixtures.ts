import {
  DeepCloneFixtureFactory,
  FixtureFactory,
} from '../../../../../../common/test';
import {
  artifactCreationQuery,
  artifactFindQuery,
  creatureCreationQuery,
  creatureFindQuery,
  enchantmentCreationQuery,
  enchantmentFindQuery,
  landCreationQuery,
  landFindQuery,
} from '../../../domain/query/fixtures';
import { ArtifactCreationQueryApiV1 } from '../../../../../adapter/api/query/card/ArtifactCreationQueryApiV1';
import { CardFindQueryApiV1 } from '../../../../../adapter/api/query/card/CardFindQueryApiV1';
import { CardTypeApiV1 } from '../../../../../adapter/api/model/card/CardTypeApiV1';
import { CreatureCreationQueryApiV1 } from '../../../../../adapter/api/query/card/CreatureCreationQueryApiV1';
import { EnchantmentCreationQueryApiV1 } from '../../../../../adapter/api/query/card/EnchantmentCreationQueryApiV1';
import { GameCreationQueryApiV1 } from '../../../../../adapter/api/query/GameCreationQueryApiV1';
import { LandCreationQueryApiV1 } from '../../../../../adapter/api/query/card/LandCreationQueryApiV1';
import { game } from '../../../domain/model/fixtures';

export const artifactCreationQueryApiV1: ArtifactCreationQueryApiV1 = {
  cost: {
    black: artifactCreationQuery.cost.black,
    blue: artifactCreationQuery.cost.blue,
    green: artifactCreationQuery.cost.green,
    red: artifactCreationQuery.cost.red,
    uncolored: artifactCreationQuery.cost.uncolored,
    white: artifactCreationQuery.cost.white,
  },
  type: CardTypeApiV1.Artifact,
};

export const artifactCreationQueryApiV1FixtureFactory: FixtureFactory<ArtifactCreationQueryApiV1> = new DeepCloneFixtureFactory(
  artifactCreationQueryApiV1,
);

export const artifactFindQueryApiV1: CardFindQueryApiV1 = {
  id: artifactFindQuery.id,
  types: CardTypeApiV1.Artifact,
};

export const artifactFindQueryApiV1FixtureFactory: FixtureFactory<CardFindQueryApiV1> = new DeepCloneFixtureFactory(
  artifactFindQueryApiV1,
);

export const creatureCreationQueryApiV1: CreatureCreationQueryApiV1 = {
  cost: {
    black: creatureCreationQuery.cost.black,
    blue: creatureCreationQuery.cost.blue,
    green: creatureCreationQuery.cost.green,
    red: creatureCreationQuery.cost.red,
    uncolored: creatureCreationQuery.cost.uncolored,
    white: creatureCreationQuery.cost.white,
  },
  power: creatureCreationQuery.power,
  toughness: creatureCreationQuery.toughness,
  type: CardTypeApiV1.Creature,
};

export const creatureCreationQueryApiV1FixtureFactory: FixtureFactory<CreatureCreationQueryApiV1> = new DeepCloneFixtureFactory(
  creatureCreationQueryApiV1,
);

export const creatureFindQueryApiV1: CardFindQueryApiV1 = {
  id: creatureFindQuery.id,
  types: CardTypeApiV1.Creature,
};

export const creatureFindQueryApiV1FixtureFactory: FixtureFactory<CardFindQueryApiV1> = new DeepCloneFixtureFactory(
  creatureFindQueryApiV1,
);

export const enchantmentCreationQueryApiV1: EnchantmentCreationQueryApiV1 = {
  cost: {
    black: enchantmentCreationQuery.cost.black,
    blue: enchantmentCreationQuery.cost.blue,
    green: enchantmentCreationQuery.cost.green,
    red: enchantmentCreationQuery.cost.red,
    uncolored: enchantmentCreationQuery.cost.uncolored,
    white: enchantmentCreationQuery.cost.white,
  },
  type: CardTypeApiV1.Enchantment,
};

export const enchantmentCreationQueryApiV1FixtureFactory: FixtureFactory<EnchantmentCreationQueryApiV1> = new DeepCloneFixtureFactory(
  enchantmentCreationQueryApiV1,
);

export const enchantmentFindQueryApiV1: CardFindQueryApiV1 = {
  id: enchantmentFindQuery.id,
  types: CardTypeApiV1.Enchantment,
};

export const enchantmentFindQueryApiV1FixtureFactory: FixtureFactory<CardFindQueryApiV1> = new DeepCloneFixtureFactory(
  enchantmentFindQueryApiV1,
);

const gameCreationQueryApiV1: GameCreationQueryApiV1 = {
  round: game.round,
};

export const gameCreationQueryApiV1FixtureFactory: FixtureFactory<GameCreationQueryApiV1> = new DeepCloneFixtureFactory(
  gameCreationQueryApiV1,
);

export const landCreationQueryApiV1: LandCreationQueryApiV1 = {
  cost: {
    black: landCreationQuery.cost.black,
    blue: landCreationQuery.cost.blue,
    green: landCreationQuery.cost.green,
    red: landCreationQuery.cost.red,
    uncolored: landCreationQuery.cost.uncolored,
    white: landCreationQuery.cost.white,
  },
  type: CardTypeApiV1.Land,
};

export const landCreationQueryApiV1FixtureFactory: FixtureFactory<LandCreationQueryApiV1> = new DeepCloneFixtureFactory(
  landCreationQueryApiV1,
);

export const landFindQueryApiV1: CardFindQueryApiV1 = {
  id: landFindQuery.id,
  types: CardTypeApiV1.Land,
};

export const landFindQueryApiV1FixtureFactory: FixtureFactory<CardFindQueryApiV1> = new DeepCloneFixtureFactory(
  landFindQueryApiV1,
);
