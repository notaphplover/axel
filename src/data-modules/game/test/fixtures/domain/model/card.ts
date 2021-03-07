import {
  DeepCloneFixtureFactory,
  FixtureFactory,
} from '../../../../../../common/test';
import { Card } from '../../../../domain/model/card/Card';
import { CardDetail } from '../../../../domain/model/card/CardDetail';
import { CardType } from '../../../../domain/model/card/CardType';
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

export const creature: Card = {
  cost: resource,
  detail: cardDetail,
  id: '5f5cb76243faa130688e00dc',
  power: 2,
  subtypes: [],
  supertypes: [],
  toughness: 3,
  types: [CardType.Creature],
};

export const creatureFixtureFactory: FixtureFactory<Card> = new DeepCloneFixtureFactory(
  creature,
);
