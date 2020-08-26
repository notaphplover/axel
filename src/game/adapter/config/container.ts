import { ContainerModule, interfaces } from 'inversify';
import { GAME_TYPES } from '../../domain/config/types';
import { gameDbModel } from '../db/model/GameDb';

export const gameContainer: ContainerModule = new ContainerModule(
  (bind: interfaces.Bind) => {
    bind(GAME_TYPES.model.GAME_DB_MODEL).toConstantValue(gameDbModel);
  },
);
