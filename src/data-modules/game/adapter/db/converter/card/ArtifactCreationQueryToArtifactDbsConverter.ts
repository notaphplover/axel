import { injectable } from 'inversify';
import mongodb from 'mongodb';

import { Converter } from '../../../../../../common/domain';
import { ArtifactCreationQuery } from '../../../../domain/query/card/ArtifactCreationQuery';
import { ArtifactDb } from '../../model/card/ArtifactDb';

@injectable()
export class ArtifactCreationQueryToArtifactDbsConverter
  implements
    Converter<ArtifactCreationQuery, mongodb.OptionalId<ArtifactDb>[]> {
  public transform(
    input: ArtifactCreationQuery,
  ): mongodb.OptionalId<ArtifactDb>[] {
    return [
      {
        cost: input.cost,
        detail: input.detail,
        type: input.type,
        subtypes: [],
        supertypes: [],
      },
    ];
  }
}
