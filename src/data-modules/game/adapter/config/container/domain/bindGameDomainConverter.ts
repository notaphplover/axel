import { ExtendedGameSetupToBasicGameSetupConverter } from '../../../../domain/converter/setup/ExtendedGameSetupToBasicGameSetupConverter';
import { GAME_DOMAIN_TYPES } from '../../../../domain/config/types';
import { PlayerSetupToPlayerReferenceConverter } from '../../../../domain/converter/setup/PlayerSetupToPlayerReferenceConverter';
import { interfaces } from 'inversify';

export function bindGameDomainCoverter(bind: interfaces.Bind): void {
  bind(
    GAME_DOMAIN_TYPES.converter.setup
      .EXTENDED_GAME_SETUP_TO_BASIC_GAME_SETUP_CONVERTER,
  ).to(ExtendedGameSetupToBasicGameSetupConverter);
  bind(
    GAME_DOMAIN_TYPES.converter.setup
      .PLAYER_SETUP_TO_PLAYER_REFERENCE_CONVERTER,
  ).to(PlayerSetupToPlayerReferenceConverter);
}
