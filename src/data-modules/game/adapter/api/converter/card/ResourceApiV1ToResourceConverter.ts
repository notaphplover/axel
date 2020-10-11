import { Converter } from '../../../../../../common/domain';
import { Resource } from '../../../../domain/model/card/Resource';
import { ResourceApiV1 } from '../../model/card/ResourceApiV1';
import { injectable } from 'inversify';

@injectable()
export class ResourceApiV1ToResourceConverter
  implements Converter<ResourceApiV1, Resource> {
  public transform(input: ResourceApiV1): Resource {
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
