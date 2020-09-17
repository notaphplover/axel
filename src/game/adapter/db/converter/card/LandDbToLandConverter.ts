import { Converter } from '../../../../../common/domain';
import { Land } from '../../../../domain/model/card/Land';
import { LandDb } from '../../model/card/LandDb';

export class LandDbToLandConverter implements Converter<LandDb, Land> {
  public transform(input: LandDb): Land {
    return {
      cost: input.cost,
      id: input._id.toHexString(),
      type: input.type,
    };
  }
}
