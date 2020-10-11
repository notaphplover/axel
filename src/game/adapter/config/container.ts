import { ContainerModule, interfaces } from 'inversify';
import { ArtifactCreationQueryToArtifactDbsConverter } from '../db/converter/card/ArtifactCreationQueryToArtifactDbsConverter';
import { ArtifactDbInsertRepository } from '../db/repository/card/ArtifactDbInsertRepository';
import { ArtifactDbToArtifactConverter } from '../db/converter/card/ArtifactDbToArtifactConverter';
import { CardCreationQueryApiV1ToCardCreationQueryConverter } from '../api/converter/card/CardCreationQueryApiV1ToCardCreationQueryConverter';
import { CardCreationQueryApiV1Validator } from '../api/validator/card/CardCreationQueryApiV1Validator';
import { CardDbSearchRepository } from '../db/repository/card/CardDbSearchRepository';
import { CardDbToCardConverter } from '../db/converter/card/CardDbToCardConverter';
import { CardDeckCreationQueryToCardDeckDbsConverter } from '../db/converter/card/CardDeckCreationQueryToCardDeckDbsConverter';
import { CardDeckDbToCardDeckConverter } from '../db/converter/card/CardDeckDbToCardDeckConverter';
import { CardDetailApiV1ToCardDetailConverter } from '../api/converter/card/CardDetailApiV1ToCardDetailConverter';
import { CardDetailToCardDetailV1Converter } from '../api/converter/card/CardDetailToCardDetailApiV1Converter';
import { CardFindQueryApiV1ToCardFindQueryConverter } from '../api/converter/card/CardFindQueryApiV1ToCardFindQueryConverter';
import { CardFindQueryApiV1Validator } from '../api/validator/card/CardFindQueryApiV1Validator';
import { CardFindQueryToCardDbFilterQueryConverter } from '../db/converter/card/CardFindQueryToCardDbFilterQueryConverter';
import { CardRouter } from '../server/router/card/CardRouter';
import { CardToCardApiV1Converter } from '../api/converter/card/CardToCardApiV1Converter';
import { CardTypeApiV1ToCardTypeConverter } from '../api/converter/card/CardTypeApiV1ToCardTypeConverter';
import { CardTypeToCardTypeApiV1Converter } from '../api/converter/card/CardTypeToCardTypeApiV1Converter';
import { CreateArtifactsInteractor } from '../../domain/interactor/card/CreateArtifactsInteractor';
import { CreateCardsInteractor } from '../../domain/interactor/card/CreateCardsInteractor';
import { CreateCreaturesInteractor } from '../../domain/interactor/card/CreateCreaturesInteractor';
import { CreateEnchantmentsInteractor } from '../../domain/interactor/card/CreateEnchantmentsInteractor';
import { CreateGamesInteractor } from '../../domain/interactor/CreateGamesInteractor';
import { CreateLandsInteractor } from '../../domain/interactor/card/CreateLandsInteractor';
import { CreatureCreationQueryToCreatureDbsConverter } from '../db/converter/card/CreatureCreationQueryToCreatureDbsConverter';
import { CreatureDbInsertRepository } from '../db/repository/card/CreatureDbInsertRepository';
import { CreatureDbToCreatureConverter } from '../db/converter/card/CreatureDbToCreatureConverter';
import { EnchantmentCreationQueryToEnchantmentDbsConverter } from '../db/converter/card/EnchantmentCreationQueryToEnchantmentDbsConverter';
import { EnchantmentDbInsertRepository } from '../db/repository/card/EnchantmentDbInsertRepository';
import { EnchantmentDbToEnchantmentConverter } from '../db/converter/card/EnchantmentDbToEnchantmentConverter';
import { FindCardsInteractor } from '../../domain/interactor/card/FindCardsInteractor';
import { FindGameInteractor } from '../../domain/interactor/FindGameInteractor';
import { GAME_ADAPTER_TYPES } from '../../adapter/config/types';
import { GAME_DOMAIN_TYPES } from '../../domain/config/types';
import { GameCreationQueryApiV1Validator } from '../api/validator/GameCreationQueryApiV1Validator';
import { GameCreationQueryToGameDbsConverter } from '../db/converter/GameCreationQueryToGameDbsConverter';
import { GameDbInsertRepository } from '../db/repository/GameDbInsertRepository';
import { GameDbSearchReporitory } from '../db/repository/GameDbSearchRepository';
import { GameDbToGameConverter } from '../db/converter/GameDbToGameConverter';
import { GameFindQueryToGameDbFilterQueryConverter } from '../db/converter/GameFindQueryToGameDbFilterQueryConverter';
import { GameRouter } from '../server/router/GameRouter';
import { GameToGameApiV1Converter } from '../api/converter/GameToGameApiV1Converter';
import { GetCardsV1RequestHandler } from '../server/reqHandler/card/GetCardsV1RequestHandler';
import { GetGameByIdV1RequestHandler } from '../server/reqHandler/GetGameByIdV1RequestHandler';
import { LandCreationQueryToLandDbsConverter } from '../db/converter/card/LandCreationQueryToLandDbsConverter';
import { LandDbInsertRepository } from '../db/repository/card/LandDbInsertRepository';
import { LandDbToLandConverter } from '../db/converter/card/LandDbToLandConverter';
import { PostCardV1RequestHandler } from '../server/reqHandler/card/PostCardV1RequestHandler';
import { PostGameV1RequestHandler } from '../server/reqHandler/PostGameV1RequestHandler';
import { ResourceApiV1ToResourceConverter } from '../api/converter/card/ResourceApiV1ToResourceConverter';
import { ResourceToResourceApiV1Converter } from '../api/converter/card/ResourceToResourceApiV1Converter';
import { artifactDbModel } from '../db/model/card/ArtifactDb';
import { cardDbModel } from '../db/model/card/CardDb';
import { cardDeckDbModel } from '../db/model/card/CardDeckDb';
import { creatureDbModel } from '../db/model/card/CreatureDb';
import { enchantmentDbModel } from '../db/model/card/EnchantmentDb';
import { gameDbModel } from '../db/model/GameDb';
import { landDbModel } from '../db/model/card/LandDb';

function bindAdapters(bind: interfaces.Bind) {
  bind(GAME_ADAPTER_TYPES.api.converter.GAME_TO_GAME_API_V1_CONVERTER).to(
    GameToGameApiV1Converter,
  );
  bind(
    GAME_ADAPTER_TYPES.api.converter.card
      .CARD_CREATION_QUERY_API_V1_TO_CARD_CREATION_QUERY_API_CONVERTER,
  ).to(CardCreationQueryApiV1ToCardCreationQueryConverter);
  bind(
    GAME_ADAPTER_TYPES.api.converter.card
      .CARD_DETAIL_API_V1_TO_CARD_DETAIL_CONVERTER,
  ).to(CardDetailApiV1ToCardDetailConverter);
  bind(
    GAME_ADAPTER_TYPES.api.converter.card
      .CARD_DETAIL_TO_CARD_DETAIL_API_V1_CONVERTER,
  ).to(CardDetailToCardDetailV1Converter);
  bind(
    GAME_ADAPTER_TYPES.api.converter.card
      .CARD_FIND_QUERY_API_V1_TO_CARD_FIND_QUERY_CONVERTER,
  ).to(CardFindQueryApiV1ToCardFindQueryConverter);
  bind(
    GAME_ADAPTER_TYPES.api.converter.card
      .CARD_TYPE_API_V1_TO_CARD_TYPE_CONVERTER,
  ).to(CardTypeApiV1ToCardTypeConverter);
  bind(GAME_ADAPTER_TYPES.api.converter.card.CARD_TO_CARD_API_V1_CONVERTER).to(
    CardToCardApiV1Converter,
  );
  bind(
    GAME_ADAPTER_TYPES.api.converter.card
      .CARD_TYPE_TO_CARD_TYPE_API_V1_CONVERTER,
  ).to(CardTypeToCardTypeApiV1Converter);
  bind(
    GAME_ADAPTER_TYPES.api.converter.card.RESOURCE_API_V1_TO_RESOURCE_CONVERTER,
  ).to(ResourceApiV1ToResourceConverter);
  bind(
    GAME_ADAPTER_TYPES.api.converter.card.RESOURCE_TO_RESOURCE_API_V1_CONVERTER,
  ).to(ResourceToResourceApiV1Converter);

  bind(
    GAME_ADAPTER_TYPES.api.validator.card.CARD_CREATION_QUERY_API_V1_VALIDATOR,
  ).to(CardCreationQueryApiV1Validator);
  bind(
    GAME_ADAPTER_TYPES.api.validator.card.CARD_FIND_QUERY_API_V1_VALIDATOR,
  ).to(CardFindQueryApiV1Validator);

  bind(GAME_ADAPTER_TYPES.db.converter.GAME_DB_TO_GAME_CONVERTER).to(
    GameDbToGameConverter,
  );
  bind(
    GAME_ADAPTER_TYPES.db.converter
      .GAME_FIND_QUERY_TO_GAME_DB_FILTER_QUERY_CONVERTER,
  ).to(GameFindQueryToGameDbFilterQueryConverter);
  bind(
    GAME_ADAPTER_TYPES.db.converter.GAME_CREATION_QUERY_TO_GAME_DBS_CONVERTER,
  ).to(GameCreationQueryToGameDbsConverter);
  bind(
    GAME_ADAPTER_TYPES.db.converter.card
      .ARTIFACT_CREATION_QUERY_TO_ARTIFACT_DBS_CONVERTER,
  ).to(ArtifactCreationQueryToArtifactDbsConverter);
  bind(
    GAME_ADAPTER_TYPES.db.converter.card.ARTIFACT_DB_TO_ARTIFACT_CONVERTER,
  ).to(ArtifactDbToArtifactConverter);
  bind(GAME_ADAPTER_TYPES.db.converter.card.CARD_DB_TO_CARD_CONVERTER).to(
    CardDbToCardConverter,
  );
  bind(
    GAME_ADAPTER_TYPES.db.converter.card
      .CARD_DECK_CREATION_QUERY_TO_CARD_DBS_CONVERTER,
  ).to(CardDeckCreationQueryToCardDeckDbsConverter);
  bind(
    GAME_ADAPTER_TYPES.db.converter.card.CARD_DECK_DB_TO_CARD_DECK_CONVERTER,
  ).to(CardDeckDbToCardDeckConverter);
  bind(
    GAME_ADAPTER_TYPES.db.converter.card
      .CARD_FIND_QUERY_TO_CARD_DB_FILTER_QUERY_CONVERTER,
  ).to(CardFindQueryToCardDbFilterQueryConverter);
  bind(
    GAME_ADAPTER_TYPES.db.converter.card
      .CREATURE_CREATION_QUERY_TO_CREATURE_DBS_CONVERTER,
  ).to(CreatureCreationQueryToCreatureDbsConverter);
  bind(
    GAME_ADAPTER_TYPES.db.converter.card.CREATURE_DB_TO_CREATURE_CONVERTER,
  ).to(CreatureDbToCreatureConverter);
  bind(
    GAME_ADAPTER_TYPES.db.converter.card
      .ENCHANTMENT_CREATION_QUERY_TO_ENCHANTMENT_DBS_CONVERTER,
  ).to(EnchantmentCreationQueryToEnchantmentDbsConverter);
  bind(
    GAME_ADAPTER_TYPES.db.converter.card
      .ENCHANTMENT_DB_TO_ENCHANTMENT_CONVERTER,
  ).to(EnchantmentDbToEnchantmentConverter);
  bind(
    GAME_ADAPTER_TYPES.db.converter.card
      .LAND_CREATION_QUERY_TO_LAND_DBS_CONVERTER,
  ).to(LandCreationQueryToLandDbsConverter);
  bind(GAME_ADAPTER_TYPES.db.converter.card.LAND_DB_TO_LAND_CONVERTER).to(
    LandDbToLandConverter,
  );

  bind(GAME_ADAPTER_TYPES.db.model.GAME_DB_MODEL).toConstantValue(gameDbModel);
  bind(GAME_ADAPTER_TYPES.db.model.card.ARTIFACT_DB_MODEL).toConstantValue(
    artifactDbModel,
  );
  bind(GAME_ADAPTER_TYPES.db.model.card.CARD_DB_MODEL).toConstantValue(
    cardDbModel,
  );
  bind(GAME_ADAPTER_TYPES.db.model.card.CARD_DECK_DB_MODEL).toConstantValue(
    cardDeckDbModel,
  );
  bind(GAME_ADAPTER_TYPES.db.model.card.CREATURE_DB_MODEL).toConstantValue(
    creatureDbModel,
  );
  bind(GAME_ADAPTER_TYPES.db.model.card.ENCHANTMENT_DB_MODEL).toConstantValue(
    enchantmentDbModel,
  );

  bind(GAME_ADAPTER_TYPES.db.model.card.LAND_DB_MODEL).toConstantValue(
    landDbModel,
  );
  bind(
    GAME_ADAPTER_TYPES.server.reqHandler.GET_GAME_BY_ID_V1_REQUEST_HANDLER,
  ).to(GetGameByIdV1RequestHandler);
  bind(GAME_ADAPTER_TYPES.server.reqHandler.POST_GAME_V1_REQUEST_HANDLER).to(
    PostGameV1RequestHandler,
  );
  bind(
    GAME_ADAPTER_TYPES.server.reqHandler.card.GET_CARDS_V1_REQUEST_HANDLER,
  ).to(GetCardsV1RequestHandler);
  bind(
    GAME_ADAPTER_TYPES.server.reqHandler.card.POST_CARD_V1_REQUEST_HANDLER,
  ).to(PostCardV1RequestHandler);

  bind(GAME_ADAPTER_TYPES.server.router.GAME_ROUTER).to(GameRouter);
  bind(GAME_ADAPTER_TYPES.server.router.card.CARD_ROUTER).to(CardRouter);
  bind(GAME_ADAPTER_TYPES.validator.GAME_CREATION_QUERY_API_V1_VALIDATOR)
    .to(GameCreationQueryApiV1Validator)
    .inSingletonScope();
}

function bindDomain(bind: interfaces.Bind) {
  bind(GAME_DOMAIN_TYPES.interactor.CREATE_GAMES_INTERACTOR).to(
    CreateGamesInteractor,
  );
  bind(GAME_DOMAIN_TYPES.interactor.FIND_GAME_INTERACTOR).to(
    FindGameInteractor,
  );
  bind(GAME_DOMAIN_TYPES.interactor.card.CREATE_ARTIFACTS_INTERACTOR).to(
    CreateArtifactsInteractor,
  );
  bind(GAME_DOMAIN_TYPES.interactor.card.CREATE_CARDS_INTERACTOR).to(
    CreateCardsInteractor,
  );
  bind(GAME_DOMAIN_TYPES.interactor.card.CREATE_CREATURES_INTERACTOR).to(
    CreateCreaturesInteractor,
  );
  bind(GAME_DOMAIN_TYPES.interactor.card.CREATE_ENCHANTMENTS_INTERACTOR).to(
    CreateEnchantmentsInteractor,
  );
  bind(GAME_DOMAIN_TYPES.interactor.card.CREATE_LANDS_INTERACTOR).to(
    CreateLandsInteractor,
  );
  bind(GAME_DOMAIN_TYPES.interactor.card.FIND_CARDS_INTERACTOR).to(
    FindCardsInteractor,
  );
  bind(GAME_DOMAIN_TYPES.repository.GAME_INSERT_REPOSITORY).to(
    GameDbInsertRepository,
  );
  bind(GAME_DOMAIN_TYPES.repository.GAME_SEARCH_REPOSITORY).to(
    GameDbSearchReporitory,
  );
  bind(GAME_DOMAIN_TYPES.repository.card.ARTIFACT_INSERT_REPOSITORY).to(
    ArtifactDbInsertRepository,
  );
  bind(GAME_DOMAIN_TYPES.repository.card.CARD_SEARCH_REPOSITORY).to(
    CardDbSearchRepository,
  );
  bind(GAME_DOMAIN_TYPES.repository.card.CREATURE_INSERT_REPOSITORY).to(
    CreatureDbInsertRepository,
  );
  bind(GAME_DOMAIN_TYPES.repository.card.ENCHANTMENT_INSERT_REPOSITORY).to(
    EnchantmentDbInsertRepository,
  );
  bind(GAME_DOMAIN_TYPES.repository.card.LAND_INSERT_REPOSITORY).to(
    LandDbInsertRepository,
  );
}

export const gameContainer: ContainerModule = new ContainerModule(
  (bind: interfaces.Bind) => {
    bindAdapters(bind);
    bindDomain(bind);
  },
);
