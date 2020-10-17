import {
  DeepCloneFixtureFactory,
  FixtureFactory,
} from '../../../../../../common/test';
import { ExtendedGameSetupFindQuery } from '../../../../domain/query/setup/ExtendedGameSetupFindQuery';
import { ExtendedGameSetupsCreationQuery } from '../../../../domain/query/setup/ExtendedGameSetupCreationQuery';
import { PlayerSetup } from '../../../../domain/model/setup/PlayerSetup';
import { extendedGameSetup } from '../model/setup';

export const extendedGameSetupsCreationQuery: ExtendedGameSetupsCreationQuery = {
  format: extendedGameSetup.format,
  ownerUserId: extendedGameSetup.ownerUserId,
  playerSetups: extendedGameSetup.playerSetups,
  playerSlots: extendedGameSetup.playerSlots,
};

export const extendedGameSetupsCreationQueryFixtureFactory: FixtureFactory<ExtendedGameSetupsCreationQuery> = new DeepCloneFixtureFactory(
  extendedGameSetupsCreationQuery,
);

export const extendedGameSetupFindQuery: ExtendedGameSetupFindQuery = {
  format: extendedGameSetup.format,
  id: extendedGameSetup.id,
  ownerUserId: extendedGameSetup.ownerUserId,
  playerSetups: extendedGameSetup.playerSetups.map(
    (playerSetup: PlayerSetup) => {
      return { userId: playerSetup.userId };
    },
  ),
  playerSlots: extendedGameSetup.playerSlots,
};

export const extendedGameSetupFindQueryFixtureFactory: FixtureFactory<ExtendedGameSetupFindQuery> = new DeepCloneFixtureFactory(
  extendedGameSetupFindQuery,
);
