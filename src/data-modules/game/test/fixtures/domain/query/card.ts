import {
  DeepCloneFixtureFactory,
  FixtureFactory,
} from '../../../../../../common/test';
import { CardType } from '../../../../domain/model/card/CardType';
import { CardFindQuery } from '../../../../domain/query/card/CardFindQuery';
import { CreatureCreationQuery } from '../../../../domain/query/card/CreatureCreationQuery';
import { LiveGameFindQuery } from '../../../../domain/query/live/LiveGameFindQuery';
import { artifact, creature, enchantment, land } from '../model/card';
import { liveGame } from '../model/live';

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

export const enchantmentFindQuery: Required<CardFindQuery> = {
  id: enchantment.id,
  limit: 1,
  offset: 0,
  types: CardType.Enchantment,
};

export const enchantmentFindQueryFixtureFactory: FixtureFactory<CardFindQuery> = new DeepCloneFixtureFactory(
  enchantmentFindQuery,
);

export const gameFindQuery: LiveGameFindQuery = {
  id: liveGame.id,
  round: liveGame.round,
};

export const gameFindQueryFixtureFactory: FixtureFactory<LiveGameFindQuery> = new DeepCloneFixtureFactory(
  gameFindQuery,
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
