import {
  DeepCloneFixtureFactory,
  FixtureFactory,
} from '../../../../../../common/test';
import { artifact, creature, enchantment, land } from '../model/card';
import { ArtifactCreationQuery } from '../../../../domain/query/card/ArtifactCreationQuery';
import { CardFindQuery } from '../../../../domain/query/card/CardFindQuery';
import { CardType } from '../../../../domain/model/card/CardType';
import { CreatureCreationQuery } from '../../../../domain/query/card/CreatureCreationQuery';
import { EnchantmentCreationQuery } from '../../../../domain/query/card/EnchantmentCreationQuery';
import { GameCreationQuery } from '../../../../domain/query/GameCreationQuery';
import { GameFindQuery } from '../../../../domain/query/GameFindQuery';
import { LandCreationQuery } from '../../../../domain/query/card/LandCreationQuery';
import { game } from '../model';

export const artifactCreationQuery: ArtifactCreationQuery = {
  cost: artifact.cost,
  detail: artifact.detail,
  type: CardType.Artifact,
};

export const artifactCreationQueryFixtureFactory: FixtureFactory<ArtifactCreationQuery> = new DeepCloneFixtureFactory(
  artifactCreationQuery,
);

export const artifactFindQuery: Required<CardFindQuery> = {
  id: artifact.id,
  limit: 1,
  offset: 0,
  types: CardType.Artifact,
};

export const artifactFindQueryFixtureFactory: FixtureFactory<CardFindQuery> = new DeepCloneFixtureFactory(
  artifactFindQuery,
);

export const creatureCreationQuery: CreatureCreationQuery = {
  cost: creature.cost,
  detail: creature.detail,
  type: CardType.Creature,
  power: creature.power,
  toughness: creature.toughness,
};

export const creatureCreationQueryFixtureFactory: FixtureFactory<CreatureCreationQuery> = new DeepCloneFixtureFactory(
  creatureCreationQuery,
);

export const creatureFindQuery: Required<CardFindQuery> = {
  id: creature.id,
  limit: 1,
  offset: 0,
  types: CardType.Creature,
};

export const creatureFindQueryFixtureFactory: FixtureFactory<CardFindQuery> = new DeepCloneFixtureFactory(
  creatureFindQuery,
);

export const enchantmentCreationQuery: EnchantmentCreationQuery = {
  cost: enchantment.cost,
  detail: enchantment.detail,
  type: CardType.Enchantment,
};

export const enchantmentCreationQueryFixtureFactory: FixtureFactory<EnchantmentCreationQuery> = new DeepCloneFixtureFactory(
  enchantmentCreationQuery,
);

export const enchantmentFindQuery: Required<CardFindQuery> = {
  id: enchantment.id,
  limit: 1,
  offset: 0,
  types: CardType.Enchantment,
};

export const enchantmentFindQueryFixtureFactory: FixtureFactory<CardFindQuery> = new DeepCloneFixtureFactory(
  enchantmentFindQuery,
);

export const gameCreationQuery: GameCreationQuery = {
  round: game.round,
};

export const gameCreationQueryFixtureFactory: FixtureFactory<GameCreationQuery> = new DeepCloneFixtureFactory(
  gameCreationQuery,
);

export const gameFindQuery: GameFindQuery = {
  id: game.id,
  round: game.round,
};

export const gameFindQueryFixtureFactory: FixtureFactory<GameFindQuery> = new DeepCloneFixtureFactory(
  gameFindQuery,
);

export const landCreationQuery: LandCreationQuery = {
  cost: land.cost,
  detail: land.detail,
  type: CardType.Land,
};

export const landCreationQueryFixtureFactory: FixtureFactory<LandCreationQuery> = new DeepCloneFixtureFactory(
  landCreationQuery,
);

export const landFindQuery: Required<CardFindQuery> = {
  id: land.id,
  limit: 1,
  offset: 0,
  types: CardType.Land,
};

export const landFindQueryFixtureFactory: FixtureFactory<CardFindQuery> = new DeepCloneFixtureFactory(
  landFindQuery,
);
