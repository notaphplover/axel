import { ExtendedGameSetupDbToGameSetupConverter } from './ExtendedGameSetupDbToGameSetupConverter';
import { PlayerSetup } from '../../../../domain/model/setup/PlayerSetup';
import _ from 'lodash';
import { injectable } from 'inversify';

@injectable()
export class ExtendedGameSetupDbToExtendedGameSetupConverter extends ExtendedGameSetupDbToGameSetupConverter<PlayerSetup> {
  protected transformPlayerSetups(input: PlayerSetup[]): PlayerSetup[] {
    return _.cloneDeep(input);
  }
}
