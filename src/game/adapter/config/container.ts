import { ContainerModule, interfaces } from 'inversify';
import { GAME_ADAPTER_TYPES } from '../../adapter/config/types';
import { GAME_PORT_TYPES } from '../../port/config/types';
import { GameDbSearchReporitory } from '../db/repository/GameDbSearchRepository';
import { GameDbToGamePort } from '../../port/db/GameDbToGamePort';
import { GameFindQueryToGameDbFilterQueryPort } from '../../port/db/GameFindQueryToGameDbFilterQueryPort';
import { gameDbModel } from '../db/model/GameDb';

function bindAdapters(bind: interfaces.Bind) {
  bind(GAME_ADAPTER_TYPES.db.model.GAME_DB_MODEL).toConstantValue(gameDbModel);
  bind(GAME_ADAPTER_TYPES.db.repository.GAME_DB_SEARCH_REPOSITORY).to(
    GameDbSearchReporitory,
  );
}

function bindPorts(bind: interfaces.Bind) {
  bind(GAME_PORT_TYPES.db.GAME_DB_TO_GAME_PORT).to(GameDbToGamePort);
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
