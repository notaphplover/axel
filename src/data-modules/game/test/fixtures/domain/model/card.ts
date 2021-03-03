import {
  DeepCloneFixtureFactory,
  FixtureFactory,
} from '../../../../../../common/test';
import { Artifact } from '../../../../domain/model/card/Artifact';
import { CardDetail } from '../../../../domain/model/card/CardDetail';
import { CardType } from '../../../../domain/model/card/CardType';
import { Creature } from '../../../../domain/model/card/Creature';
import { Enchantment } from '../../../../domain/model/card/Enchantment';
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
  subtypes: [],
  supertypes: [],
  type: CardType.Artifact,
};

export const artifactFixtureFactory: FixtureFactory<Artifact> = new DeepCloneFixtureFactory(
  artifact,
);

export const creature: Creature = {
  cost: resource,
  detail: cardDetail,
  id: '5f5cb76243faa130688e00dc',
  power: 2,
  subtypes: [],
  supertypes: [],
  toughness: 3,
  type: CardType.Creature,
};

export const creatureFixtureFactory: FixtureFactory<Creature> = new DeepCloneFixtureFactory(
  creature,
);

export const enchantment: Enchantment = {
  cost: resource,
  detail: cardDetail,
  id: '5f5cb76243fda130685e00dc',
  subtypes: [],
  supertypes: [],
  type: CardType.Enchantment,
};

export const enchantmentFixtureFactory: FixtureFactory<Enchantment> = new DeepCloneFixtureFactory(
  enchantment,
);

export const land: Land = {
  cost: resource,
  detail: cardDetail,
  id: '5f5cb76c43fda630685e00dc',
  subtypes: [],
  supertypes: [],
  type: CardType.Land,
};

export const landFixtureFactory: FixtureFactory<Land> = new DeepCloneFixtureFactory(
  land,
);
