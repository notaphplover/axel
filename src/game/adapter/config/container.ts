import { ContainerModule, interfaces } from 'inversify';
import { FindGameInteractor } from '../../domain/interactor/FindGameInteractor';
import { GAME_ADAPTER_TYPES } from '../../adapter/config/types';
import { GAME_DOMAIN_TYPES } from '../../domain/config/types';
import { GameDbSearchReporitory } from '../db/repository/GameDbSearchRepository';
import { GameDbToGameConverter } from '../db/converter/GameDbToGameConverter';
import { GameFindQueryToGameDbFilterQueryConverter } from '../db/converter/GameFindQueryToGameDbFilterQueryConverter';
import { GameRouter } from '../server/router/GameRouter';
import { GameToGameApiV1Converter } from '../api/converter/GameToGameApiV1Converter';
import { GetGameByIdV1RequestHandler } from '../server/reqHandler/GetGameByIdV1RequestHandler';
import { gameDbModel } from '../db/model/GameDb';

function bindAdapters(bind: interfaces.Bind) {
  bind(GAME_ADAPTER_TYPES.api.converter.GAME_TO_GAME_API_V1_CONVERTER).to(
    GameToGameApiV1Converter,
  );
  bind(GAME_ADAPTER_TYPES.db.converter.GAME_DB_TO_GAME_CONVERTER).to(
    GameDbToGameConverter,
  );
  bind(
    GAME_ADAPTER_TYPES.db.converter
      .GAME_FIND_QUERY_TO_GAME_DB_FILTER_QUERY_CONVERTER,
  ).to(GameFindQueryToGameDbFilterQueryConverter);
  bind(GAME_ADAPTER_TYPES.db.model.GAME_DB_MODEL).toConstantValue(gameDbModel);
  bind(
    GAME_ADAPTER_TYPES.server.reqHandler.GET_GAME_BY_ID_V1_REQUEST_HANDLER,
  ).to(GetGameByIdV1RequestHandler);
  bind(GAME_ADAPTER_TYPES.server.router.GAME_ROUTER).to(GameRouter);
}

function bindDomain(bind: interfaces.Bind) {
  bind(GAME_DOMAIN_TYPES.interactor.FIND_GAME_INTERACTOR).to(
    FindGameInteractor,
  );
  bind(GAME_DOMAIN_TYPES.repository.GAME_SEARCH_REPOSITORY).to(
    GameDbSearchReporitory,
  );
}

export const gameContainer: ContainerModule = new ContainerModule(
  (bind: interfaces.Bind) => {
    bindAdapters(bind);
    bindDomain(bind);
  },
);
