import { Converter } from '../../../../../../common/domain';
import { ExtendedGameSetup } from '../../../../domain/model/setup/ExtendedGameSetup';
import { ExtendedGameSetupDb } from '../../model/setup/ExtendedGameSetupDb';
import _ from 'lodash';
import { injectable } from 'inversify';

@injectable()
export class ExtendedGameSetupDbToExtendedGameSetupConverter
  implements Converter<ExtendedGameSetupDb, ExtendedGameSetup> {
  public transform(input: ExtendedGameSetupDb): ExtendedGameSetup {
    return {
      format: input.format,
      id: input._id.toHexString(),
      ownerUserId: input.ownerUserId,
      playerSetups: _.cloneDeep(input.playerSetups),
      playerSlots: input.playerSlots,
    };
  }
}
