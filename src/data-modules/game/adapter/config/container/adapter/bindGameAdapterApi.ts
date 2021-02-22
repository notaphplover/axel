import { interfaces } from 'inversify';

import { CardCreationQueryApiV1ToCardCreationQueryConverter } from '../../../api/converter/card/CardCreationQueryApiV1ToCardCreationQueryConverter';
import { CardDetailApiV1ToCardDetailConverter } from '../../../api/converter/card/CardDetailApiV1ToCardDetailConverter';
import { CardDetailToCardDetailV1Converter } from '../../../api/converter/card/CardDetailToCardDetailApiV1Converter';
import { CardFindQueryApiV1ToCardFindQueryConverter } from '../../../api/converter/card/CardFindQueryApiV1ToCardFindQueryConverter';
import { CardToCardApiV1Converter } from '../../../api/converter/card/CardToCardApiV1Converter';
import { CardTypeApiV1ToCardTypeConverter } from '../../../api/converter/card/CardTypeApiV1ToCardTypeConverter';
import { CardTypeToCardTypeApiV1Converter } from '../../../api/converter/card/CardTypeToCardTypeApiV1Converter';
import { ResourceApiV1ToResourceConverter } from '../../../api/converter/card/ResourceApiV1ToResourceConverter';
import { ResourceToResourceApiV1Converter } from '../../../api/converter/card/ResourceToResourceApiV1Converter';
import { CardDeckCreationQueryApiV1ToCardDeckCreationQueryConverter } from '../../../api/converter/deck/CardDeckCreationQueryApiV1ToCardDeckCreationQueryConverter';
import { CardDeckFindQueryApiV1ToCardDeckFindQueryConverter } from '../../../api/converter/deck/CardDeckFindQueryApiV1ToCardDeckFindQueryConverter';
import { CardDeckSectionsApiV1ToCardDeckSectionsConverter } from '../../../api/converter/deck/CardDeckSectionsApiV1ToCardDeckSectionsConverter';
import { CardDeckSectionsToCardDeckSectionsApiV1Converter } from '../../../api/converter/deck/CardDeckSectionsToCardDeckSectionsApiV1Converter';
import { CardDeckToCardDeckApiV1Converter } from '../../../api/converter/deck/CardDeckToCardDeckApiV1Converter';
import { CardSetReferencesApiV1ToCardSetReferencesConverter } from '../../../api/converter/deck/CardSetReferencesApiV1ToCardSetReferencesConverter';
import { CardSetReferencesToCardSetReferencesApiV1Converter } from '../../../api/converter/deck/CardSetReferencesToCardSetReferencesApiV1Converter';
import { GameFormatApiV1ToGameFormatConverter } from '../../../api/converter/GameFormatApiV1ToGameFormatConverter';
import { GameFormatToGameFormatApiV1Converter } from '../../../api/converter/GameFormatToGameFormatApiV1Converter';
import { LiveGameCreationQueryApiV1ToLiveGameCreationQueryConverter } from '../../../api/converter/live/LiveGameCreationQueryApiV1ToLiveGameCreationQueryConverter';
import { LiveGameFindQueryApiV1ToLiveGameFindQueryConverter } from '../../../api/converter/live/LiveGameFindQueryApiV1ToLiveGameFindQueryConverter';
import { LiveGameToLiveGameApiV1Converter } from '../../../api/converter/live/LiveGameToLiveGameApiV1Converter';
import { GameSetupCreationQueryApiV1ToGameSetupCreationQueryConverter } from '../../../api/converter/setup/GameSetupCreationQueryApiV1ToGameSetupCreationQueryConverter';
import { GameSetupFindQueryApiV1ToGameSetupFindQueryConverter } from '../../../api/converter/setup/GameSetupFindQueryApiV1ToGameSetupFindQueryConverter';
import { GameSetupFindQueryPlayerSetupApiV1ToGameSetupFindQueryPlayerSetupConverter } from '../../../api/converter/setup/GameSetupFindQueryPlayerSetupApiV1ToGameSetupFindQueryPlayerSetupConverter';
import { GameSetupToBasicGameSetupApiV1Converter } from '../../../api/converter/setup/GameSetupToBasicGameSetupApiV1Converter';
import { GameSetupToExtendedGameSetupApiV1Converter } from '../../../api/converter/setup/GameSetupToExtendedGameSetupApiV1Converter';
import { GameSetupUpdateQueryAdditionalPlayerSetupApiV1ArrayToPlayerSetupArrayConverter } from '../../../api/converter/setup/GameSetupUpdateQueryAdditionalPlayerSetupApiV1ArrayToPlayerSetupArrayConverter';
import { GameSetupUpdateQueryApiV1ToGameSetupUpdateQueryConverter } from '../../../api/converter/setup/GameSetupUpdateQueryApiV1ToGameSetupUpdateQueryConverter';
import { PlayerReferenceApiV1ToPlayerReferenceConverter } from '../../../api/converter/setup/PlayerReferenceApiV1ToPlayerReferenceConverter';
import { CardCreationQueryApiV1Validator } from '../../../api/validator/card/CardCreationQueryApiV1Validator';
import { CardFindQueryApiV1Validator } from '../../../api/validator/card/CardFindQueryApiV1Validator';
import { CardDeckCreationQueryApiV1Validator } from '../../../api/validator/deck/CardDeckCreationQueryApiV1Validator';
import { CardDeckFindQueryApiV1Validator } from '../../../api/validator/deck/CardDeckFindQueryApiV1Validator';
import { LiveGameCreationQueryApiV1SemanticValidator } from '../../../api/validator/live/LiveGameCreationQueryApiV1SemanticValidator';
import { LiveGameCreationQueryApiV1Validator } from '../../../api/validator/live/LiveGameCreationQueryApiV1Validator';
import { LiveGameFindQueryApiV1Validator } from '../../../api/validator/live/LiveGameFindQueryApiV1Validator';
import { cardCreationQueryApiV1JoiValidatorSchema } from '../../../api/validator/schema/query/card/cardCreationQueryApiV1JoiValidatorSchema';
import { cardFindQueryApiV1JoiValidatorSchema } from '../../../api/validator/schema/query/card/cardFindQueryApiV1JoiValidatorSchema';
import { cardDeckCreationQueryApiV1JoiValidatorSchema } from '../../../api/validator/schema/query/deck/cardDeckCreationQueryApiV1JoiValidatorSchema';
import { cardDeckFindQueryApiV1JoiValidatorSchema } from '../../../api/validator/schema/query/deck/cardDeckFindQueryApiV1JoiValidatorSchema';
import { liveGameCreationQueryApiV1JoiValidatorSchema } from '../../../api/validator/schema/query/live/liveGameCreationQueryApiV1JoiValidatorSchema';
import { liveGameFindQueryApiV1JoiValidatorSchema } from '../../../api/validator/schema/query/live/liveGameFindQueryApiV1JoiValidatorSchema';
import { gameSetupCreationQueryApiV1JoiValidatorSchema } from '../../../api/validator/schema/query/setup/gameSetupCreationQueryApiV1ValidatorSchema';
import { gameSetupFindQueryApiV1JoiValidatorSchema } from '../../../api/validator/schema/query/setup/gameSetupFindQueryApiV1ValidatorSchema';
import { gameSetupUpdateQueryApiV1JoiValidatorSchema } from '../../../api/validator/schema/query/setup/gameSetupUpdateQueryApiV1ValidatorSchema';
import { GameSetupCreationQueryApiV1SemanticValidator } from '../../../api/validator/setup/GameSetupCreationQueryApiV1SemanticValidator';
import { GameSetupCreationQueryApiV1Validator } from '../../../api/validator/setup/GameSetupCreationQueryApiV1Validator';
import { GameSetupFindQueryApiV1Validator } from '../../../api/validator/setup/GameSetupFindQueryApiV1Validator';
import { GameSetupUpdateQueryApiV1SemanticValidator } from '../../../api/validator/setup/GameSetupUpdateQueryApiV1SemanticValidator';
import { GameSetupUpdateQueryApiV1Validator } from '../../../api/validator/setup/GameSetupUpdateQueryApiV1Validator';
import { GAME_ADAPTER_TYPES } from '../../types';

export function bindGameAdapterApi(bind: interfaces.Bind): void {
  bind(
    GAME_ADAPTER_TYPES.api.converter
      .GAME_FORMAT_TO_GAME_FORMAT_API_V1_CONVERTER,
  ).to(GameFormatToGameFormatApiV1Converter);
  bind(
    GAME_ADAPTER_TYPES.api.converter
      .GAME_FORMAT_API_V1_TO_GAME_FORMAT_CONVERTER,
  ).to(GameFormatApiV1ToGameFormatConverter);

  bind(
    GAME_ADAPTER_TYPES.api.converter.card
      .CARD_CREATION_QUERY_API_V1_TO_CARD_CREATION_QUERY_CONVERTER,
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
    GAME_ADAPTER_TYPES.api.converter.deck
      .CARD_DECK_CREATION_QUERY_API_V1_TO_CARD_DECK_CREATION_QUERY_CONVERTER,
  ).to(CardDeckCreationQueryApiV1ToCardDeckCreationQueryConverter);
  bind(
    GAME_ADAPTER_TYPES.api.converter.deck
      .CARD_DECK_FIND_QUERY_API_V1_TO_CARD_DECK_FIND_QUERY_CONVERTER,
  ).to(CardDeckFindQueryApiV1ToCardDeckFindQueryConverter);
  bind(
    GAME_ADAPTER_TYPES.api.converter.deck
      .CARD_DECK_SECTION_API_V1_TO_CARD_DECK_SECTIONS_CONVERTER,
  ).to(CardDeckSectionsApiV1ToCardDeckSectionsConverter);
  bind(
    GAME_ADAPTER_TYPES.api.converter.deck
      .CARD_DECK_SECTION_TO_CARD_DECK_SECTIONS_API_V1_CONVERTER,
  ).to(CardDeckSectionsToCardDeckSectionsApiV1Converter);
  bind(
    GAME_ADAPTER_TYPES.api.converter.deck
      .CARD_DECK_TO_CARD_DECK_API_V1_CONVERTER,
  ).to(CardDeckToCardDeckApiV1Converter);
  bind(
    GAME_ADAPTER_TYPES.api.converter.deck
      .CARD_SET_REFERENCES_API_V1_TO_CARD_SET_REFERENCES_CONVERTER,
  ).to(CardSetReferencesApiV1ToCardSetReferencesConverter);
  bind(
    GAME_ADAPTER_TYPES.api.converter.deck
      .CARD_SET_REFERENCES_TO_CARD_SET_REFERENCES_API_V1_CONVERTER,
  ).to(CardSetReferencesToCardSetReferencesApiV1Converter);

  bind(
    GAME_ADAPTER_TYPES.api.converter.live
      .LIVE_GAME_TO_LIVE_GAME_API_V1_CONVERTER,
  ).to(LiveGameToLiveGameApiV1Converter);
  bind(
    GAME_ADAPTER_TYPES.api.converter.live
      .LIVE_GAME_CREATION_QUERY_API_V1_TO_LIVE_GAME_CREATION_QUERY_CONVERTER,
  ).to(LiveGameCreationQueryApiV1ToLiveGameCreationQueryConverter);
  bind(
    GAME_ADAPTER_TYPES.api.converter.live
      .LIVE_GAME_FIND_QUERY_API_V1_TO_LIVE_GAME_FIND_QUERY_CONVERTER,
  ).to(LiveGameFindQueryApiV1ToLiveGameFindQueryConverter);

  bind(
    GAME_ADAPTER_TYPES.api.converter.setup
      .GAME_SETUP_TO_BASIC_GAME_SETUP_API_V1_CONVERTER,
  ).to(GameSetupToBasicGameSetupApiV1Converter);
  bind(
    GAME_ADAPTER_TYPES.api.converter.setup
      .GAME_SETUP_TO_EXTENDED_GAME_SETUP_API_V1_CONVERTER,
  ).to(GameSetupToExtendedGameSetupApiV1Converter);
  bind(
    GAME_ADAPTER_TYPES.api.converter.setup
      .GAME_SETUP_CREATION_QUERY_API_V1_TO_GAME_SETUP_CREATION_QUERY_CONVERTER,
  ).to(GameSetupCreationQueryApiV1ToGameSetupCreationQueryConverter);
  bind(
    GAME_ADAPTER_TYPES.api.converter.setup
      .GAME_SETUP_FIND_QUERY_API_V1_TO_GAME_SETUP_FIND_QUERY_CONVERTER,
  ).to(GameSetupFindQueryApiV1ToGameSetupFindQueryConverter);
  bind(
    GAME_ADAPTER_TYPES.api.converter.setup
      .GAME_SETUP_FIND_QUERY_PLAYER_SETUP_API_V1_TO_GAME_SETUP_FIND_QUERY_PLAYER_SETUP_CONVERTER,
  ).to(
    GameSetupFindQueryPlayerSetupApiV1ToGameSetupFindQueryPlayerSetupConverter,
  );
  bind(
    GAME_ADAPTER_TYPES.api.converter.setup
      .GAME_SETUP_UPDATE_QUERY_ADDITIONAL_PLAYER_SETUP_API_V1_ARRAY_TO_PLAYER_SETUP_ARRAY_CONVERTER,
  ).to(
    GameSetupUpdateQueryAdditionalPlayerSetupApiV1ArrayToPlayerSetupArrayConverter,
  );
  bind(
    GAME_ADAPTER_TYPES.api.converter.setup
      .GAME_SETUP_UPDATE_QUERY_API_V1_TO_GAME_SETUP_UPDATE_QUERY_CONVERTER,
  ).to(GameSetupUpdateQueryApiV1ToGameSetupUpdateQueryConverter);
  bind(
    GAME_ADAPTER_TYPES.api.converter.setup
      .PLAYER_REFERENCE_API_V1_TO_PLAYER_REFERENCE_CONVERTER,
  ).to(PlayerReferenceApiV1ToPlayerReferenceConverter);

  bind(
    GAME_ADAPTER_TYPES.api.validator.live
      .LIVE_GAME_CREATION_QUERY_API_V1_SEMANTIC_VALIDATOR,
  ).to(LiveGameCreationQueryApiV1SemanticValidator);
  bind(
    GAME_ADAPTER_TYPES.api.validator.live
      .LIVE_GAME_CREATION_QUERY_API_V1_VALIDATOR,
  )
    .to(LiveGameCreationQueryApiV1Validator)
    .inSingletonScope();
  bind(
    GAME_ADAPTER_TYPES.api.validator.live.LIVE_GAME_FIND_QUERY_API_V1_VALIDATOR,
  )
    .to(LiveGameFindQueryApiV1Validator)
    .inSingletonScope();
  bind(
    GAME_ADAPTER_TYPES.api.validator.card.CARD_CREATION_QUERY_API_V1_VALIDATOR,
  )
    .to(CardCreationQueryApiV1Validator)
    .inSingletonScope();
  bind(GAME_ADAPTER_TYPES.api.validator.card.CARD_FIND_QUERY_API_V1_VALIDATOR)
    .to(CardFindQueryApiV1Validator)
    .inSingletonScope();

  bind(
    GAME_ADAPTER_TYPES.api.validator.deck
      .CARD_DECK_CREATION_QUERY_API_V1_VALIDATOR,
  )
    .to(CardDeckCreationQueryApiV1Validator)
    .inSingletonScope();
  bind(
    GAME_ADAPTER_TYPES.api.validator.deck.CARD_DECK_FIND_QUERY_API_V1_VALIDATOR,
  )
    .to(CardDeckFindQueryApiV1Validator)
    .inSingletonScope();

  bind(
    GAME_ADAPTER_TYPES.api.validator.schema.query.card
      .CARD_CREATION_QUERY_API_V1_JOI_VALIDATOR_SCHEMA,
  ).toConstantValue(cardCreationQueryApiV1JoiValidatorSchema);
  bind(
    GAME_ADAPTER_TYPES.api.validator.schema.query.card
      .CARD_FIND_QUERY_API_V1_JOI_VALIDATOR_SCHEMA,
  ).toConstantValue(cardFindQueryApiV1JoiValidatorSchema);
  bind(
    GAME_ADAPTER_TYPES.api.validator.schema.query.deck
      .CARD_DECK_CREATION_QUERY_API_V1_JOI_VALIDATOR_SCHEMA,
  ).toConstantValue(cardDeckCreationQueryApiV1JoiValidatorSchema);
  bind(
    GAME_ADAPTER_TYPES.api.validator.schema.query.deck
      .CARD_DECK_FIND_QUERY_API_V1_JOI_VALIDATOR_SCHEMA,
  ).toConstantValue(cardDeckFindQueryApiV1JoiValidatorSchema);

  bind(
    GAME_ADAPTER_TYPES.api.validator.schema.query.live
      .LIVE_GAME_CREATION_QUERY_API_V1_JOY_VALIDATOR_SCHEMA,
  ).toConstantValue(liveGameCreationQueryApiV1JoiValidatorSchema);
  bind(
    GAME_ADAPTER_TYPES.api.validator.schema.query.live
      .LIVE_GAME_FIND_QUERY_API_V1_JOY_VALIDATOR_SCHEMA,
  ).toConstantValue(liveGameFindQueryApiV1JoiValidatorSchema);

  bind(
    GAME_ADAPTER_TYPES.api.validator.schema.query.setup
      .GAME_SETUP_CREATION_QUERY_API_V1_JOY_VALIDATOR_SCHEMA,
  ).toConstantValue(gameSetupCreationQueryApiV1JoiValidatorSchema);
  bind(
    GAME_ADAPTER_TYPES.api.validator.schema.query.setup
      .GAME_SETUP_FIND_QUERY_API_V1_JOY_VALIDATOR_SCHEMA,
  ).toConstantValue(gameSetupFindQueryApiV1JoiValidatorSchema);
  bind(
    GAME_ADAPTER_TYPES.api.validator.schema.query.setup
      .GAME_SETUP_UPDATE_QUERY_API_V1_JOY_VALIDATOR_SCHEMA,
  ).toConstantValue(gameSetupUpdateQueryApiV1JoiValidatorSchema);

  bind(
    GAME_ADAPTER_TYPES.api.validator.setup
      .GAME_SETUP_CREATION_QUERY_API_V1_SEMANTIC_VALIDATOR,
  ).to(GameSetupCreationQueryApiV1SemanticValidator);
  bind(
    GAME_ADAPTER_TYPES.api.validator.setup
      .GAME_SETUP_CREATION_QUERY_API_V1_VALIDATOR,
  ).to(GameSetupCreationQueryApiV1Validator);
  bind(
    GAME_ADAPTER_TYPES.api.validator.setup
      .GAME_SETUP_FIND_QUERY_API_V1_VALIDATOR,
  ).to(GameSetupFindQueryApiV1Validator);
  bind(
    GAME_ADAPTER_TYPES.api.validator.setup
      .GAME_SETUP_UPDATE_QUERY_API_V1_SEMANTIC_VALIDATOR,
  ).to(GameSetupUpdateQueryApiV1SemanticValidator);
  bind(
    GAME_ADAPTER_TYPES.api.validator.setup
      .GAME_SETUP_UPDATE_QUERY_API_V1_VALIDATOR,
  ).to(GameSetupUpdateQueryApiV1Validator);
}
