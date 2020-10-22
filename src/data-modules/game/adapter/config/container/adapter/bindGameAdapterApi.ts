import { CardCreationQueryApiV1ToCardCreationQueryConverter } from '../../../api/converter/card/CardCreationQueryApiV1ToCardCreationQueryConverter';
import { CardCreationQueryApiV1Validator } from '../../../api/validator/card/CardCreationQueryApiV1Validator';
import { CardDeckCreationQueryApiV1ToCardDeckCreationQueryConverter } from '../../../api/converter/deck/CardDeckCreationQueryApiV1ToCardDeckCreationQueryConverter';
import { CardDeckCreationQueryApiV1Validator } from '../../../api/validator/deck/CardDeckCreationQueryApiV1Validator';
import { CardDeckSectionsApiV1ToCardDeckSectionsConverter } from '../../../api/converter/deck/CardDeckSectionsApiV1ToCardDeckSectionsConverter';
import { CardDeckSectionsToCardDeckSectionsApiV1Converter } from '../../../api/converter/deck/CardDeckSectionsToCardDeckSectionsApiV1Converter';
import { CardDeckToCardDeckApiV1Converter } from '../../../api/converter/deck/CardDeckToCardDeckApiV1Converter';
import { CardDetailApiV1ToCardDetailConverter } from '../../../api/converter/card/CardDetailApiV1ToCardDetailConverter';
import { CardDetailToCardDetailV1Converter } from '../../../api/converter/card/CardDetailToCardDetailApiV1Converter';
import { CardFindQueryApiV1ToCardFindQueryConverter } from '../../../api/converter/card/CardFindQueryApiV1ToCardFindQueryConverter';
import { CardFindQueryApiV1Validator } from '../../../api/validator/card/CardFindQueryApiV1Validator';
import { CardSetReferencesApiV1ToCardSetReferencesConverter } from '../../../api/converter/deck/CardSetReferencesApiV1ToCardSetReferencesConverter';
import { CardSetReferencesToCardSetReferencesApiV1Converter } from '../../../api/converter/deck/CardSetReferencesToCardSetReferencesApiV1Converter';
import { CardToCardApiV1Converter } from '../../../api/converter/card/CardToCardApiV1Converter';
import { CardTypeApiV1ToCardTypeConverter } from '../../../api/converter/card/CardTypeApiV1ToCardTypeConverter';
import { CardTypeToCardTypeApiV1Converter } from '../../../api/converter/card/CardTypeToCardTypeApiV1Converter';
import { ExtendedGameSetupToExtendedGameSetupApiV1Converter } from '../../../api/converter/setup/ExtendedGameSetupToExtendedGameSetupApiV1Converter';
import { GAME_ADAPTER_TYPES } from '../../types';
import { GameCreationQueryApiV1Validator } from '../../../api/validator/GameCreationQueryApiV1Validator';
import { GameFormatApiV1ToGameFormatConverter } from '../../../api/converter/GameFormatApiV1ToGameFormatConverter';
import { GameFormatToGameFormatApiV1Converter } from '../../../api/converter/GameFormatToGameFormatApiV1Converter';
import { GameSetupCreationQueryApiV1ToGameSetupCreationQueryConverter } from '../../../api/converter/setup/GameSetupCreationQueryApiV1ToGameSetupCreationQueryConverter';
import { GameSetupCreationQueryApiV1Validator } from '../../../api/validator/setup/GameSetupCreationQueryApiV1Validator';
import { GameToGameApiV1Converter } from '../../../api/converter/GameToGameApiV1Converter';
import { ResourceApiV1ToResourceConverter } from '../../../api/converter/card/ResourceApiV1ToResourceConverter';
import { ResourceToResourceApiV1Converter } from '../../../api/converter/card/ResourceToResourceApiV1Converter';
import { cardFindQueryApiV1JoyValidatorSchema } from '../../../api/validator/schema/query/card/cardFindQueryApiV1JoiValidatorSchema';
import { gameSetupCreationQueryApiV1JoyValidatorSchema } from '../../../api/validator/schema/query/setup/gameSetupCreationQueryApiV1ValidatorSchema';
import { interfaces } from 'inversify';

export function bindGameAdapterApi(bind: interfaces.Bind): void {
  bind(
    GAME_ADAPTER_TYPES.api.converter
      .GAME_FORMAT_TO_GAME_FORMAT_API_V1_CONVERTER,
  ).to(GameFormatToGameFormatApiV1Converter);
  bind(
    GAME_ADAPTER_TYPES.api.converter
      .GAME_FORMAT_API_V1_TO_GAME_FORMAT_CONVERTER,
  ).to(GameFormatApiV1ToGameFormatConverter);
  bind(GAME_ADAPTER_TYPES.api.converter.GAME_TO_GAME_API_V1_CONVERTER).to(
    GameToGameApiV1Converter,
  );
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
    GAME_ADAPTER_TYPES.api.converter.setup
      .EXTENDED_GAME_SETUP_TO_EXTENDED_GAME_SETUP_API_V1_CONVERTER,
  ).to(ExtendedGameSetupToExtendedGameSetupApiV1Converter);
  bind(
    GAME_ADAPTER_TYPES.api.converter.setup
      .GAME_SETUP_CREATION_QUERY_API_V1_TO_GAME_SETUP_CREATION_QUERY_CONVERTER,
  ).to(GameSetupCreationQueryApiV1ToGameSetupCreationQueryConverter);

  bind(GAME_ADAPTER_TYPES.api.validator.GAME_CREATION_QUERY_API_V1_VALIDATOR)
    .to(GameCreationQueryApiV1Validator)
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
    GAME_ADAPTER_TYPES.api.validator.schema.query.card
      .CARD_FIND_QUERY_API_V1_JOI_VALIDATOR_SCHEMA,
  ).toConstantValue(cardFindQueryApiV1JoyValidatorSchema);
  bind(
    GAME_ADAPTER_TYPES.api.validator.schema.query.setup
      .GAME_SETUP_CREATION_QUERY_API_V1_JOY_VALIDATOR_SCHEMA,
  ).toConstantValue(gameSetupCreationQueryApiV1JoyValidatorSchema);

  bind(
    GAME_ADAPTER_TYPES.api.validator.setup
      .GAME_SETUP_CREATION_QUERY_API_V1_VALIDATOR,
  ).to(GameSetupCreationQueryApiV1Validator);
}
