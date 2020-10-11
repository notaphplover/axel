import { Converter } from '../../../../../../common/domain';
import { Resource } from '../../../../domain/model/card/Resource';
import { ResourceApiV1 } from '../../model/card/ResourceApiV1';
import { injectable } from 'inversify';

@injectable()
export class ResourceToResourceApiV1Converter
  implements Converter<Resource, ResourceApiV1> {
  public transform(input: Resource): ResourceApiV1 {
    return {
      black: input.black,
      blue: input.blue,
      green: input.green,
      red: input.red,
      uncolored: input.uncolored,
      white: input.white,
    };
  }
}
