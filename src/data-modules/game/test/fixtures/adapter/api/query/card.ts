import {
  DeepCloneFixtureFactory,
  FixtureFactory,
} from '../../../../../../../common/test';
import { CardTypeApiV1 } from '../../../../../adapter/api/model/card/CardTypeApiV1';
import { CardFindQueryApiV1 } from '../../../../../adapter/api/query/card/CardFindQueryApiV1';
import { CreatureCreationQueryApiV1 } from '../../../../../adapter/api/query/card/CreatureCreationQueryApiV1';
import { LiveGameCreationQueryApiV1 } from '../../../../../adapter/api/query/live/LiveGameCreationQueryApiV1';
import {
  cardCreationQuery,
  creatureFindQuery,
} from '../../../domain/query/card';
import { cardDetailApiV1, resourceApiV1 } from '../model/card';
import { gameSetupApiV1 } from '../model/setup';

export const creatureCreationQueryApiV1: CreatureCreationQueryApiV1 = {
  cost: resourceApiV1,
  detail: cardDetailApiV1,
  power: cardCreationQuery.power,
  toughness: cardCreationQuery.toughness,
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

const liveGameCreationQueryApiV1: LiveGameCreationQueryApiV1 = {
  gameSetupId: gameSetupApiV1.id,
};

export const liveGameCreationQueryApiV1FixtureFactory: FixtureFactory<LiveGameCreationQueryApiV1> = new DeepCloneFixtureFactory(
  liveGameCreationQueryApiV1,
);
