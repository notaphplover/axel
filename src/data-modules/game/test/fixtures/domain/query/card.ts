import {
  DeepCloneFixtureFactory,
  FixtureFactory,
} from '../../../../../../common/test';
import { CardType } from '../../../../domain/model/card/CardType';
import { CardFindQuery } from '../../../../domain/query/card/CardFindQuery';
import { CreatureCreationQuery } from '../../../../domain/query/card/CreatureCreationQuery';
import { LiveGameFindQuery } from '../../../../domain/query/live/LiveGameFindQuery';
import { creature } from '../model/card';
import { liveGame } from '../model/live';

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

export const gameFindQuery: LiveGameFindQuery = {
  id: liveGame.id,
  round: liveGame.round,
};

export const gameFindQueryFixtureFactory: FixtureFactory<LiveGameFindQuery> = new DeepCloneFixtureFactory(
  gameFindQuery,
);
