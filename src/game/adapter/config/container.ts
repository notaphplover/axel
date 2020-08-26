import { ContainerModule, interfaces } from 'inversify';
import { GAME_ADAPTER_TYPES } from '../../adapter/config/types';
import { GAME_PORT_TYPES } from '../../port/config/types';
import { GameFindQueryToGameDbFilterQueryPort } from '../../port/db/GameFindQueryToGameDbFilterQueryPort';
import { gameDbModel } from '../db/model/GameDb';

function bindAdapters(bind: interfaces.Bind) {
  bind(GAME_ADAPTER_TYPES.db.model.GAME_DB_MODEL).toConstantValue(gameDbModel);
}

function bindPorts(bind: interfaces.Bind) {
  bind(
    GAME_PORT_TYPES.db.GAME_FIND_QUERY_TO_GAME_DB_FILTER_QUERY,
  ).toConstantValue(GameFindQueryToGameDbFilterQueryPort);
}

export const gameContainer: ContainerModule = new ContainerModule(
  (bind: interfaces.Bind) => {
    bindAdapters(bind);
    bindPorts(bind);
  },
);
