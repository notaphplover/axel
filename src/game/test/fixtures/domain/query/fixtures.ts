import {
  DeepCloneFixtureFactory,
  FixtureFactory,
} from '../../../../../common/test';
import { artifact, creature, enchantment, game, land } from '../model/fixtures';
import { ArtifactCreationQuery } from '../../../../domain/query/card/ArtifactCreationQuery';
import { CardType } from '../../../../domain/model/card/CardType';
import { CreatureCreationQuery } from '../../../../domain/query/card/CreatureCreationQuery';
import { EnchantmentCreationQuery } from '../../../../domain/query/card/EnchantmentCreationQuery';
import { GameCreationQuery } from '../../../../domain/query/GameCreationQuery';
import { GameFindQuery } from '../../../../domain/query/GameFindQuery';
import { LandCreationQuery } from '../../../../domain/query/card/LandCreationQuery';

export const artifactCreationQuery: ArtifactCreationQuery = {
  cost: artifact.cost,
  type: CardType.Artifact,
};

export const artifactCreationQueryFixtureFactory: FixtureFactory<ArtifactCreationQuery> = new DeepCloneFixtureFactory(
  artifactCreationQuery,
);

export const creatureCreationQuery: CreatureCreationQuery = {
  cost: creature.cost,
  type: CardType.Creature,
  power: creature.power,
  toughness: creature.toughness,
};

export const creatureCreationQueryFixtureFactory: FixtureFactory<CreatureCreationQuery> = new DeepCloneFixtureFactory(
  creatureCreationQuery,
);

export const enchantmentCreationQuery: EnchantmentCreationQuery = {
  cost: enchantment.cost,
  type: CardType.Enchantment,
};

export const enchantmentCreationQueryFixtureFactory: FixtureFactory<EnchantmentCreationQuery> = new DeepCloneFixtureFactory(
  enchantmentCreationQuery,
);

export const landCreationQuery: LandCreationQuery = {
  cost: land.cost,
  type: CardType.Land,
};

export const landCreationQueryFixtureFactory: FixtureFactory<LandCreationQuery> = new DeepCloneFixtureFactory(
  landCreationQuery,
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
