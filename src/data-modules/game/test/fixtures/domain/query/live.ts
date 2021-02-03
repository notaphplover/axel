import {
  DeepCloneFixtureFactory,
  FixtureFactory,
} from '../../../../../../common/test';
import { LiveGameFindQuery } from '../../../../domain/query/live/LiveGameFindQuery';
import { liveGame } from '../model';

export const liveGameFindQuery: LiveGameFindQuery = {
  id: liveGame.id,
  round: liveGame.round,
};

export const liveGameFindQueryFixtureFactory: FixtureFactory<LiveGameFindQuery> = new DeepCloneFixtureFactory(
  liveGameFindQuery,
);
