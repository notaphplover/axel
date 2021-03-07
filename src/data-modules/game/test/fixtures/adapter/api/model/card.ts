import {
  DeepCloneFixtureFactory,
  FixtureFactory,
} from '../../../../../../../common/test';
import { CardApiV1 } from '../../../../../adapter/api/model/card/CardApiV1';
import { CardDetailApiV1 } from '../../../../../adapter/api/model/card/CardDetailApiV1';
import { CardTypeApiV1 } from '../../../../../adapter/api/model/card/CardTypeApiV1';
import { ResourceApiV1 } from '../../../../../adapter/api/model/card/ResourceApiV1';
import { cardDetail, creature, resource } from '../../../domain/model/card';

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

export const resourceApiV1FixtureFactory: FixtureFactory<ResourceApiV1> = new DeepCloneFixtureFactory(
  resourceApiV1,
);

export const creatureApiV1: CardApiV1 = {
  cost: resourceApiV1,
  detail: cardDetailApiV1,
  id: creature.id,
  power: creature.power,
  subtypes: [],
  supertypes: [],
  toughness: creature.toughness,
  types: [CardTypeApiV1.Creature],
};

export const creatureApiV1FixtureFactory: FixtureFactory<CardApiV1> = new DeepCloneFixtureFactory(
  creatureApiV1,
);
