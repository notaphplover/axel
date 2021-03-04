import {
  DeepCloneFixtureFactory,
  FixtureFactory,
} from '../../../../../../../common/test';
import { ArtifactApiV1 } from '../../../../../adapter/api/model/card/ArtifactApiV1';
import { CardDetailApiV1 } from '../../../../../adapter/api/model/card/CardDetailApiV1';
import { CardTypeApiV1 } from '../../../../../adapter/api/model/card/CardTypeApiV1';
import { CreatureApiV1 } from '../../../../../adapter/api/model/card/CreatureApiV1';
import { EnchantmentApiV1 } from '../../../../../adapter/api/model/card/EnchantmentApiV1';
import { LandApiV1 } from '../../../../../adapter/api/model/card/LandApiV1';
import { ResourceApiV1 } from '../../../../../adapter/api/model/card/ResourceApiV1';
import {
  artifact,
  cardDetail,
  creature,
  enchantment,
  land,
  resource,
} from '../../../domain/model/card';

export const cardDetailApiV1: CardDetailApiV1 = {
  description: cardDetail.description,
  image: cardDetail.image,
  title: cardDetail.title,
};

export const cardDetailApiV1FixtureFactory: FixtureFactory<CardDetailApiV1> = new DeepCloneFixtureFactory(
  cardDetailApiV1,
);

export const resourceApiV1: ResourceApiV1 = {
  black: resource.black,
  blue: resource.blue,
  green: resource.green,
  red: resource.red,
  uncolored: resource.uncolored,
  white: resource.white,
};

export const artifactApiV1: ArtifactApiV1 = {
  cost: resourceApiV1,
  detail: cardDetailApiV1,
  id: artifact.id,
  subtypes: [],
  supertypes: [],
  type: CardTypeApiV1.Artifact,
};

export const artifactApiV1FixtureFactory: FixtureFactory<ArtifactApiV1> = new DeepCloneFixtureFactory(
  artifactApiV1,
);

export const creatureApiV1: CreatureApiV1 = {
  cost: resourceApiV1,
  detail: cardDetailApiV1,
  id: creature.id,
  power: creature.power,
  subtypes: [],
  supertypes: [],
  toughness: creature.toughness,
  type: CardTypeApiV1.Creature,
};

export const creatureApiV1FixtureFactory: FixtureFactory<CreatureApiV1> = new DeepCloneFixtureFactory(
  creatureApiV1,
);

export const enchantmentApiV1: EnchantmentApiV1 = {
  cost: resourceApiV1,
  detail: cardDetailApiV1,
  id: enchantment.id,
  subtypes: [],
  supertypes: [],
  type: CardTypeApiV1.Enchantment,
};

export const enchantmentApiV1FixtureFactory: FixtureFactory<EnchantmentApiV1> = new DeepCloneFixtureFactory(
  enchantmentApiV1,
);

export const landApiV1: LandApiV1 = {
  cost: resourceApiV1,
  detail: cardDetailApiV1,
  id: land.id,
  subtypes: [],
  supertypes: [],
  type: CardTypeApiV1.Land,
};

export const landApiV1FixtureFactory: FixtureFactory<LandApiV1> = new DeepCloneFixtureFactory(
  landApiV1,
);
