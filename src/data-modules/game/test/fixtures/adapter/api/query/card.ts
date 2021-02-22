import {
  DeepCloneFixtureFactory,
  FixtureFactory,
} from '../../../../../../../common/test';
import { CardTypeApiV1 } from '../../../../../adapter/api/model/card/CardTypeApiV1';
import { ArtifactCreationQueryApiV1 } from '../../../../../adapter/api/query/card/ArtifactCreationQueryApiV1';
import { CardFindQueryApiV1 } from '../../../../../adapter/api/query/card/CardFindQueryApiV1';
import { CreatureCreationQueryApiV1 } from '../../../../../adapter/api/query/card/CreatureCreationQueryApiV1';
import { EnchantmentCreationQueryApiV1 } from '../../../../../adapter/api/query/card/EnchantmentCreationQueryApiV1';
import { LandCreationQueryApiV1 } from '../../../../../adapter/api/query/card/LandCreationQueryApiV1';
import { LiveGameCreationQueryApiV1 } from '../../../../../adapter/api/query/live/LiveGameCreationQueryApiV1';
import {
  artifactFindQuery,
  creatureCreationQuery,
  creatureFindQuery,
  enchantmentFindQuery,
  landFindQuery,
} from '../../../domain/query/card';
import { cardDetailApiV1, resourceApiV1 } from '../model/card';
import { gameSetupApiV1 } from '../model/setup';

export const artifactCreationQueryApiV1: ArtifactCreationQueryApiV1 = {
  cost: resourceApiV1,
  detail: cardDetailApiV1,
  type: CardTypeApiV1.Artifact,
};

export const artifactCreationQueryApiV1FixtureFactory: FixtureFactory<ArtifactCreationQueryApiV1> = new DeepCloneFixtureFactory(
  artifactCreationQueryApiV1,
);

export const artifactFindQueryApiV1: CardFindQueryApiV1 = {
  id: artifactFindQuery.id,
  limit: artifactFindQuery.limit,
  offset: artifactFindQuery.offset,
  types: CardTypeApiV1.Artifact,
};

export const artifactFindQueryApiV1FixtureFactory: FixtureFactory<CardFindQueryApiV1> = new DeepCloneFixtureFactory(
  artifactFindQueryApiV1,
);

export const creatureCreationQueryApiV1: CreatureCreationQueryApiV1 = {
  cost: resourceApiV1,
  detail: cardDetailApiV1,
  power: creatureCreationQuery.power,
  toughness: creatureCreationQuery.toughness,
  type: CardTypeApiV1.Creature,
};

export const creatureCreationQueryApiV1FixtureFactory: FixtureFactory<CreatureCreationQueryApiV1> = new DeepCloneFixtureFactory(
  creatureCreationQueryApiV1,
);

export const creatureFindQueryApiV1: CardFindQueryApiV1 = {
  id: creatureFindQuery.id,
  limit: creatureFindQuery.limit,
  offset: creatureFindQuery.offset,
  types: CardTypeApiV1.Creature,
};

export const creatureFindQueryApiV1FixtureFactory: FixtureFactory<CardFindQueryApiV1> = new DeepCloneFixtureFactory(
  creatureFindQueryApiV1,
);

export const enchantmentCreationQueryApiV1: EnchantmentCreationQueryApiV1 = {
  cost: resourceApiV1,
  detail: cardDetailApiV1,
  type: CardTypeApiV1.Enchantment,
};

export const enchantmentCreationQueryApiV1FixtureFactory: FixtureFactory<EnchantmentCreationQueryApiV1> = new DeepCloneFixtureFactory(
  enchantmentCreationQueryApiV1,
);

export const enchantmentFindQueryApiV1: CardFindQueryApiV1 = {
  id: enchantmentFindQuery.id,
  limit: enchantmentFindQuery.limit,
  offset: enchantmentFindQuery.offset,
  types: CardTypeApiV1.Enchantment,
};

export const enchantmentFindQueryApiV1FixtureFactory: FixtureFactory<CardFindQueryApiV1> = new DeepCloneFixtureFactory(
  enchantmentFindQueryApiV1,
);

const liveGameCreationQueryApiV1: LiveGameCreationQueryApiV1 = {
  gameSetupIdId: gameSetupApiV1.id,
};

export const liveGameCreationQueryApiV1FixtureFactory: FixtureFactory<LiveGameCreationQueryApiV1> = new DeepCloneFixtureFactory(
  liveGameCreationQueryApiV1,
);

export const landCreationQueryApiV1: LandCreationQueryApiV1 = {
  cost: resourceApiV1,
  detail: cardDetailApiV1,
  type: CardTypeApiV1.Land,
};

export const landCreationQueryApiV1FixtureFactory: FixtureFactory<LandCreationQueryApiV1> = new DeepCloneFixtureFactory(
  landCreationQueryApiV1,
);

export const landFindQueryApiV1: CardFindQueryApiV1 = {
  id: landFindQuery.id,
  limit: landFindQuery.limit,
  offset: landFindQuery.offset,
  types: CardTypeApiV1.Land,
};

export const landFindQueryApiV1FixtureFactory: FixtureFactory<CardFindQueryApiV1> = new DeepCloneFixtureFactory(
  landFindQueryApiV1,
);
