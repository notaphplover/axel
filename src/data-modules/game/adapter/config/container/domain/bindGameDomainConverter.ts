import { GAME_DOMAIN_TYPES } from '../../../../domain/config/types';
import { PlayerSetupToPlayerReferenceConverter } from '../../../../domain/converter/setup/PlayerSetupToPlayerReferenceConverter';
import { interfaces } from 'inversify';

export function bindGameDomainCoverter(bind: interfaces.Bind): void {
  bind(
    GAME_DOMAIN_TYPES.converter.setup
      .PLAYER_SETUP_TO_PLAYER_REFERENCE_CONVERTER,
  ).to(PlayerSetupToPlayerReferenceConverter);
}
