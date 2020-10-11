import { CardCreationQueryApiV1ToCardCreationQueryConverter } from '../../../api/converter/card/CardCreationQueryApiV1ToCardCreationQueryConverter';
import { CardCreationQueryApiV1Validator } from '../../../api/validator/card/CardCreationQueryApiV1Validator';
import { CardDetailApiV1ToCardDetailConverter } from '../../../api/converter/card/CardDetailApiV1ToCardDetailConverter';
import { CardDetailToCardDetailV1Converter } from '../../../api/converter/card/CardDetailToCardDetailApiV1Converter';
import { CardFindQueryApiV1ToCardFindQueryConverter } from '../../../api/converter/card/CardFindQueryApiV1ToCardFindQueryConverter';
import { CardFindQueryApiV1Validator } from '../../../api/validator/card/CardFindQueryApiV1Validator';
import { CardToCardApiV1Converter } from '../../../api/converter/card/CardToCardApiV1Converter';
import { CardTypeApiV1ToCardTypeConverter } from '../../../api/converter/card/CardTypeApiV1ToCardTypeConverter';
import { CardTypeToCardTypeApiV1Converter } from '../../../api/converter/card/CardTypeToCardTypeApiV1Converter';
import { GAME_ADAPTER_TYPES } from '../../types';
import { GameCreationQueryApiV1Validator } from '../../../api/validator/GameCreationQueryApiV1Validator';
import { GameToGameApiV1Converter } from '../../../api/converter/GameToGameApiV1Converter';
import { ResourceApiV1ToResourceConverter } from '../../../api/converter/card/ResourceApiV1ToResourceConverter';
import { ResourceToResourceApiV1Converter } from '../../../api/converter/card/ResourceToResourceApiV1Converter';
import { interfaces } from 'inversify';

export function bindGameAdapterApi(bind: interfaces.Bind): void {
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
}
