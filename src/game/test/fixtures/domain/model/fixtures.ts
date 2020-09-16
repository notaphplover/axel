import {
  DeepCloneFixtureFactory,
  FixtureFactory,
} from '../../../../../common/test';
import { Game } from '../../../../domain/model/Game';
import { Resource } from '../../../../domain/model/card/Resource';

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

export const game: Game = {
  id: '5f5cb76273fd1130685e00dc',
  round: 2,
};

export const gameFixtureFactory: FixtureFactory<Game> = new DeepCloneFixtureFactory(
  game,
);
