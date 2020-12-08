import { GameSetupDbToGameSetupConverter } from './GameSetupDbToGameSetupConverter';
import { PlayerSetup } from '../../../../domain/model/setup/PlayerSetup';
import _ from 'lodash';
import { injectable } from 'inversify';

@injectable()
export class ExtendedGameSetupDbToExtendedGameSetupConverter extends GameSetupDbToGameSetupConverter<PlayerSetup> {
  protected transformPlayerSetups(input: PlayerSetup[]): PlayerSetup[] {
    return _.cloneDeep(input);
  }
}
